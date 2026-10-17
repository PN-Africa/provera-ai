"use client";

import { useTransactions } from "@/components/transactions/transaction-context";
import { ChangeEvent, useRef, useState } from "react";

import { TransactionDataHeader } from "@/components/transaction-data/transaction-data-header";
import { TransactionProgress } from "@/components/transaction-data/transaction-progress";
import { TransactionUploadCard } from "@/components/transaction-data/transaction-upload-card";
import { DataRequirements } from "@/components/transaction-data/data-requirements";
import { AnalyzingState } from "@/components/transaction-data/analyzing-state";
import { AnalysisCompleteState } from "@/components/transaction-data/analysis-complete-state";
import type { ValidationError } from "@/components/transaction-data/validation-errors";
import {
  SYNTHETIC_DATASETS,
  type SyntheticDatasetId,
} from "@/components/transaction-data/synthetic-datasets";
import type { Transaction } from "@/components/transactions/transaction-table";

type PageState =
  | "upload"
  | "validation-error"
  | "valid"
  | "analyzing"
  | "complete";

type CsvRecord = {
  transaction_id: string;
  amount: number;
  currency: string;
  date_time: string;
  transaction_type: string;
  customer_id: string;
  location: string;
  payment_method: string;
};

const REQUIRED_COLUMNS = [
  "transaction_id",
  "amount",
  "currency",
  "date_time",
  "transaction_type",
];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"' && insideQuotes && text[i + 1] === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && text[i + 1] === "\n") i++;

      row.push(cell.trim());
      if (row.some((value) => value !== "")) rows.push(row);

      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((value) => value !== "")) rows.push(row);
  }

  return rows;
}

function validateCsv(text: string): {
  records: CsvRecord[];
  errors: ValidationError[];
  totalRecords: number;
} {
  const rows = parseCsv(text);

  if (rows.length === 0) {
    return {
      records: [],
      errors: [{ row: "CSV file", message: "The file is empty." }],
      totalRecords: 0,
    };
  }

  const headers = rows[0].map((header) =>
    header
      .replace(/^\uFEFF/, "")
      .trim()
      .toLowerCase(),
  );

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headers.includes(column),
  );

  if (missingColumns.length > 0) {
    return {
      records: [],
      errors: [
        {
          row: "CSV header",
          message: `Missing required columns: ${missingColumns.join(", ")}.`,
        },
      ],
      totalRecords: rows.length - 1,
    };
  }

  const dataRows = rows.slice(1);
  const errors: ValidationError[] = [];
  const records: CsvRecord[] = [];
  const seenIds = new Set<string>();

  if (dataRows.length > 500) {
    errors.push({
      row: "CSV file",
      message: "The file exceeds the maximum of 500 records.",
    });
  }

  dataRows.forEach((values, index) => {
    const rowLabel = `Row ${index + 2}`;
    const getValue = (column: string) => {
      const columnIndex = headers.indexOf(column);
      return columnIndex === -1 ? "" : (values[columnIndex] ?? "").trim();
    };

    const id = getValue("transaction_id");
    const rawAmount = getValue("amount");
    const amount = Number(rawAmount);
    const currency = getValue("currency");
    const dateTime = getValue("date_time");
    const transactionType = getValue("transaction_type");

    let invalid = false;

    if (!id) {
      errors.push({ row: rowLabel, message: "Transaction ID is required." });
      invalid = true;
    } else if (seenIds.has(id)) {
      errors.push({ row: rowLabel, message: "Transaction ID is duplicated." });
      invalid = true;
    }

    if (id) seenIds.add(id);

    if (!rawAmount || !Number.isFinite(amount) || amount <= 0) {
      errors.push({ row: rowLabel, message: "Amount must be positive." });
      invalid = true;
    }

    if (!currency) {
      errors.push({ row: rowLabel, message: "Currency is required." });
      invalid = true;
    }

    const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(dateTime);

    if (!dateTime || !hasTimezone || Number.isNaN(Date.parse(dateTime))) {
      errors.push({
        row: rowLabel,
        message:
          "Use an ISO timestamp with timezone, e.g. 2026-10-10T09:00:00Z.",
      });
      invalid = true;
    }

    if (!transactionType) {
      errors.push({
        row: rowLabel,
        message: "Transaction type is required.",
      });
      invalid = true;
    }

    if (values.length !== headers.length) {
      errors.push({
        row: rowLabel,
        message: "The number of values does not match the CSV columns.",
      });
      invalid = true;
    }

    if (!invalid) {
      records.push({
        transaction_id: id,
        amount,
        currency,
        date_time: dateTime,
        transaction_type: transactionType,
        customer_id: getValue("customer_id"),
        location: getValue("location"),
        payment_method: getValue("payment_method"),
      });
    }
  });

  return {
    records,
    errors,
    totalRecords: dataRows.length,
  };
}

function formatDate(dateTime: string): string {
  const date = new Date(dateTime);

  return `${new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(date)}, ${new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(date)} UTC`;
}

function analyzeRecords(records: CsvRecord[]): Transaction[] {
  const customerCounts = new Map<string, number>();

  records.forEach((record) => {
    if (record.customer_id) {
      customerCounts.set(
        record.customer_id,
        (customerCounts.get(record.customer_id) ?? 0) + 1,
      );
    }
  });

  return records.map((record) => {
    const repeatedCustomer =
      Boolean(record.customer_id) &&
      (customerCounts.get(record.customer_id) ?? 0) >= 3;

    let risk: Transaction["risk"] = "Low risk";
    let indicator = "No indicator triggered";

    if (record.amount >= 200000) {
      risk = "High risk";
      indicator = "High amount";
    } else if (repeatedCustomer) {
      risk = "Medium risk";
      indicator = "Repeated customer activity";
    }

    return {
      id: record.transaction_id,
      amount: `${record.currency} ${record.amount.toLocaleString("en-NG")}`,
      risk,
      date: formatDate(record.date_time),
      indicator,
    };
  });
}

export default function TransactionDataPage() {
  const [selectedDatasetId, setSelectedDatasetId] =
    useState<SyntheticDatasetId>("balanced");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setTransactions } = useTransactions();

  const [pageState, setPageState] = useState<PageState>("upload");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [pendingRecords, setPendingRecords] = useState<CsvRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [analyzedTransactions, setAnalyzedTransactions] = useState<
    Transaction[]
  >([]);

  const loadCsv = (text: string, fileName: string) => {
    const result = validateCsv(text);

    setSelectedFile(fileName);
    setValidationErrors(result.errors);
    setPendingRecords(result.errors.length === 0 ? result.records : []);
    setTotalRecords(result.totalRecords);
    setPageState(result.errors.length > 0 ? "validation-error" : "valid");
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setSelectedFile(file.name);
      setPendingRecords([]);
      setTotalRecords(0);
      setValidationErrors([
        { row: "File", message: "Please select a CSV file." },
      ]);
      setPageState("validation-error");
      return;
    }

    if (file.size > 1024 * 1024) {
      setSelectedFile(file.name);
      setTotalRecords(0);
      setPendingRecords([]);
      setValidationErrors([
        { row: "File", message: "The file exceeds the 1 MB size limit." },
      ]);
      setPageState("validation-error");
      return;
    }

    try {
      const text = await file.text();
      loadCsv(text, file.name);
    } catch {
      setSelectedFile(file.name);
      setPendingRecords([]);
      setTotalRecords(0);
      setValidationErrors([
        { row: "File", message: "The file could not be read." },
      ]);
      setPageState("validation-error");
    }
  };

  const handleSyntheticSample = () => {
    const selectedDataset = SYNTHETIC_DATASETS.find(
      (dataset) => dataset.id === selectedDatasetId,
    );

    if (!selectedDataset) return;

    loadCsv(selectedDataset.csv, selectedDataset.fileName);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadTemplate = () => {
    const template =
      "transaction_id,amount,currency,date_time,transaction_type,customer_id,location,payment_method\n" +
      "PV-3001,25000,NGN,2026-10-10T09:00:00Z,transfer,C001,Lagos,bank transfer\n";

    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "provera-transaction-template.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleAnalyze = async () => {
    if (pendingRecords.length === 0) return;

    setPageState("analyzing");

    // Demo-only rule-based analysis; this is not an AI model.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = analyzeRecords(pendingRecords);

    setAnalyzedTransactions(results);
    setTransactions(results);
    setPageState("complete");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setValidationErrors([]);
    setPendingRecords([]);
    setTotalRecords(0);
    setAnalyzedTransactions([]);
    setPageState("upload");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const totalFlagged = analyzedTransactions.filter(
    (transaction) => transaction.risk !== "Low risk",
  ).length;

  const selectedDataset = SYNTHETIC_DATASETS.find(
    (dataset) => dataset.id === selectedDatasetId,
  );

  return (
    <div className="w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <TransactionDataHeader />

      <TransactionProgress pageState={pageState} />

      {pageState === "analyzing" ? (
        <AnalyzingState />
      ) : pageState === "complete" ? (
        <AnalysisCompleteState
          onReset={handleReset}
          totalAnalyzed={analyzedTransactions.length}
          totalFlagged={totalFlagged}
        />
      ) : (
        <div className="mt-6 space-y-5">
          <section className="rounded-[10px] border border-[#343644] bg-[#1C1D27] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-sans text-[15px] font-semibold text-[#EDEFFF]">
                  Choose a synthetic dataset
                </h2>
                <p className="mt-1 text-[12px] leading-5 text-[#B7B9CB]">
                  Explore different transaction scenarios using demo data.
                </p>
              </div>

              <div className="w-full sm:max-w-[280px]">
                <label
                  htmlFor="synthetic-dataset"
                  className="mb-2 block text-[12px] font-medium text-[#B7B9CB]"
                >
                  Dataset
                </label>
                <select
                  id="synthetic-dataset"
                  value={selectedDatasetId}
                  onChange={(event) =>
                    setSelectedDatasetId(
                      event.target.value as SyntheticDatasetId,
                    )
                  }
                  className="h-11 w-full rounded-lg border border-[#343644] bg-[#222431] px-3 text-sm text-[#EDEFFF] outline-none focus:border-[#455EFF]"
                >
                  {SYNTHETIC_DATASETS.map((dataset) => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-3 text-[12px] leading-5 text-[#B7B9CB]">
              {selectedDataset?.description}
            </p>
            <p className="mt-2 text-[11px] leading-5 text-[#8F93AA]">
              Synthetic demo data only. Analysis uses local demonstration rules.
            </p>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]">
            <TransactionUploadCard
              pageState={pageState}
              selectedFile={selectedFile}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
              onChooseFile={handleChooseFile}
              onSyntheticSample={handleSyntheticSample}
              onDownloadTemplate={handleDownloadTemplate}
              onAnalyze={handleAnalyze}
              validationErrors={validationErrors}
              totalRecords={totalRecords}
              validRecords={pendingRecords.length}
              invalidRecords={validationErrors.length}
            />

            <DataRequirements />
          </div>
        </div>
      )}
    </div>
  );
}
