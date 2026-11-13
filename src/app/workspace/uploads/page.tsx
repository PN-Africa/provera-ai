"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, Eye, Loader2, RefreshCw, Upload } from "lucide-react";

import {
  getUploads,
  scoreUnscoredUploads,
  type TransactionUpload,
  type ScoreUploadsResponse,
} from "@/lib/api/upload";

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
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(date);
}

export default function UploadHistoryPage() {
  const [uploads, setUploads] = useState<TransactionUpload[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [scoring, setScoring] = useState(false);
  const [scoringError, setScoringError] = useState<string | null>(null);
  const [scoringResult, setScoringResult] =
    useState<ScoreUploadsResponse | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadUploads() {
      try {
        setLoading(true);
        setError(null);

        const response = await getUploads(page, PAGE_SIZE);

        if (cancelled) return;

        setUploads(response.data ?? []);
        setTotal(response.total ?? 0);
        setTotalPages(response.totalPages ?? 0);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load upload history.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadUploads();

    return () => {
      cancelled = true;
    };
  }, [page, refreshKey]);

  async function handleScoreUnscored() {
    const confirmed = window.confirm(
      "Score all eligible transactions that do not have a score yet across your uploads? Already-scored transactions will not be changed, and uploads still processing will be skipped.",
    );

    if (!confirmed) return;

    try {
      setScoring(true);
      setScoringError(null);
      setScoringResult(null);

      const result = await scoreUnscoredUploads();

      setScoringResult(result);

      // Refresh the upload history after scoring.
      setRefreshKey((current) => current + 1);
    } catch (err) {
      setScoringError(
        err instanceof Error
          ? err.message
          : "Unable to score unscored transactions.",
      );
    } finally {
      setScoring(false);
    }
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    setLoading(true);
  }

  return (
    <main className="min-h-screen bg-black pb-12 text-[#EDEFFF]">
      {/* Page heading */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[1.5px] text-[#34E89A]">
            Transaction management
          </p>

          <h1 className="mt-2 font-manrope text-[28px] font-semibold sm:text-[32px]">
            Upload History
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#B7B9CB]">
            View and manage your previously uploaded transaction datasets.
          </p>
        </div>

        <Link
          href="/workspace/transaction-data"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#343644] bg-[#202026] px-5 text-[13px] font-medium text-[#EDEFFF] transition hover:bg-[#30303B]"
        >
          <Upload size={16} />
          Upload New Dataset
        </Link>
      </div>

      {/* Score unscored transactions */}
      <section className="mt-7 flex flex-col gap-4 rounded-xl border border-[#343644] bg-[#202026] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-manrope text-[17px] font-semibold">
            Transaction scoring
          </h2>

          <p className="mt-2 max-w-[650px] text-[13px] leading-5 text-[#B7B9CB]">
            Score transactions that do not have a risk score yet across your
            eligible uploads. Existing scores are left unchanged.
          </p>
        </div>

        <button
          type="button"
          onClick={handleScoreUnscored}
          disabled={scoring || loading}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[13px] font-semibold text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {scoring ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Scoring...
            </>
          ) : (
            <>
              <RefreshCw size={17} />
              Score Unscored Transactions
            </>
          )}
        </button>
      </section>

      {scoringError && (
        <div className="mt-4 rounded-lg border border-[#71383D] bg-[#38252F] p-4">
          <p className="text-[13px] text-[#FF9B9F]">{scoringError}</p>
        </div>
      )}

      {scoringResult && (
        <section className="mt-4 rounded-lg border border-[#286B50] bg-[#153B2D] p-5">
          <p className="text-sm font-semibold text-[#34E89A]">
            Scoring completed successfully
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-[11px] text-[#A8ADB8]">Uploads processed</p>
              <p className="mt-1 text-xl font-semibold">
                {scoringResult.uploads.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Transactions scored</p>
              <p className="mt-1 text-xl font-semibold">
                {scoringResult.scored.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Flagged</p>
              <p className="mt-1 text-xl font-semibold">
                {scoringResult.flagged.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Reviewed skipped</p>
              <p className="mt-1 text-xl font-semibold">
                {scoringResult.skippedReviewed.toLocaleString()}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Upload history table */}
      <section className="mt-9">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-manrope text-[20px] font-semibold">
              Your datasets
            </h2>

            <p className="mt-1 text-[12px] text-[#B7B9CB]">
              {total.toLocaleString()} uploaded dataset{total === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey((current) => current + 1)}
            disabled={loading}
            className="flex items-center gap-2 text-[12px] text-[#34E89A] hover:underline disabled:opacity-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#343644] bg-[#202026]">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-14 text-sm text-[#B7B9CB]">
              <Loader2 size={20} className="animate-spin" />
              Loading upload history...
            </div>
          ) : error ? (
            <div className="p-6">
              <p className="text-sm text-[#FF9B9F]" role="alert">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setRefreshKey((current) => current + 1)}
                className="mt-3 text-sm text-[#34E89A] underline"
              >
                Try again
              </button>
            </div>
          ) : uploads.length === 0 ? (
            <div className="py-14 text-center">
              <FileSpreadsheet size={32} className="mx-auto text-[#8D90A5]" />

              <h3 className="mt-4 text-[15px] font-semibold">
                No upload history yet
              </h3>

              <p className="mt-2 text-[13px] text-[#B7B9CB]">
                Upload a transaction dataset to see it listed here.
              </p>

              <Link
                href="/workspace/transaction-data"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#34E89A] px-5 text-[13px] font-medium text-[#0B0C0E] hover:bg-[#90EFC5]"
              >
                Upload Dataset
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead>
                    <tr className="h-[58px] bg-[#2A2A32] text-left">
                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Upload / Dataset
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Upload date
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Total uploaded
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Processed
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Rejected
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Status
                      </th>

                      <th className="px-5 text-[12px] font-medium text-[#B7B9CB]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {uploads.map((upload, index) => {
                      const uploadId = upload.uploadId ?? upload.id;
                      const fileName =
                        upload.fileName ??
                        upload.filename ??
                        "Untitled dataset";

                      return (
                        <tr
                          key={uploadId ?? `${fileName}-${index}`}
                          className="h-[76px] border-t border-[#343644]"
                        >
                          <td className="px-5">
                            <div className="flex max-w-[240px] items-center gap-3">
                              <FileSpreadsheet
                                size={19}
                                className="shrink-0 text-[#34E89A]"
                              />

                              <span className="truncate text-[13px] font-medium text-[#EDEFFF]">
                                {fileName}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 text-[12px] text-[#B7B9CB]">
                            {formatDate(upload.createdAt)}
                          </td>

                          <td className="px-5 text-[13px] text-[#EDEFFF]">
                            {(upload.totalRows ?? 0).toLocaleString()}
                          </td>

                          <td className="px-5 text-[13px] text-[#34E89A]">
                            {(upload.acceptedRows ?? 0).toLocaleString()}
                          </td>

                          <td className="px-5 text-[13px] text-[#FF9B9F]">
                            {(upload.rejectedRows ?? 0).toLocaleString()}
                          </td>

                          <td className="px-5">
                            <span
                              className={`inline-flex rounded-md px-3 py-1 text-[10px] font-semibold ${
                                STATUS_STYLES[upload.status]
                              }`}
                            >
                              {upload.status}
                            </span>
                          </td>

                          <td className="px-5">
                            {uploadId ? (
                              <Link
                                href={`/workspace/uploads/${encodeURIComponent(uploadId)}`}
                                className="inline-flex items-center gap-2 text-[12px] font-medium text-[#34E89A] hover:underline"
                              >
                                <Eye size={15} />
                                View details
                              </Link>
                            ) : (
                              <span className="text-xs text-[#8D90A5]">
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

              {/* Pagination */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#343644] px-5 py-4">
                <p className="text-xs text-[#B7B9CB]">
                  Page {page} of {Math.max(totalPages, 1)}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => changePage(page - 1)}
                    className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] transition hover:bg-[#30303B] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => changePage(page + 1)}
                    className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] transition hover:bg-[#30303B] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
