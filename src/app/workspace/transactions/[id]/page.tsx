"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";

import {
  getTransactionById,
  downloadCustomerHistory,
  type Transaction,
} from "@/lib/api/transactions";

import { TransactionDetailHeader } from "@/components/(dashboard)/transaction-details/transaction-detail-header";
import { TransactionSummaryCard } from "@/components/(dashboard)/transaction-details/transaction-summary-card";
import { DetectionExplanation } from "@/components/(dashboard)/transaction-details/detection-explanation";
import { DetailRiskBadge } from "@/components/(dashboard)/transaction-details/detail-risk-badge";

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function TransactionDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params.id;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the transaction details from the backend
  useEffect(() => {
    let cancelled = false;

    async function fetchTransaction() {
      try {
        setLoading(true);
        setError(null);

        const response = await getTransactionById(id);

        if (!cancelled) {
          setTransaction(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load transaction details.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchTransaction();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Download all transactions belonging to this flagged transaction's customer
  const handleDownloadHistory = async () => {
    if (!transaction?.flagged || !transaction.customerId) return;

    try {
      setDownloading(true);
      setDownloadError(null);
      setDownloadSuccess(false);

      await downloadCustomerHistory(transaction.id);

      setDownloadSuccess(true);
    } catch (err) {
      setDownloadError(
        err instanceof Error
          ? err.message
          : "Unable to download customer transaction history.",
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-[#EDEFFF]">
        <div className="flex items-center gap-3 text-[#B7B9CB]">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading transaction details...</span>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-black px-5 py-8 text-[#EDEFFF]">
        <div className="max-w-[600px]">
          <h1 className="font-manrope text-[28px] font-medium">
            Transaction not found
          </h1>

          <p className="mt-3 text-[14px] text-[#B7B9CB]">
            {error ??
              "This transaction is not available in the current dataset."}
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 rounded-lg bg-[#34E89A] px-6 py-3 text-sm font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const formattedAmount = `${transaction.currency} ${Number(
    transaction.amount,
  ).toLocaleString()}`;

  const formattedDate = formatDate(transaction.occurredAt);

  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <TransactionDetailHeader
        transactionId={transaction.transactionId}
        type={formatLabel(transaction.type)}
        date={formattedDate}
        onBack={() => router.back()}
      />

      <div className="mt-6">
        <DetailRiskBadge riskLevel={transaction.riskLevel}>
          {formatLabel(transaction.riskLevel)} Risk
        </DetailRiskBadge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <TransactionSummaryCard
          amount={formattedAmount}
          customerId={transaction.customerId ?? "Not available"}
          paymentMethod={transaction.paymentMethod ?? "Not available"}
          location={transaction.location ?? "Not available"}
          status={
            transaction.reviewStatus
              ? formatLabel(transaction.reviewStatus)
              : "Pending review"
          }
          timestamp={formattedDate}
        />

        <DetectionExplanation
          indicators={transaction.indicators ?? []}
          flagged={transaction.flagged}
        />
      </div>

      {/* Customer history download */}
      {transaction.flagged && (
        <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#202026] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-manrope text-[18px] font-semibold text-[#EDEFFF]">
                Customer transaction history
              </h2>

              <p className="mt-2 max-w-[550px] text-[13px] leading-5 text-[#B7B9CB]">
                Download all available transactions belonging to this customer
                as a CSV file for further investigation.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadHistory}
              disabled={downloading || !transaction.customerId}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[13px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={17} />
                  Download Customer History
                </>
              )}
            </button>
          </div>

          {!transaction.customerId && (
            <p className="mt-3 text-[12px] text-[#F0D18A]">
              Customer history cannot be downloaded because this transaction has
              no associated customer ID.
            </p>
          )}

          {downloadError && (
            <p className="mt-3 text-[13px] text-[#FF9B9F]">{downloadError}</p>
          )}

          {downloadSuccess && (
            <p className="mt-3 text-[13px] text-[#34E89A]">
              Customer transaction history downloaded successfully.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
