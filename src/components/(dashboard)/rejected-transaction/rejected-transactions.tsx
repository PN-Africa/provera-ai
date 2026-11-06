// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";

// import {
//   getUploads,
//   getRejectedRows,
//   type TransactionUpload,
//   type RejectedUploadRow,
// } from "@/lib/api/upload";

// type RejectedTransactionItem = RejectedUploadRow & {
//   uploadId: string;
//   fileName: string;
//   createdAt: string;
// };

// function getLocalDate(value: string) {
//   const date = new Date(value);

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// function formatDate(value: string) {
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function getUploadId(upload: TransactionUpload) {
//   return upload.id ?? upload.uploadId ?? "";
// }

// function getUploadName(upload: TransactionUpload) {
//   return upload.fileName ?? upload.filename ?? "Uploaded dataset";
// }

// export default function RejectedTransactions() {
//   const [uploads, setUploads] = useState<TransactionUpload[]>([]);
//   const [rejectedTransactions, setRejectedTransactions] = useState<
//     RejectedTransactionItem[]
//   >([]);

//   const [selectedDate, setSelectedDate] = useState(() =>
//     getLocalDate(new Date().toISOString()),
//   );

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     async function loadRejectedTransactions() {
//       try {
//         setLoading(true);
//         setError("");

//         // Fetch all upload pages.
//         const allUploads: TransactionUpload[] = [];
//         const limit = 100;
//         let page = 1;

//         while (true) {
//           const response = await getUploads(page, limit);

//           allUploads.push(...response.data);

//           if (
//             response.data.length < limit ||
//             allUploads.length >= response.total
//           ) {
//             break;
//           }

//           page += 1;
//         }

//         if (cancelled) return;

//         // Keep uploads created on the selected date.
//         const dailyUploads = allUploads.filter(
//           (upload) =>
//             upload.createdAt && getLocalDate(upload.createdAt) === selectedDate,
//         );

//         setUploads(dailyUploads);

//         // Fetch rejected rows for each upload.
//         const rejectedResults = await Promise.all(
//           dailyUploads.map(async (upload) => {
//             const uploadId = getUploadId(upload);

//             if (!uploadId) return [];

//             const rows: RejectedUploadRow[] = [];
//             let rejectedPage = 1;
//             const rejectedLimit = 100;

//             while (true) {
//               const response = await getRejectedRows(
//                 uploadId,
//                 rejectedPage,
//                 rejectedLimit,
//               );

//               const currentRows = response.rows ?? response.rejectedRows ?? [];

//               rows.push(...currentRows);

//               if (
//                 currentRows.length < rejectedLimit ||
//                 (response.total !== undefined && rows.length >= response.total)
//               ) {
//                 break;
//               }

//               rejectedPage += 1;
//             }

//             return rows.map((row) => ({
//               ...row,
//               uploadId,
//               fileName: getUploadName(upload),
//               createdAt: upload.createdAt ?? "",
//             }));
//           }),
//         );

//         if (cancelled) return;

//         setRejectedTransactions(
//           rejectedResults
//             .flat()
//             .sort(
//               (a, b) =>
//                 new Date(b.createdAt).getTime() -
//                 new Date(a.createdAt).getTime(),
//             ),
//         );
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Unable to load rejected transactions.",
//           );
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }

//     void loadRejectedTransactions();

//     return () => {
//       cancelled = true;
//     };
//   }, [selectedDate]);

//   const summary = useMemo(() => {
//     return uploads.reduce(
//       (result, upload) => ({
//         total: result.total + (upload.totalRows ?? 0),
//         accepted: result.accepted + (upload.acceptedRows ?? 0),
//         rejected: result.rejected + (upload.rejectedRows ?? 0),
//       }),
//       { total: 0, accepted: 0, rejected: 0 },
//     );
//   }, [uploads]);

//   return (
//     <div className="mx-auto w-full max-w-[1440px] space-y-6">
//       {/* Header */}
//       <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
//             Rejected transactions
//           </h1>

//           <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
//             Review transactions that could not be processed during upload.
//           </p>
//         </div>

//         <label className="flex h-[46px] items-center gap-3 rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
//           <span className="text-sm text-[#B7B9CB]">Date</span>

//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(event) => setSelectedDate(event.target.value)}
//             className="bg-transparent text-sm text-[#EDEFFF] outline-none"
//           />
//         </label>
//       </header>

//       {/* Summary cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//         <SummaryCard
//           label="Total uploaded"
//           value={summary.total}
//           description="Transactions received"
//         />

//         <SummaryCard
//           label="Successfully processed"
//           value={summary.accepted}
//           description="Transactions accepted"
//           valueColor="text-[#34E89A]"
//         />

//         <SummaryCard
//           label="Rejected"
//           value={summary.rejected}
//           description="Transactions requiring attention"
//           valueColor="text-[#FF9B9F]"
//         />
//       </div>

//       {/* Rejected transactions table */}
//       <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
//         <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
//           <div>
//             <h2 className="text-lg font-semibold text-[#EDEFFF]">
//               Rejected rows
//             </h2>

//             <p className="mt-1 text-sm text-[#A8ADB8]">
//               Transactions that failed validation or processing.
//             </p>
//           </div>

//           <span className="text-sm text-[#B7B9CB]">
//             {rejectedTransactions.length} rejected
//           </span>
//         </div>

//         {error && (
//           <p className="mt-5 text-sm text-red-400" role="alert">
//             {error}
//           </p>
//         )}

//         {loading ? (
//           <p className="mt-6 text-sm text-[#A8ADB8]">
//             Loading rejected transactions...
//           </p>
//         ) : rejectedTransactions.length === 0 ? (
//           <div className="mt-6 rounded-lg border border-dashed border-[#393943] px-5 py-12 text-center">
//             <h3 className="font-medium text-[#EDEFFF]">
//               No rejected transactions
//             </h3>

//             <p className="mt-2 text-sm text-[#A8ADB8]">
//               There are no rejected transactions for the selected date.
//             </p>
//           </div>
//         ) : (
//           <div className="mt-5 overflow-x-auto">
//             <table className="w-full min-w-[850px] border-collapse">
//               <thead>
//                 <tr className="h-12 bg-[#2A2A32]">
//                   <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
//                     Transaction ID
//                   </th>

//                   <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
//                     Row number
//                   </th>

//                   <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
//                     Upload
//                   </th>

//                   <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
//                     Rejection reason
//                   </th>

//                   <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
//                     Upload date
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {rejectedTransactions.map((transaction, index) => (
//                   <tr
//                     key={`${transaction.uploadId}-${transaction.rowNumber}-${index}`}
//                     className="border-t border-[#343644]"
//                   >
//                     <td className="px-4 py-5 text-sm text-[#EDEFFF]">
//                       {transaction.transactionId || "Not provided"}
//                     </td>

//                     <td className="px-4 py-5 text-sm text-[#B7B9CB]">
//                       {transaction.rowNumber}
//                     </td>

//                     <td className="px-4 py-5 text-sm text-[#EDEFFF]">
//                       {transaction.fileName}
//                     </td>

//                     <td className="px-4 py-5">
//                       <div className="flex flex-wrap gap-2">
//                         {transaction.reasons.map((reason, reasonIndex) => (
//                           <span
//                             key={reasonIndex}
//                             className="rounded-md bg-[#FF9B9F]/10 px-2 py-1 text-xs text-[#FF9B9F]"
//                           >
//                             {reason}
//                           </span>
//                         ))}
//                       </div>
//                     </td>

//                     <td className="px-4 py-5 text-sm text-[#B7B9CB]">
//                       {transaction.createdAt
//                         ? formatDate(transaction.createdAt)
//                         : "—"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// function SummaryCard({
//   label,
//   value,
//   description,
//   valueColor = "text-[#EDEFFF]",
// }: {
//   label: string;
//   value: number;
//   description: string;
//   valueColor?: string;
// }) {
//   return (
//     <div className="rounded-xl border border-[#343644] bg-[#202027] p-5">
//       <p className="text-sm text-[#A8ADB8]">{label}</p>

//       <p className={`mt-3 text-3xl font-semibold ${valueColor}`}>
//         {value.toLocaleString()}
//       </p>

//       <p className="mt-2 text-xs text-[#777D8C]">{description}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getUploads, type TransactionUpload } from "@/lib/api/upload";

const PAGE_SIZE = 10;

function getUploadId(upload: TransactionUpload) {
  return upload.id ?? upload.uploadId ?? "";
}

function getFileName(upload: TransactionUpload) {
  return upload.fileName ?? upload.filename ?? "Uploaded dataset";
}

function formatDate(value?: string) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(value));
}

export default function RejectedTransactions() {
  const [uploads, setUploads] = useState<TransactionUpload[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadUploads() {
      try {
        setLoading(true);
        setError("");

        const response = await getUploads(page, PAGE_SIZE);

        if (cancelled) return;

        const rejectedUploads = response.data
          .filter((upload) => (upload.rejectedRows ?? 0) > 0)
          .sort(
            (a, b) =>
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime(),
          );

        setUploads(rejectedUploads);
        setTotalPages(response.totalPages ?? 1);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load rejected upload history.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadUploads();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Rejected transactions
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          View upload history and review transactions that could not be
          processed.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#EDEFFF]">
              Upload history
            </h2>

            <p className="mt-1 text-sm text-[#A8ADB8]">
              Select an upload to view its rejected transactions.
            </p>
          </div>

          <span className="text-sm text-[#B7B9CB]">
            Page {page} of {totalPages}
          </span>
        </div>

        {error && (
          <p className="mt-5 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-6 text-sm text-[#A8ADB8]">
            Loading upload history...
          </p>
        ) : uploads.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-[#393943] px-5 py-12 text-center">
            <h3 className="font-medium text-[#EDEFFF]">
              No rejected uploads found
            </h3>

            <p className="mt-2 text-sm text-[#A8ADB8]">
              Upload batches with rejected transactions will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="h-12 bg-[#2A2A32]">
                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Upload / Dataset
                    </th>

                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Upload date
                    </th>

                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Total uploaded
                    </th>

                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Processed
                    </th>

                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Rejected
                    </th>

                    <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                      Status
                    </th>

                    <th className="px-4 text-right text-xs font-medium text-[#B7B9CB]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {uploads.map((upload) => {
                    const uploadId = getUploadId(upload);

                    return (
                      <tr
                        key={uploadId}
                        className="h-[76px] border-t border-[#343644] transition hover:bg-[#292932]"
                      >
                        <td className="px-4">
                          <p className="text-sm font-medium text-[#EDEFFF]">
                            {getFileName(upload)}
                          </p>

                          <p className="mt-1 text-xs text-[#777D8C]">
                            {uploadId}
                          </p>
                        </td>

                        <td className="px-4 text-sm text-[#B7B9CB]">
                          {formatDate(upload.createdAt)}
                        </td>

                        <td className="px-4 text-sm text-[#EDEFFF]">
                          {(upload.totalRows ?? 0).toLocaleString()}
                        </td>

                        <td className="px-4 text-sm text-[#34E89A]">
                          {(upload.acceptedRows ?? 0).toLocaleString()}
                        </td>

                        <td className="px-4">
                          <span className="rounded-md bg-[#FF9B9F]/10 px-2 py-1 text-sm font-medium text-[#FF9B9F]">
                            {(upload.rejectedRows ?? 0).toLocaleString()}
                          </span>
                        </td>

                        <td className="px-4 text-sm text-[#B7B9CB]">
                          {upload.status}
                        </td>

                        <td className="px-4 text-right">
                          {uploadId ? (
                            <Link
                              href={`/workspace/rejected-transactions/${encodeURIComponent(uploadId)}`}
                              className="text-sm font-medium text-[#34E89A] hover:underline"
                            >
                              View details
                            </Link>
                          ) : (
                            <span className="text-xs text-[#777D8C]">
                              Unavailable
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#343644] pt-5">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-[#393943] px-4 py-2 text-sm text-[#EDEFFF] transition hover:bg-[#34343E] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-[#A8ADB8]">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-[#393943] px-4 py-2 text-sm text-[#EDEFFF] transition hover:bg-[#34343E] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
