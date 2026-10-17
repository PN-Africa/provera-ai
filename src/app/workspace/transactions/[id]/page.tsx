"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useTransactions } from "@/components/transactions/transaction-context";
import { TransactionDetailHeader } from "@/components/transaction-details/transaction-detail-header";
import { TransactionSummaryCard } from "@/components/transaction-details/transaction-summary-card";
import { DetectionExplanation } from "@/components/transaction-details/detection-explanation";
import { DetailRiskBadge } from "@/components/transaction-details/detail-risk-badge";

type ReviewStatus = "Pending review" | "Reviewed" | "Escalated";

export default function TransactionDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);

  const { transactions, reviews, updateReview } = useTransactions();

  const transaction = transactions.find((item) => item.id === id);

  const review = reviews[id] ?? {
    status: "Pending review" as const,
    note: "",
  };

  const [reviewNote, setReviewNote] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  if (!transaction) {
    return (
      <div className="min-h-screen bg-black px-6 py-10 text-[#EDEFFF] lg:px-10">
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

  const handleSaveNote = () => {
    const note = reviewNote.trim();

    if (!note) {
      setNoteMessage("Enter a review note before saving.");
      return;
    }

    updateReview(id, { note });
    setReviewNote("");
    setNoteMessage("Review note saved for this app session.");
  };

  const handleStatusChange = (status: ReviewStatus) => {
    updateReview(id, { status });
  };

  return (
    <div className="min-h-screen bg-black px-6 py-8 text-[#EDEFFF] lg:px-10 lg:py-10">
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

      <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
        <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
          Human review
        </p>

        <h2 className="mt-3 font-manrope text-[24px] font-medium leading-[32px] text-[#EDEFFF]">
          Review this transaction
        </h2>

        <p className="mt-2 text-[14px] leading-[22px] text-[#B7B9CB]">
          Record a review decision based on the available information. A risk
          indicator alone does not establish fraud.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-[14px] text-[#B7B9CB]">Current status:</span>

          <span
            className={`rounded-full border px-3 py-1 text-[13px] ${
              review.status === "Reviewed"
                ? "border-[#286B50] bg-[#153B2D] text-[#86E0B5]"
                : review.status === "Escalated"
                  ? "border-[#854545] bg-[#3A2025] text-[#FFAAAA]"
                  : "border-[#66552E] bg-[#302918] text-[#F0D18A]"
            }`}
          >
            {review.status}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleStatusChange("Reviewed")}
            className="rounded-[7px] bg-[#455EFF] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-[#354CE0]"
          >
            Mark as reviewed
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange("Escalated")}
            className="rounded-[7px] border border-[#854545] bg-transparent px-5 py-3 text-[14px] font-medium text-[#FFAAAA] transition hover:bg-[#3A2025]"
          >
            Escalate transaction
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange("Pending review")}
            className="rounded-[7px] border border-[#343644] px-5 py-3 text-[14px] font-medium text-[#B7B9CB] transition hover:bg-[#252633]"
          >
            Reset status
          </button>
        </div>

        <div className="mt-7">
          <label
            htmlFor="review-note"
            className="font-sans text-[14px] font-medium text-[#EDEFFF]"
          >
            Review note
          </label>

          <textarea
            id="review-note"
            value={reviewNote}
            onChange={(event) => {
              setReviewNote(event.target.value);
              setNoteMessage("");
            }}
            placeholder="Document your observations or explain why you escalated this transaction..."
            rows={4}
            className="mt-3 w-full resize-y rounded-[7px] border border-[#343644] bg-[#171821] px-4 py-3 text-[14px] leading-[22px] text-[#EDEFFF] outline-none placeholder:text-[#777A90] focus:border-[#455EFF]"
          />

          <button
            type="button"
            onClick={handleSaveNote}
            className="mt-3 rounded-[7px] border border-[#45485B] px-5 py-3 text-[14px] font-medium text-[#EDEFFF] transition hover:bg-[#252633]"
          >
            Save review note
          </button>

          {noteMessage && (
            <p role="status" className="mt-3 text-[13px] text-[#B7B9CB]">
              {noteMessage}
            </p>
          )}

          {review.note && (
            <div className="mt-5 rounded-[7px] border border-[#343644] bg-[#171821] p-4">
              <p className="text-[12px] font-medium uppercase text-[#B7B9CB]">
                Saved review note
              </p>

              <p className="mt-2 whitespace-pre-wrap text-[14px] leading-[22px] text-[#EDEFFF]">
                {review.note}
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 border-t border-[#343644] pt-4 text-[12px] leading-[20px] text-[#8D90A5]">
          Demo limitation: review status and notes are shared across pages
          during this app session. They are not persisted to a database and may
          be lost when the page is refreshed.
        </p>
      </section>
    </div>
  );
}
