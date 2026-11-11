"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCw, FileSpreadsheet } from "lucide-react";

import {
  getUpload,
  rescoreUpload,
  type TransactionUpload,
  type RescoreResponse,
  type UploadStatus,
} from "@/lib/api/upload";

const statusStyles: Record<UploadStatus, string> = {
  PENDING: "bg-[#3A3021] text-[#F5C56B]",
  PROCESSING: "bg-[#252F45] text-[#9DBBFF]",
  COMPLETED: "bg-[#1E352C] text-[#34E89A]",
  FAILED: "bg-[#38252F] text-[#FF9B9F]",
};

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default function UploadDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [upload, setUpload] = useState<TransactionUpload | null>(null);
  const [loading, setLoading] = useState(true);
  const [rescoring, setRescoring] = useState(false);

  const [error, setError] = useState("");
  const [rescoreError, setRescoreError] = useState("");

  const [rescoreResult, setRescoreResult] = useState<RescoreResponse | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    async function loadUpload() {
      try {
        setError("");

        const result = await getUpload(id);

        if (!cancelled) {
          setUpload(result);
        }
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

    void loadUpload();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleRescore() {
    const confirmed = window.confirm(
      "Are you sure you want to rescore this upload? All transactions that have not been reviewed may receive updated scores, risk levels and detection reasons. Reviewed transactions will keep their existing scores.",
    );

    if (!confirmed) return;

    try {
      setRescoring(true);
      setRescoreError("");
      setRescoreResult(null);

      const result = await rescoreUpload(id);

      setRescoreResult(result);

      // Refresh upload details after successful rescoring.
      try {
        const updatedUpload = await getUpload(id);
        setUpload(updatedUpload);
      } catch {
        // The scoring succeeded even if refreshing the upload details fails.
      }
    } catch (err) {
      setRescoreError(
        err instanceof Error ? err.message : "Unable to rescore this upload.",
      );
    } finally {
      setRescoring(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-[#EDEFFF]">
        <div className="flex items-center gap-3 text-sm text-[#B7B9CB]">
          <Loader2 size={20} className="animate-spin" />
          Loading upload details...
        </div>
      </div>
    );
  }

  if (error || !upload) {
    return (
      <div className="min-h-screen bg-black px-5 py-8 text-[#EDEFFF]">
        <Link
          href="/workspace/transaction-data"
          className="inline-flex items-center gap-2 text-sm text-[#34E89A]"
        >
          <ArrowLeft size={16} />
          Back to transaction data
        </Link>

        <h1 className="mt-8 font-manrope text-[26px] font-semibold">
          Upload not found
        </h1>

        <p className="mt-3 text-sm text-[#B7B9CB]">
          {error || "This upload could not be found."}
        </p>
      </div>
    );
  }

  const fileName = upload.fileName ?? upload.filename ?? "Untitled upload";

  const isProcessing =
    upload.status === "PROCESSING" || upload.status === "PENDING";

  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <Link
        href="/workspace/transaction-data"
        className="inline-flex items-center gap-2 text-sm text-[#34E89A] hover:underline"
      >
        <ArrowLeft size={16} />
        Back to uploads
      </Link>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#B7B9CB]">
            Upload details
          </p>

          <div className="mt-3 flex items-center gap-3">
            <FileSpreadsheet size={26} className="shrink-0 text-[#34E89A]" />

            <h1 className="break-all font-manrope text-[25px] font-semibold sm:text-[32px]">
              {fileName}
            </h1>
          </div>

          <p className="mt-3 text-[13px] text-[#B7B9CB]">
            Uploaded {formatDate(upload.createdAt)}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-md px-4 py-2 text-xs font-medium ${statusStyles[upload.status]}`}
        >
          {upload.status}
        </span>
      </div>

      <section className="mt-8 rounded-[10px] border border-[#343644] bg-[#202026] p-6">
        <h2 className="font-manrope text-[19px] font-semibold">
          Upload summary
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="text-[12px] text-[#B7B9CB]">Total rows</p>
            <p className="mt-2 text-[25px] font-semibold">
              {upload.totalRows ?? 0}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#B7B9CB]">Accepted rows</p>
            <p className="mt-2 text-[25px] font-semibold text-[#34E89A]">
              {upload.acceptedRows ?? 0}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#B7B9CB]">Rejected rows</p>
            <p className="mt-2 text-[25px] font-semibold text-[#FF9B9F]">
              {upload.rejectedRows ?? 0}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#B7B9CB]">Flagged rows</p>
            <p className="mt-2 text-[25px] font-semibold text-[#F5C56B]">
              {upload.flaggedRows ?? 0}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#202026] p-6">
        <h2 className="font-manrope text-[19px] font-semibold">
          Rescore this upload
        </h2>

        <p className="mt-3 max-w-[700px] text-[13px] leading-6 text-[#B7B9CB]">
          Run transaction detection again using your current detection rules.
          All eligible transactions in this upload will be rescored.
          Transactions that have already been reviewed will keep the scores
          previously assigned to them.
        </p>

        {isProcessing ? (
          <p className="mt-5 text-[13px] text-[#F5C56B]">
            This upload is still being processed. You can rescore it once
            processing has finished.
          </p>
        ) : (
          <button
            type="button"
            onClick={handleRescore}
            disabled={rescoring}
            className="mt-6 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-6 text-[13px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {rescoring ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Rescoring upload...
              </>
            ) : (
              <>
                <RefreshCw size={17} />
                Rescore Upload
              </>
            )}
          </button>
        )}

        {rescoreError && (
          <div className="mt-5 rounded-lg border border-[#71383D] bg-[#38252F] p-4">
            <p className="text-[13px] text-[#FF9B9F]">{rescoreError}</p>
          </div>
        )}

        {rescoreResult && (
          <div className="mt-5 rounded-lg border border-[#286B50] bg-[#153B2D] p-4">
            <p className="text-sm font-semibold text-[#34E89A]">
              Upload rescored successfully
            </p>

            <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <div>
                <p className="text-[11px] text-[#A8ADB8]">Uploads processed</p>
                <p className="mt-1 text-xl font-semibold">
                  {rescoreResult.uploads}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-[#A8ADB8]">
                  Transactions scored
                </p>
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
      </section>
    </div>
  );
}
