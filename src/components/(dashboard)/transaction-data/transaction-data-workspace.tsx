// "use client";

// import { AnalysisCompleteState } from "./analysis-complete-state";
// import { AnalyzingState } from "./analyzing-state";
// import { DataRequirements } from "./data-requirements";
// import { SyntheticDatasetSelector } from "./synthetic-dataset-selector";
// import { TransactionDataHeader } from "./transaction-data-header";
// import { TransactionProgress } from "./transaction-progress";
// import { TransactionUploadCard } from "./transaction-upload-card";

// import { useTransactionData } from "@/hooks/use-transaction-data";

// interface TransactionDataWorkspaceProps {
//   portal?: "admin" | "client";
// }

// export function TransactionDataWorkspace({
//   portal = "client",
// }: TransactionDataWorkspaceProps) {
//   const {
//     selectedDatasetId,
//     setSelectedDatasetId,
//     selectedDataset,
//     fileInputRef,
//     pageState,
//     selectedFile,
//     validationErrors,
//     pendingRecords,
//     totalRecords,
//     uploadError,
//     uploadResult,
//     handleFileChange,
//     handleSyntheticSample,
//     handleChooseFile,
//     handleDownloadTemplate,
//     handleAnalyze,
//     handleReset,
//   } = useTransactionData();

//   return (
//     <div className="w-full max-w-[1200px]">
//       <TransactionDataHeader />

//       <TransactionProgress pageState={pageState} />

//       {pageState === "analyzing" ? (
//         <AnalyzingState />
//       ) : pageState === "complete" ? (
//         <AnalysisCompleteState
//           onReset={handleReset}
//           totalAnalyzed={uploadResult?.acceptedRows ?? 0}
//           totalFlagged={uploadResult?.flaggedRows ?? 0}
//           portal={portal}
//         />
//       ) : (
//         <div className="mt-6 space-y-5">
//           <SyntheticDatasetSelector
//             selectedDatasetId={selectedDatasetId}
//             onDatasetChange={setSelectedDatasetId}
//             selectedDataset={selectedDataset}
//           />

//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]">
//             <TransactionUploadCard
//               pageState={pageState}
//               selectedFile={selectedFile}
//               fileInputRef={fileInputRef}
//               onFileChange={handleFileChange}
//               onChooseFile={handleChooseFile}
//               onSyntheticSample={handleSyntheticSample}
//               onDownloadTemplate={handleDownloadTemplate}
//               onAnalyze={handleAnalyze}
//               validationErrors={validationErrors}
//               totalRecords={totalRecords}
//               validRecords={pendingRecords.length}
//               invalidRecords={totalRecords - pendingRecords.length}
//               uploadError={uploadError}
//               uploadResult={uploadResult}
//             />

//             <DataRequirements />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { AnalysisCompleteState } from "./analysis-complete-state";
import { AnalyzingState } from "./analyzing-state";
import { DataRequirements } from "./data-requirements";
import { TransactionDataHeader } from "./transaction-data-header";
import { TransactionProgress } from "./transaction-progress";
import { TransactionUploadCard } from "./transaction-upload-card";

import { useTransactionData } from "@/hooks/use-transaction-data";

interface TransactionDataWorkspaceProps {
  portal?: "admin" | "client";
}

export function TransactionDataWorkspace({
  portal = "client",
}: TransactionDataWorkspaceProps) {
  const {
    fileInputRef,
    pageState,
    selectedFile,
    totalRecords,
    uploadError,
    uploadResult,
    handleFileChange,
    handleChooseFile,
    handleDownloadTemplate,
    handleAnalyze,
    handleReset,
  } = useTransactionData();

  return (
    <div className="w-full max-w-[1200px]">
      <TransactionDataHeader />

      <TransactionProgress pageState={pageState} />

      {pageState === "analyzing" ? (
        <AnalyzingState />
      ) : pageState === "complete" ? (
        <AnalysisCompleteState
          onReset={handleReset}
          totalAnalyzed={uploadResult?.acceptedRows ?? 0}
          totalFlagged={uploadResult?.flaggedRows ?? 0}
          portal={portal}
        />
      ) : (
        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]">
            <TransactionUploadCard
              pageState={pageState}
              selectedFile={selectedFile}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
              onChooseFile={handleChooseFile}
              onDownloadTemplate={handleDownloadTemplate}
              onAnalyze={handleAnalyze}
              totalRecords={totalRecords}
              uploadError={uploadError}
              uploadResult={uploadResult}
            />

            <DataRequirements />
          </div>
        </div>
      )}
    </div>
  );
}
