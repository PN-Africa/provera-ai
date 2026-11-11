"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileSpreadsheet, Loader2, RefreshCw, Eye } from "lucide-react";

import {
  getUploads,
  scoreUnscoredUploads,
  type TransactionUpload,
  type ScoreUploadsResponse,
  type UploadStatus,
} from "@/lib/api/upload";

const PAGE_SIZE = 10;

const statusStyles: Record<UploadStatus, string> = {
  PENDING: "bg-[#3A3021] text-[#F5C56B]",
  PROCESSING: "bg-[#252F45] text-[#9DBBFF]",
  COMPLETED: "bg-[#1E352C] text-[#34E89A]",
  FAILED: "bg-[#38252F] text-[#FF9B9F]",
};

function formatDate(value?: string) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

interface UploadHistoryProps {
  refreshKey?: string;
}

export function UploadHistory({ refreshKey = "" }: UploadHistoryProps) {
  const [uploads, setUploads] = useState<TransactionUpload[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [scoring, setScoring] = useState(false);

  const [error, setError] = useState("");
  const [scoringError, setScoringError] = useState("");
  const [scoringResult, setScoringResult] =
    useState<ScoreUploadsResponse | null>(null);

  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadUploads() {
      try {
        setError("");

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
  }, [page, refreshKey, refreshVersion]);

  async function handleScoreUnscored() {
    try {
      setScoring(true);
      setScoringError("");
      setScoringResult(null);

      const result = await scoreUnscoredUploads();

      setScoringResult(result);

      // Refresh the upload list after scoring.
      setRefreshVersion((version) => version + 1);
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

  return (
    <section className="mt-10 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-manrope text-[24px] font-semibold text-[#EDEFFF]">
            Upload History
          </h2>

          <p className="mt-2 text-[13px] text-[#B7B9CB]">
            View your previous transaction uploads and manage scoring.
          </p>
        </div>

        <button
          type="button"
          onClick={handleScoreUnscored}
          disabled={scoring}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[13px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {scoring ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Scoring transactions...
            </>
          ) : (
            <>
              <RefreshCw size={17} />
              Score Unscored Transactions
            </>
          )}
        </button>
      </div>

      {scoringError && (
        <div className="mt-5 rounded-lg border border-[#71383D] bg-[#38252F] p-4">
          <p className="text-[13px] text-[#FF9B9F]">{scoringError}</p>
        </div>
      )}

      {scoringResult && (
        <div className="mt-5 rounded-lg border border-[#286B50] bg-[#153B2D] p-4">
          <p className="text-[14px] font-semibold text-[#34E89A]">
            Scoring completed successfully
          </p>

          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-[11px] text-[#A8ADB8]">Uploads processed</p>
              <p className="mt-1 text-xl font-semibold text-[#EDEFFF]">
                {scoringResult.uploads}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Transactions scored</p>
              <p className="mt-1 text-xl font-semibold text-[#EDEFFF]">
                {scoringResult.scored}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Flagged</p>
              <p className="mt-1 text-xl font-semibold text-[#EDEFFF]">
                {scoringResult.flagged}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-[#A8ADB8]">Reviewed skipped</p>
              <p className="mt-1 text-xl font-semibold text-[#EDEFFF]">
                {scoringResult.skippedReviewed}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-[10px] border border-[#343644] bg-[#202026]">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-12 text-sm text-[#B7B9CB]">
            <Loader2 size={19} className="animate-spin" />
            Loading upload history...
          </div>
        ) : error ? (
          <div className="p-6">
            <p className="text-sm text-[#FF9B9F]">{error}</p>

            <button
              type="button"
              onClick={() => setRefreshVersion((version) => version + 1)}
              className="mt-3 text-sm text-[#EDEFFF] underline"
            >
              Try again
            </button>
          </div>
        ) : uploads.length === 0 ? (
          <div className="py-12 text-center">
            <FileSpreadsheet size={30} className="mx-auto text-[#8D90A5]" />

            <p className="mt-4 text-sm font-medium text-[#EDEFFF]">
              No uploads found
            </p>

            <p className="mt-2 text-xs text-[#B7B9CB]">
              Your uploaded CSV files will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="h-14 bg-[#2A2A32] text-left">
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      File name
                    </th>
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      Uploaded
                    </th>
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      Total rows
                    </th>
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      Flagged
                    </th>
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      Status
                    </th>
                    <th className="px-5 text-xs font-normal text-[#B7B9CB]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {uploads.map((upload, index) => {
                    const uploadId = upload.uploadId ?? upload.id;
                    const fileName =
                      upload.fileName ?? upload.filename ?? "Untitled upload";

                    return (
                      <tr
                        key={uploadId ?? `${fileName}-${index}`}
                        className="h-[76px] border-t border-[#343644]"
                      >
                        <td className="px-5">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet
                              size={19}
                              className="shrink-0 text-[#34E89A]"
                            />

                            <span className="max-w-[220px] truncate text-sm text-[#EDEFFF]">
                              {fileName}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 text-[13px] text-[#B7B9CB]">
                          {formatDate(upload.createdAt)}
                        </td>

                        <td className="px-5 text-sm text-[#EDEFFF]">
                          {upload.totalRows ?? 0}
                        </td>

                        <td className="px-5 text-sm text-[#EDEFFF]">
                          {upload.flaggedRows ?? 0}
                        </td>

                        <td className="px-5">
                          <span
                            className={`inline-flex rounded-md px-3 py-1 text-[11px] font-medium ${
                              statusStyles[upload.status]
                            }`}
                          >
                            {upload.status}
                          </span>
                        </td>

                        <td className="px-5">
                          {uploadId ? (
                            <Link
                              href={`/workspace/uploads/${encodeURIComponent(uploadId)}`}
                              className="inline-flex items-center gap-2 text-[13px] text-[#34E89A] hover:underline"
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#343644] px-5 py-4">
              <p className="text-xs text-[#B7B9CB]">
                {total} upload{total === 1 ? "" : "s"} in total
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setLoading(true);
                    setPage((current) => current - 1);
                  }}
                  className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-xs text-[#B7B9CB]">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setLoading(true);
                    setPage((current) => current + 1);
                  }}
                  className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
