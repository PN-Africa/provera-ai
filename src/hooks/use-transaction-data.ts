"use client";

import { useRef, useState, type ChangeEvent } from "react";

import { useTransactions } from "@/components/(dashboard)/transactions/transaction-context";

// import type { ValidationError } from "@/components/transaction-data/validation-errors";

// import {
//   SYNTHETIC_DATASETS,
//   type SyntheticDatasetId,
// } from "@/components/transaction-data/synthetic-datasets";

import type { Transaction } from "@/components/(dashboard)/transactions/transaction-table";

import { analyzeRecords } from "@/lib/transaction-data/demo-analysis";
import { validateCsv } from "@/lib/transaction-data/csv-validation";

import type { CsvRecord, PageState } from "@/lib/transaction-data/types";
import {
  SYNTHETIC_DATASETS,
  SyntheticDatasetId,
} from "@/components/(dashboard)/transaction-data/synthetic-datasets";
import { ValidationError } from "@/components/(dashboard)/transaction-data/validation-errors";

const MAX_FILE_BYTES = 1024 * 1024;

export function useTransactionData() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setTransactions } = useTransactions();

  const [selectedDatasetId, setSelectedDatasetId] =
    useState<SyntheticDatasetId>("balanced");

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

  const selectedDataset = SYNTHETIC_DATASETS.find(
    (dataset) => dataset.id === selectedDatasetId,
  );

  function loadCsv(text: string, fileName: string) {
    const result = validateCsv(text);

    setSelectedFile(fileName);
    setValidationErrors(result.errors);

    setPendingRecords(result.errors.length === 0 ? result.records : []);

    setTotalRecords(result.totalRecords);

    setPageState(result.errors.length > 0 ? "validation-error" : "valid");
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setSelectedFile(file.name);
      setPendingRecords([]);
      setTotalRecords(0);

      setValidationErrors([
        {
          row: "File",
          message: "Please select a CSV file.",
        },
      ]);

      setPageState("validation-error");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setSelectedFile(file.name);
      setTotalRecords(0);
      setPendingRecords([]);

      setValidationErrors([
        {
          row: "File",
          message: "The file exceeds the 1 MB size limit.",
        },
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
        {
          row: "File",
          message: "The file could not be read.",
        },
      ]);

      setPageState("validation-error");
    }
  }

  function handleSyntheticSample() {
    if (!selectedDataset) return;

    loadCsv(selectedDataset.csv, selectedDataset.fileName);
  }

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleDownloadTemplate() {
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
  }

  async function handleAnalyze() {
    if (pendingRecords.length === 0) return;

    setPageState("analyzing");

    // Demo-only delay; this does not call an AI model.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = analyzeRecords(pendingRecords);

    setAnalyzedTransactions(results);
    setTransactions(results);

    setPageState("complete");
  }

  function handleReset() {
    setSelectedFile(null);
    setValidationErrors([]);
    setPendingRecords([]);
    setTotalRecords(0);
    setAnalyzedTransactions([]);
    setPageState("upload");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const totalFlagged = analyzedTransactions.filter(
    (transaction) => transaction.risk !== "Low risk",
  ).length;

  return {
    selectedDatasetId,
    setSelectedDatasetId,
    selectedDataset,

    fileInputRef,
    pageState,
    selectedFile,
    validationErrors,
    pendingRecords,
    totalRecords,
    analyzedTransactions,
    totalFlagged,

    handleFileChange,
    handleSyntheticSample,
    handleChooseFile,
    handleDownloadTemplate,
    handleAnalyze,
    handleReset,
  };
}
