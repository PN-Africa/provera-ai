"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  getUpload,
  getRejectedRows,
  type TransactionUpload,
  type RejectedUploadRow,
} from "@/lib/api/upload";

const PAGE_SIZE = 20;

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

export default function RejectedUploadDetails() {
  const params = useParams<{ id: string }>();
  const uploadId = params.id;

  const [upload, setUpload] = useState<TransactionUpload | null>(null);
  const [rejectedRows, setRejectedRows] = useState<RejectedUploadRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadDetails = useCallback(async () => {
    if (!uploadId) return;

    try {
      setLoading(true);
      setError("");

      const [uploadResponse, rejectedResponse] = await Promise.all([
        getUpload(uploadId),
        getRejectedRows(uploadId, page, PAGE_SIZE),
      ]);

      setUpload(uploadResponse);

      setRejectedRows(rejectedResponse.data ?? []);

      setTotal(rejectedResponse.total ?? uploadResponse.rejectedRows ?? 0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load upload details.",
      );
    } finally {
      setLoading(false);
    }
  }, [uploadId, page]);

  // useEffect(() => {
  //   void loadDetails();
  // }, [loadDetails]);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        const [uploadResponse, rejectedResponse] = await Promise.all([
          getUpload(uploadId),
          getRejectedRows(uploadId, page, PAGE_SIZE),
        ]);
        console.log("UPLOAD DETAILS:", uploadResponse);
        console.log("REJECTED ROWS RESPONSE:", rejectedResponse);
        if (cancelled) return;

        setUpload(uploadResponse);

        setRejectedRows(rejectedResponse.data ?? []);

        setTotal(rejectedResponse.total ?? uploadResponse.rejectedRows ?? 0);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load upload details.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [uploadId, page]);

  const fileName = upload?.fileName ?? upload?.filename ?? "Uploaded dataset";

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <Link
        href="/workspace/rejected-transactions"
        className="inline-flex items-center gap-2 text-sm text-[#A8ADB8] transition hover:text-[#34E89A]"
      >
        ← Back to rejected transactions
      </Link>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Rejected upload details
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Review the processing results and rejected rows for this upload.
        </p>
      </header>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => void loadDetails()}
            className="mt-3 text-sm text-[#EDEFFF] underline"
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[#A8ADB8]">Loading upload details...</p>
      ) : upload ? (
        <>
          <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#777D8C]">
                  Dataset
                </p>

                <h2 className="mt-2 text-xl font-semibold text-[#EDEFFF]">
                  {fileName}
                </h2>

                <p className="mt-2 break-all text-xs text-[#777D8C]">
                  Upload ID: {uploadId}
                </p>
              </div>

              <span className="w-fit rounded-md border border-[#393943] px-3 py-1.5 text-xs text-[#B7B9CB]">
                {upload.status}
              </span>
            </div>

            <div className="mt-5 border-t border-[#343644] pt-4">
              <p className="text-xs text-[#777D8C]">Uploaded on</p>

              <p className="mt-1 text-sm text-[#EDEFFF]">
                {formatDate(upload.createdAt)}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard label="Total uploaded" value={upload.totalRows ?? 0} />

            <SummaryCard
              label="Successfully processed"
              value={upload.acceptedRows ?? 0}
              color="text-[#34E89A]"
            />

            <SummaryCard
              label="Rejected"
              value={upload.rejectedRows ?? total}
              color="text-[#FF9B9F]"
            />
          </div>

          <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-[#EDEFFF]">
                  Rejected rows
                </h2>

                <p className="mt-1 text-sm text-[#A8ADB8]">
                  Details of transactions that failed processing.
                </p>
              </div>

              <span className="text-sm text-[#B7B9CB]">
                {total.toLocaleString()} rejected
              </span>
            </div>

            {rejectedRows.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-[#393943] px-5 py-12 text-center">
                <p className="font-medium text-[#EDEFFF]">
                  No rejected rows found
                </p>
                <p className="mt-2 text-sm text-[#A8ADB8]">
                  There are no rejected rows in this upload.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse">
                    <thead>
                      <tr className="h-12 bg-[#2A2A32]">
                        <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                          Transaction ID
                        </th>

                        <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                          CSV row number
                        </th>

                        <th className="px-4 text-left text-xs font-medium text-[#B7B9CB]">
                          Rejection reason
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {rejectedRows.map((row, index) => (
                        <tr
                          key={`${row.rowNumber}-${index}`}
                          className="border-t border-[#343644]"
                        >
                          <td className="px-4 py-5 text-sm text-[#EDEFFF]">
                            {row.transactionId || "Not provided"}
                          </td>

                          <td className="px-4 py-5 text-sm text-[#B7B9CB]">
                            {row.rowNumber}
                          </td>

                          <td className="px-4 py-5">
                            <div className="flex flex-wrap gap-2">
                              {row.reasons.map((reason, reasonIndex) => (
                                <span
                                  key={reasonIndex}
                                  className="rounded-md bg-[#FF9B9F]/10 px-2 py-1 text-xs text-[#FF9B9F]"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-[#343644] pt-5">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((current) => current - 1)}
                      className="rounded-lg border border-[#393943] px-4 py-2 text-sm text-[#EDEFFF] hover:bg-[#34343E] disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="text-sm text-[#A8ADB8]">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((current) => current + 1)}
                      className="rounded-lg border border-[#393943] px-4 py-2 text-sm text-[#EDEFFF] hover:bg-[#34343E] disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color = "text-[#EDEFFF]",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-[#343644] bg-[#202027] p-5">
      <p className="text-sm text-[#A8ADB8]">{label}</p>

      <p className={`mt-3 text-3xl font-semibold ${color}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
