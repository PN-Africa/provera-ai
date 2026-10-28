"use client";

import { useParams } from "next/navigation";

import { useTransactions } from "@/components/(dashboard)/transactions/transaction-context";
import { TransactionDetailHeader } from "@/components/(dashboard)/transaction-details/transaction-detail-header";
import { TransactionSummaryCard } from "@/components/(dashboard)/transaction-details/transaction-summary-card";
import { DetectionExplanation } from "@/components/(dashboard)/transaction-details/detection-explanation";
import { DetailRiskBadge } from "@/components/(dashboard)/transaction-details/detail-risk-badge";
// import { HumanReview } from "@/components/(dashboard)/transaction-details/human-review";

export default function TransactionDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);

  const { transactions, reviews } = useTransactions();

  const transaction = transactions.find((item) => item.id === id);

  const review = reviews[id] ?? {
    status: "Pending review" as const,
    note: "",
  };

  if (!transaction) {
    return (
      <div className="min-h-screen bg-black text-[#EDEFFF]">
        <h1 className="font-manrope text-[28px] font-medium">
          Transaction not found
        </h1>

        <p className="mt-3 text-[14px] text-[#B7B9CB]">
          This transaction is not available in the current dataset. It may have
          been replaced by another sample or uploaded dataset.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <TransactionDetailHeader
        transactionId={transaction.id}
        date={transaction.date}
      />

      <div className="mt-6">
        <DetailRiskBadge>{transaction.risk}</DetailRiskBadge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <TransactionSummaryCard
          amount={transaction.amount}
          customerId="Not available in sample data"
          paymentMethod="Not available in sample data"
          location="Not available in sample data"
          status={review.status}
          timestamp={transaction.date}
        />

        <DetectionExplanation
          amount={transaction.amount}
          indicator={transaction.indicator}
          risk={transaction.risk}
        />
      </div>

      {/* <HumanReview transactionId={transaction.id} /> */}
    </div>
  );
}
