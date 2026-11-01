"use client";

import { useRef, useState, type ChangeEvent } from "react";

import type { Transaction } from "@/components/(dashboard)/transactions/transaction-table";
import { validateCsv } from "@/lib/transaction-data/csv-validation";
import type { CsvRecord, PageState } from "@/lib/transaction-data/types";
import {
  SYNTHETIC_DATASETS,
  type SyntheticDatasetId,
} from "@/components/(dashboard)/transaction-data/synthetic-datasets";
import { ValidationError } from "@/components/(dashboard)/transaction-data/validation-errors";
import {
  uploadTransactions,
  getUpload,
  getRejectedRows,
  type TransactionUpload,
} from "@/lib/api/upload";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const POLLING_INTERVAL = 2000;
const MAX_POLL_ATTEMPTS = 150;

export function useTransactionData() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedDatasetId, setSelectedDatasetId] =
    useState<SyntheticDatasetId>("balanced");

  const [pageState, setPageState] = useState<PageState>("upload");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileObject, setSelectedFileObject] = useState<File | null>(
    null,
  );

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [pendingRecords, setPendingRecords] = useState<CsvRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [analyzedTransactions, setAnalyzedTransactions] = useState<
    Transaction[]
  >([]);

  const [uploadResult, setUploadResult] = useState<TransactionUpload | null>(
    null,
  );
  const [uploadError, setUploadError] = useState("");

  const selectedDataset = SYNTHETIC_DATASETS.find(
    (dataset) => dataset.id === selectedDatasetId,
  );

  function loadCsv(text: string, fileName: string, file: File) {
    const result = validateCsv(text);

    setSelectedFile(fileName);
    setSelectedFileObject(file);
    setValidationErrors(result.errors);
    setPendingRecords(result.errors.length === 0 ? result.records : []);
    setTotalRecords(result.totalRecords);
    setUploadError("");
    setUploadResult(null);

    setPageState(result.errors.length > 0 ? "validation-error" : "valid");
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");
    setUploadResult(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setSelectedFile(file.name);
      setSelectedFileObject(null);
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
      setSelectedFileObject(null);
      setTotalRecords(0);
      setPendingRecords([]);
      setValidationErrors([
        {
          row: "File",
          message: "The file exceeds the 5 MB size limit.",
        },
      ]);
      setPageState("validation-error");
      return;
    }

    try {
      const text = await file.text();
      loadCsv(text, file.name, file);
    } catch {
      setSelectedFile(file.name);
      setSelectedFileObject(null);
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

    const file = new File([selectedDataset.csv], selectedDataset.fileName, {
      type: "text/csv",
    });

    loadCsv(selectedDataset.csv, selectedDataset.fileName, file);
  }

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleDownloadTemplate() {
    const template =
      "transactionId,amount,currency,timestamp,type,customerId,paymentMethod,location\n" +
      "PV-3001,25000,NGN,2026-10-10T09:00:00Z,transfer,C001,bank transfer,Lagos\n";

    const blob = new Blob([template], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "provera-transaction-template.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  async function handleAnalyze() {
    if (!selectedFileObject || pendingRecords.length === 0) return;

    setPageState("analyzing");
    setUploadError("");
    setUploadResult(null);

    try {
      // Step 1: Upload the CSV.
      const upload = await uploadTransactions(selectedFileObject);

      setUploadResult({
        uploadId: upload.uploadId,
        status: upload.status,
      });

      // Step 2: Poll until backend processing finishes.
      let completed = false;

      for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
        await new Promise<void>((resolve) =>
          setTimeout(resolve, POLLING_INTERVAL),
        );

        const result = await getUpload(upload.uploadId);
        setUploadResult(result);

        if (result.status === "COMPLETED" && result.rejectedRows) {
          const rejected = await getRejectedRows(upload.uploadId);
          console.log("Rejected transaction details:", rejected);
        }

        if (result.status === "COMPLETED") {
          if (result.acceptedRows === 0) {
            throw new Error(
              "All transactions were rejected by the backend. Check the rejected-row details in your console.",
            );
          }

          completed = true;
          break;
        }

        if (result.status === "FAILED") {
          throw new Error(
            result.error || "The backend could not process this upload.",
          );
        }
      }

      if (!completed) {
        throw new Error("Upload processing is taking longer than expected.");
      }

      // Scoring is not called here because that endpoint is admin-only.
      setPageState("complete");
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Unable to analyze transactions.",
      );

      setPageState("valid");
    }
  }

  function handleReset() {
    setSelectedFile(null);
    setSelectedFileObject(null);
    setValidationErrors([]);
    setPendingRecords([]);
    setTotalRecords(0);
    setAnalyzedTransactions([]);
    setUploadResult(null);
    setUploadError("");
    setPageState("upload");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

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

    uploadResult,
    uploadError,

    handleFileChange,
    handleSyntheticSample,
    handleChooseFile,
    handleDownloadTemplate,
    handleAnalyze,
    handleReset,
  };
}
