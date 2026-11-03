"use client";

import { useRef, useState, type ChangeEvent } from "react";

import type { Transaction } from "@/components/(dashboard)/transactions/transaction-table";
import type { PageState } from "@/lib/transaction-data/types";
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

  const [pageState, setPageState] = useState<PageState>("upload");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileObject, setSelectedFileObject] = useState<File | null>(
    null,
  );

  const [totalRecords, setTotalRecords] = useState(0);
  const [analyzedTransactions, setAnalyzedTransactions] = useState<
    Transaction[]
  >([]);

  const [uploadResult, setUploadResult] = useState<TransactionUpload | null>(
    null,
  );
  const [uploadError, setUploadError] = useState("");
  const [rejectedRows, setRejectedRows] = useState<unknown>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadResult(null);
    setRejectedRows(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setSelectedFile(file.name);
      setSelectedFileObject(null);
      setTotalRecords(0);
      setUploadError("Please select a CSV file.");
      setPageState("validation-error");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setSelectedFile(file.name);
      setSelectedFileObject(null);
      setTotalRecords(0);
      setUploadError("The file exceeds the 5 MB size limit.");
      setPageState("validation-error");
      return;
    }

    try {
      // Read only to confirm the file is accessible and estimate its row count.
      // Do not validate transaction fields or IDs in the frontend.
      const text = await file.text();

      setSelectedFile(file.name);
      setSelectedFileObject(file);
      setTotalRecords(
        text.trim()
          ? Math.max(0, text.trim().split(/\r\n|\n|\r/).length - 1)
          : 0,
      );
      setPageState("valid");
    } catch {
      setSelectedFile(file.name);
      setSelectedFileObject(null);
      setTotalRecords(0);
      setUploadError("The file could not be read.");
      setPageState("validation-error");
    }
  }

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleDownloadTemplate() {
    const template =
      "transactionId,amount,currency,timestamp,type,customerId,paymentMethod,location\n";

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
    if (!selectedFileObject) {
      setUploadError("Please select a CSV file first.");
      return;
    }

    setPageState("analyzing");
    setUploadError("");
    setUploadResult(null);
    setRejectedRows(null);

    try {
      const upload = await uploadTransactions(selectedFileObject);

      setUploadResult({
        uploadId: upload.uploadId,
        status: upload.status,
      });

      let completed = false;

      for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
        await new Promise<void>((resolve) =>
          setTimeout(resolve, POLLING_INTERVAL),
        );

        const result = await getUpload(upload.uploadId);
        setUploadResult(result);

        if (result.status === "COMPLETED") {
          if (result.rejectedRows) {
            const rejected = await getRejectedRows(upload.uploadId);
            setRejectedRows(rejected);
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
    setTotalRecords(0);
    setAnalyzedTransactions([]);
    setUploadResult(null);
    setUploadError("");
    setRejectedRows(null);
    setPageState("upload");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return {
    fileInputRef,
    pageState,
    selectedFile,
    totalRecords,
    analyzedTransactions,
    uploadResult,
    uploadError,
    rejectedRows,
    handleFileChange,
    handleChooseFile,
    handleDownloadTemplate,
    handleAnalyze,
    handleReset,
  };
}
