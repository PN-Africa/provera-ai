"use client";

import { TransactionDataHeader } from "@/components/transaction-data/transaction-data-header";
import { TransactionProgress } from "@/components/transaction-data/transaction-progress";
import { TransactionUploadCard } from "@/components/transaction-data/transaction-upload-card";
import { DataRequirements } from "@/components/transaction-data/data-requirements";
import { AnalyzingState } from "@/components/transaction-data/analyzing-state";
import { AnalysisCompleteState } from "@/components/transaction-data/analysis-complete-state";

import { SyntheticDatasetSelector } from "@/components/transaction-data/synthetic-dataset-selector";
import { useTransactionData } from "@/hooks/use-transaction-data";

export function TransactionDataWorkspace() {
  const {
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
  } = useTransactionData();

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
          <SyntheticDatasetSelector
            selectedDatasetId={selectedDatasetId}
            onDatasetChange={setSelectedDatasetId}
            selectedDataset={selectedDataset}
          />

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
