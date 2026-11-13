// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { ArrowLeft, Loader2, RefreshCw, FileSpreadsheet } from "lucide-react";

// import {
//   getUpload,
//   rescoreUpload,
//   type TransactionUpload,
//   type RescoreResponse,
//   type UploadStatus,
// } from "@/lib/api/upload";

// const statusStyles: Record<UploadStatus, string> = {
//   PENDING: "bg-[#3A3021] text-[#F5C56B]",
//   PROCESSING: "bg-[#252F45] text-[#9DBBFF]",
//   COMPLETED: "bg-[#1E352C] text-[#34E89A]",
//   FAILED: "bg-[#38252F] text-[#FF9B9F]",
// };

// function formatDate(value?: string) {
//   if (!value) return "Not available";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Not available";

//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "long",
//     timeStyle: "short",
//   }).format(date);
// }

// export default function UploadDetailsPage() {
//   const params = useParams<{ id: string }>();
//   const id = params.id;

//   const [upload, setUpload] = useState<TransactionUpload | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [rescoring, setRescoring] = useState(false);

//   const [error, setError] = useState("");
//   const [rescoreError, setRescoreError] = useState("");

//   const [rescoreResult, setRescoreResult] = useState<RescoreResponse | null>(
//     null,
//   );

//   useEffect(() => {
//     let cancelled = false;

//     async function loadUpload() {
//       try {
//         setError("");

//         const result = await getUpload(id);

//         if (!cancelled) {
//           setUpload(result);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Unable to load upload details.",
//           );
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }

//     void loadUpload();

//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   async function handleRescore() {
//     const confirmed = window.confirm(
//       "Are you sure you want to rescore this upload? All transactions that have not been reviewed may receive updated scores, risk levels and detection reasons. Reviewed transactions will keep their existing scores.",
//     );

//     if (!confirmed) return;

//     try {
//       setRescoring(true);
//       setRescoreError("");
//       setRescoreResult(null);

//       const result = await rescoreUpload(id);

//       setRescoreResult(result);

//       // Refresh upload details after successful rescoring.
//       try {
//         const updatedUpload = await getUpload(id);
//         setUpload(updatedUpload);
//       } catch {
//         // The scoring succeeded even if refreshing the upload details fails.
//       }
//     } catch (err) {
//       setRescoreError(
//         err instanceof Error ? err.message : "Unable to rescore this upload.",
//       );
//     } finally {
//       setRescoring(false);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-black text-[#EDEFFF]">
//         <div className="flex items-center gap-3 text-sm text-[#B7B9CB]">
//           <Loader2 size={20} className="animate-spin" />
//           Loading upload details...
//         </div>
//       </div>
//     );
//   }

//   if (error || !upload) {
//     return (
//       <div className="min-h-screen bg-black px-5 py-8 text-[#EDEFFF]">
//         <Link
//           href="/workspace/transaction-data"
//           className="inline-flex items-center gap-2 text-sm text-[#34E89A]"
//         >
//           <ArrowLeft size={16} />
//           Back to transaction data
//         </Link>

//         <h1 className="mt-8 font-manrope text-[26px] font-semibold">
//           Upload not found
//         </h1>

//         <p className="mt-3 text-sm text-[#B7B9CB]">
//           {error || "This upload could not be found."}
//         </p>
//       </div>
//     );
//   }

//   const fileName = upload.fileName ?? upload.filename ?? "Untitled upload";

//   const isProcessing =
//     upload.status === "PROCESSING" || upload.status === "PENDING";

//   return (
//     <div className="min-h-screen bg-black text-[#EDEFFF]">
//       <Link
//         href="/workspace/transaction-data"
//         className="inline-flex items-center gap-2 text-sm text-[#34E89A] hover:underline"
//       >
//         <ArrowLeft size={16} />
//         Back to uploads
//       </Link>

//       <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//         <div>
//           <p className="text-[12px] font-medium uppercase tracking-wider text-[#B7B9CB]">
//             Upload details
//           </p>

//           <div className="mt-3 flex items-center gap-3">
//             <FileSpreadsheet size={26} className="shrink-0 text-[#34E89A]" />

//             <h1 className="break-all font-manrope text-[25px] font-semibold sm:text-[32px]">
//               {fileName}
//             </h1>
//           </div>

//           <p className="mt-3 text-[13px] text-[#B7B9CB]">
//             Uploaded {formatDate(upload.createdAt)}
//           </p>
//         </div>

//         <span
//           className={`inline-flex w-fit rounded-md px-4 py-2 text-xs font-medium ${statusStyles[upload.status]}`}
//         >
//           {upload.status}
//         </span>
//       </div>

//       <section className="mt-8 rounded-[10px] border border-[#343644] bg-[#202026] p-6">
//         <h2 className="font-manrope text-[19px] font-semibold">
//           Upload summary
//         </h2>

//         <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
//           <div>
//             <p className="text-[12px] text-[#B7B9CB]">Total rows</p>
//             <p className="mt-2 text-[25px] font-semibold">
//               {upload.totalRows ?? 0}
//             </p>
//           </div>

//           <div>
//             <p className="text-[12px] text-[#B7B9CB]">Accepted rows</p>
//             <p className="mt-2 text-[25px] font-semibold text-[#34E89A]">
//               {upload.acceptedRows ?? 0}
//             </p>
//           </div>

//           <div>
//             <p className="text-[12px] text-[#B7B9CB]">Rejected rows</p>
//             <p className="mt-2 text-[25px] font-semibold text-[#FF9B9F]">
//               {upload.rejectedRows ?? 0}
//             </p>
//           </div>

//           <div>
//             <p className="text-[12px] text-[#B7B9CB]">Flagged rows</p>
//             <p className="mt-2 text-[25px] font-semibold text-[#F5C56B]">
//               {upload.flaggedRows ?? 0}
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#202026] p-6">
//         <h2 className="font-manrope text-[19px] font-semibold">
//           Rescore this upload
//         </h2>

//         <p className="mt-3 max-w-[700px] text-[13px] leading-6 text-[#B7B9CB]">
//           Run transaction detection again using your current detection rules.
//           All eligible transactions in this upload will be rescored.
//           Transactions that have already been reviewed will keep the scores
//           previously assigned to them.
//         </p>

//         {isProcessing ? (
//           <p className="mt-5 text-[13px] text-[#F5C56B]">
//             This upload is still being processed. You can rescore it once
//             processing has finished.
//           </p>
//         ) : (
//           <button
//             type="button"
//             onClick={handleRescore}
//             disabled={rescoring}
//             className="mt-6 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-6 text-[13px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {rescoring ? (
//               <>
//                 <Loader2 size={17} className="animate-spin" />
//                 Rescoring upload...
//               </>
//             ) : (
//               <>
//                 <RefreshCw size={17} />
//                 Rescore Upload
//               </>
//             )}
//           </button>
//         )}

//         {rescoreError && (
//           <div className="mt-5 rounded-lg border border-[#71383D] bg-[#38252F] p-4">
//             <p className="text-[13px] text-[#FF9B9F]">{rescoreError}</p>
//           </div>
//         )}

//         {rescoreResult && (
//           <div className="mt-5 rounded-lg border border-[#286B50] bg-[#153B2D] p-4">
//             <p className="text-sm font-semibold text-[#34E89A]">
//               Upload rescored successfully
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
//               <div>
//                 <p className="text-[11px] text-[#A8ADB8]">Uploads processed</p>
//                 <p className="mt-1 text-xl font-semibold">
//                   {rescoreResult.uploads}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] text-[#A8ADB8]">
//                   Transactions scored
//                 </p>
//                 <p className="mt-1 text-xl font-semibold">
//                   {rescoreResult.scored}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] text-[#A8ADB8]">Flagged</p>
//                 <p className="mt-1 text-xl font-semibold">
//                   {rescoreResult.flagged}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] text-[#A8ADB8]">Reviewed skipped</p>
//                 <p className="mt-1 text-xl font-semibold">
//                   {rescoreResult.skippedReviewed}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileSpreadsheet,
  RefreshCw,
  Loader2,
  Eye,
} from "lucide-react";

import {
  getUpload,
  getTransactions,
  getRejectedRows,
  rescoreUpload,
  type TransactionUpload,
  type Transaction,
  type RejectedUploadRow,
  type RescoreResponse,
  type TransactionListResponse,
  type RejectedRowsResponse,
} from "@/lib/api/upload";

type Tab = "all" | "flagged" | "rejected";

const PAGE_SIZE = 10;

const STATUS_STYLES = {
  PENDING: "bg-[#3A3021] text-[#F5C56B]",
  PROCESSING: "bg-[#252F45] text-[#9DBBFF]",
  COMPLETED: "bg-[#19372F] text-[#34E89A]",
  FAILED: "bg-[#38252F] text-[#FF9B9F]",
};

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(date);
}

function formatRisk(risk: Transaction["riskLevel"]) {
  switch (risk) {
    case "HIGH":
      return "High risk";
    case "MEDIUM":
      return "Medium risk";
    default:
      return "Low risk";
  }
}

function RiskBadge({ risk }: { risk: Transaction["riskLevel"] }) {
  const styles = {
    HIGH: "bg-[#38252F] text-[#FF9B9F]",
    MEDIUM: "bg-[#40371F] text-[#E9C45F]",
    LOW: "bg-[#19372F] text-[#7FD7BD]",
  };

  return (
    <span
      className={`inline-flex rounded-md px-3 py-1 text-[11px] font-medium ${styles[risk]}`}
    >
      {formatRisk(risk)}
    </span>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#343644] px-5 py-4">
      <p className="text-xs text-[#B7B9CB]">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] transition hover:bg-[#30303B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] transition hover:bg-[#30303B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function UploadDetailsPage() {
  const params = useParams<{ id: string }>();
  const uploadId = params.id;

  const [upload, setUpload] = useState<TransactionUpload | null>(null);
  const [uploadLoading, setUploadLoading] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("all");

  const [transactionData, setTransactionData] =
    useState<TransactionListResponse | null>(null);

  const [rejectedData, setRejectedData] = useState<RejectedRowsResponse | null>(
    null,
  );

  const [transactionPage, setTransactionPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);

  const [transactionLoading, setTransactionLoading] = useState(false);
  const [rejectedLoading, setRejectedLoading] = useState(false);

  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [rejectedError, setRejectedError] = useState<string | null>(null);

  const [rescoring, setRescoring] = useState(false);
  const [rescoreError, setRescoreError] = useState<string | null>(null);
  const [rescoreResult, setRescoreResult] = useState<RescoreResponse | null>(
    null,
  );

  const [refreshKey, setRefreshKey] = useState(0);

  // Load the selected upload.
  useEffect(() => {
    let cancelled = false;

    async function loadUpload() {
      try {
        setUploadLoading(true);
        setUploadError(null);

        const response = await getUpload(uploadId);

        if (!cancelled) {
          setUpload(response);
        }
      } catch (error) {
        if (!cancelled) {
          setUploadError(
            error instanceof Error
              ? error.message
              : "Unable to load upload details.",
          );
        }
      } finally {
        if (!cancelled) {
          setUploadLoading(false);
        }
      }
    }

    void loadUpload();

    return () => {
      cancelled = true;
    };
  }, [uploadId, refreshKey]);

  // Load transactions belonging only to this upload.
  useEffect(() => {
    if (!upload || activeTab === "rejected") return;

    let cancelled = false;

    async function loadTransactions() {
      try {
        setTransactionLoading(true);
        setTransactionError(null);

        setTransactionData(null);

        const response = await getTransactions({
          uploadId,
          page: transactionPage,
          limit: PAGE_SIZE,
          ...(activeTab === "flagged" ? { flagged: true } : {}),
        });

        if (!cancelled) {
          setTransactionData(response);
        }
      } catch (error) {
        if (!cancelled) {
          setTransactionError(
            error instanceof Error
              ? error.message
              : "Unable to load transactions.",
          );
        }
      } finally {
        if (!cancelled) {
          setTransactionLoading(false);
        }
      }
    }

    void loadTransactions();

    return () => {
      cancelled = true;
    };
  }, [upload, uploadId, activeTab, transactionPage, refreshKey]);

  // Load rejected rows belonging only to this upload.
  useEffect(() => {
    if (!upload || activeTab !== "rejected") return;

    let cancelled = false;

    async function loadRejectedRows() {
      try {
        setRejectedLoading(true);
        setRejectedError(null);

        const response = await getRejectedRows(
          uploadId,
          rejectedPage,
          PAGE_SIZE,
        );

        if (!cancelled) {
          setRejectedData(response);
        }
      } catch (error) {
        if (!cancelled) {
          setRejectedError(
            error instanceof Error
              ? error.message
              : "Unable to load rejected rows.",
          );
        }
      } finally {
        if (!cancelled) {
          setRejectedLoading(false);
        }
      }
    }

    void loadRejectedRows();

    return () => {
      cancelled = true;
    };
  }, [upload, uploadId, activeTab, rejectedPage, refreshKey]);

  // Rescore this particular upload.
  async function handleRescore() {
    const confirmed = window.confirm(
      "Are you sure you want to rescore this upload? Transactions that have not been reviewed may receive updated scores, risk levels and detection reasons. Reviewed transactions will keep their existing scores.",
    );

    if (!confirmed) return;

    try {
      setRescoring(true);
      setRescoreError(null);
      setRescoreResult(null);

      const result = await rescoreUpload(uploadId);

      setRescoreResult(result);

      setTransactionPage(1);
      setRejectedPage(1);

      setRefreshKey((current) => current + 1);
    } catch (error) {
      setRescoreError(
        error instanceof Error
          ? error.message
          : "Unable to rescore this upload.",
      );
    } finally {
      setRescoring(false);
    }
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);

    setTransactionPage(1);
    setRejectedPage(1);

    setTransactionData(null);
    setRejectedData(null);

    setTransactionError(null);
    setRejectedError(null);
  }

  if (uploadLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-[#B7B9CB]">
        <Loader2 size={22} className="animate-spin" />
        <span className="ml-3 text-sm">Loading upload details...</span>
      </div>
    );
  }

  if (uploadError || !upload) {
    return (
      <div className="min-h-screen bg-black px-5 py-10 text-[#EDEFFF]">
        <Link
          // href="/workspace/transaction-data"
          href="/workspace/uploads"
          className="inline-flex items-center gap-2 text-sm text-[#34E89A] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Upload History
        </Link>

        <h1 className="mt-8 font-manrope text-[26px] font-semibold">
          Unable to load upload
        </h1>

        <p className="mt-3 text-sm text-[#FF9B9F]">
          {uploadError ?? "Upload not found."}
        </p>
      </div>
    );
  }

  const fileName = upload.fileName ?? upload.filename ?? "Untitled dataset";

  const isProcessing =
    upload.status === "PENDING" || upload.status === "PROCESSING";

  const tabs = [
    {
      id: "all" as const,
      label: "All Transactions",
      count: upload.acceptedRows,
    },
    {
      id: "flagged" as const,
      label: "Flagged Transactions",
      count: upload.flaggedRows,
    },
    {
      id: "rejected" as const,
      label: "Rejected Rows",
      count: upload.rejectedRows,
    },
  ];

  return (
    <div className="min-h-screen bg-black pb-12 text-[#EDEFFF]">
      {/* Back navigation */}
      <Link
        href="/workspace/transaction-data"
        className="inline-flex items-center gap-2 text-sm text-[#34E89A] hover:underline"
      >
        <ArrowLeft size={17} />
        Back to Transaction Data
      </Link>

      {/* Upload heading */}
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[1.5px] text-[#B7B9CB]">
            Transaction overview
          </p>

          <div className="mt-3 flex items-center gap-3">
            <FileSpreadsheet size={27} className="shrink-0 text-[#34E89A]" />

            <h1 className="break-all font-manrope text-[25px] font-semibold sm:text-[32px]">
              {fileName}
            </h1>
          </div>

          <p className="mt-3 text-[13px] text-[#B7B9CB]">
            Uploaded {formatDate(upload.createdAt)}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-md px-4 py-2 text-[11px] font-semibold ${STATUS_STYLES[upload.status]}`}
        >
          {upload.status}
        </span>
      </div>

      {/* Upload summary */}
      <section className="mt-8">
        <h2 className="font-manrope text-[20px] font-semibold">
          Upload summary
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total rows",
              value: upload.totalRows ?? 0,
              color: "text-[#EDEFFF]",
            },
            {
              label: "Accepted rows",
              value: upload.acceptedRows ?? 0,
              color: "text-[#34E89A]",
            },
            {
              label: "Rejected rows",
              value: upload.rejectedRows ?? 0,
              color: "text-[#FF9B9F]",
            },
            {
              label: "Flagged rows",
              value: upload.flaggedRows ?? 0,
              color: "text-[#F5C56B]",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[10px] border border-[#343644] bg-[#202026] p-5"
            >
              <p className="text-[13px] text-[#B7B9CB]">{item.label}</p>

              <p
                className={`mt-3 font-manrope text-[30px] font-semibold ${item.color}`}
              >
                {item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rescore section */}
      <section className="mt-6 flex flex-col gap-4 rounded-[10px] border border-[#343644] bg-[#202026] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-manrope text-[17px] font-semibold">
            Detection scoring
          </h2>

          <p className="mt-2 max-w-[650px] text-[13px] leading-5 text-[#B7B9CB]">
            Run detection again on this dataset using your current rules.
            Reviewed transactions keep their existing scores.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRescore}
          disabled={rescoring || isProcessing}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[13px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {rescoring ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Rescoring...
            </>
          ) : (
            <>
              <RefreshCw size={17} />
              Rescore Upload
            </>
          )}
        </button>
      </section>

      {isProcessing && (
        <p className="mt-3 text-[12px] text-[#F5C56B]">
          Rescoring is unavailable while this upload is still processing.
        </p>
      )}

      {rescoreError && (
        <div className="mt-4 rounded-lg border border-[#71383D] bg-[#38252F] p-4">
          <p className="text-[13px] text-[#FF9B9F]">{rescoreError}</p>
        </div>
      )}

      {rescoreResult && (
        <div className="mt-4 rounded-lg border border-[#286B50] bg-[#153B2D] p-5">
          <p className="text-sm font-semibold text-[#34E89A]">
            Rescoring completed successfully
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-[11px] text-[#A8ADB8]">Uploads processed</p>
              <p className="mt-1 text-xl font-semibold">
                {rescoreResult.uploads}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Transactions scored</p>
              <p className="mt-1 text-xl font-semibold">
                {rescoreResult.scored}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Flagged</p>
              <p className="mt-1 text-xl font-semibold">
                {rescoreResult.flagged}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Reviewed skipped</p>
              <p className="mt-1 text-xl font-semibold">
                {rescoreResult.skippedReviewed}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transaction tabs */}
      <section className="mt-10">
        <div>
          <h2 className="font-manrope text-[22px] font-semibold">
            Transactions in this upload
          </h2>

          <p className="mt-2 text-[13px] text-[#B7B9CB]">
            View the accepted transactions, flagged activity and rejected
            records belonging to this dataset.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-[#343644]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-[12px] font-medium transition ${
                activeTab === tab.id
                  ? "border-[#34E89A] text-[#34E89A]"
                  : "border-transparent text-[#B7B9CB] hover:text-[#EDEFFF]"
              }`}
            >
              {tab.label}

              <span
                className={`rounded-md px-2 py-0.5 text-[10px] ${
                  activeTab === tab.id
                    ? "bg-[#19372F] text-[#34E89A]"
                    : "bg-[#30303B] text-[#B7B9CB]"
                }`}
              >
                {tab.count ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* All and flagged transactions */}
        {(activeTab === "all" || activeTab === "flagged") && (
          <div className="mt-5 overflow-hidden rounded-[10px] border border-[#343644] bg-[#202026]">
            {transactionLoading ? (
              <div className="flex items-center justify-center gap-3 py-12 text-sm text-[#B7B9CB]">
                <Loader2 size={19} className="animate-spin" />
                Loading transactions...
              </div>
            ) : transactionError ? (
              <div className="p-6">
                <p className="text-sm text-[#FF9B9F]">{transactionError}</p>

                <button
                  type="button"
                  onClick={() => setRefreshKey((value) => value + 1)}
                  className="mt-3 text-sm text-[#34E89A] underline"
                >
                  Try again
                </button>
              </div>
            ) : !transactionData?.data.length ? (
              <div className="py-12 text-center">
                <FileSpreadsheet size={28} className="mx-auto text-[#8D90A5]" />

                <p className="mt-3 text-sm text-[#B7B9CB]">
                  {activeTab === "flagged"
                    ? "No flagged transactions in this upload."
                    : "No accepted transactions found in this upload."}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] border-collapse">
                    <thead>
                      <tr className="h-14 bg-[#2A2A32] text-left">
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Transaction ID
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Amount
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Risk level
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Review status
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Occurred at
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactionData.data.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="h-[70px] border-t border-[#343644]"
                        >
                          <td className="px-5 text-[13px] font-medium text-[#EDEFFF]">
                            {transaction.transactionId}
                          </td>

                          <td className="px-5 text-[13px] text-[#EDEFFF]">
                            {transaction.currency}{" "}
                            {Number(transaction.amount).toLocaleString()}
                          </td>

                          <td className="px-5">
                            <RiskBadge risk={transaction.riskLevel} />
                          </td>

                          <td className="px-5 text-[12px] text-[#B7B9CB]">
                            {transaction.reviewStatus
                              ? transaction.reviewStatus.replace(/_/g, " ")
                              : "Pending review"}
                          </td>

                          <td className="px-5 text-[12px] text-[#B7B9CB]">
                            {formatDate(transaction.occurredAt)}
                          </td>

                          <td className="px-5">
                            <Link
                              href={`/workspace/transactions/${encodeURIComponent(transaction.id)}`}
                              className="inline-flex items-center gap-2 text-[12px] font-medium text-[#34E89A] hover:underline"
                            >
                              <Eye size={15} />
                              View details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  page={transactionData.page}
                  totalPages={transactionData.totalPages}
                  onPageChange={setTransactionPage}
                />

                <p className="px-5 pb-4 text-[11px] text-[#8D90A5]">
                  Showing {transactionData.data.length} of{" "}
                  {transactionData.total} transactions in this tab.
                </p>
              </>
            )}
          </div>
        )}

        {/* Rejected rows */}
        {activeTab === "rejected" && (
          <div className="mt-5 overflow-hidden rounded-[10px] border border-[#343644] bg-[#202026]">
            {rejectedLoading ? (
              <div className="flex items-center justify-center gap-3 py-12 text-sm text-[#B7B9CB]">
                <Loader2 size={19} className="animate-spin" />
                Loading rejected rows...
              </div>
            ) : rejectedError ? (
              <div className="p-6">
                <p className="text-sm text-[#FF9B9F]">{rejectedError}</p>

                <button
                  type="button"
                  onClick={() => setRefreshKey((value) => value + 1)}
                  className="mt-3 text-sm text-[#34E89A] underline"
                >
                  Try again
                </button>
              </div>
            ) : !rejectedData?.data.length ? (
              <div className="py-12 text-center">
                <p className="text-sm text-[#B7B9CB]">
                  No rejected rows in this upload.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px] border-collapse">
                    <thead>
                      <tr className="h-14 bg-[#2A2A32] text-left">
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Row number
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Transaction ID
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Rejection reasons
                        </th>
                        <th className="px-5 text-xs font-medium text-[#B7B9CB]">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {rejectedData.data.map((row: RejectedUploadRow) => (
                        <tr key={row.id} className="border-t border-[#343644]">
                          <td className="px-5 py-5 text-[13px] text-[#EDEFFF]">
                            {row.rowNumber}
                          </td>

                          <td className="px-5 py-5 text-[13px] text-[#EDEFFF]">
                            {row.transactionId ?? "Not provided"}
                          </td>

                          <td className="px-5 py-5">
                            <div className="space-y-2">
                              {row.reasons.map((reason, index) => (
                                <p
                                  key={`${row.id}-${index}`}
                                  className="text-[12px] leading-5 text-[#FF9B9F]"
                                >
                                  • {reason}
                                </p>
                              ))}
                            </div>
                          </td>

                          <td className="px-5 py-5 text-[12px] text-[#B7B9CB]">
                            {formatDate(row.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  page={rejectedData.page}
                  totalPages={rejectedData.totalPages}
                  onPageChange={setRejectedPage}
                />

                <p className="px-5 pb-4 text-[11px] text-[#8D90A5]">
                  Showing {rejectedData.data.length} of {rejectedData.total}{" "}
                  rejected rows.
                </p>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
