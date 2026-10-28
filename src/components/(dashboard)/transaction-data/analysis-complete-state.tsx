"use client";

import Link from "next/link";

interface AnalysisCompleteStateProps {
  onReset: () => void;
  totalAnalyzed: number;
  totalFlagged: number;
  portal?: "admin" | "client";
}

export function AnalysisCompleteState({
  onReset,
  totalAnalyzed,
  totalFlagged,
  portal = "client",
}: AnalysisCompleteStateProps) {
  const flaggedTransactionsPath =
    portal === "admin"
      ? "/admin/workspace/flagged-transactions"
      : "/workspace/flagged-transactions";

  const overviewPath =
    portal === "admin" ? "/admin/workspace/overview" : "/workspace/overview";

  return (
    <div className="mt-6 rounded-xl border border-[#343644] bg-[#1C1D27] p-6 sm:p-10">
      <h2 className="font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
        Your demo analysis is ready
      </h2>

      <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
        {totalAnalyzed} transactions analyzed. {totalFlagged} flagged for human
        review.
      </p>

      <p className="mt-2 font-sans text-[13px] leading-[20px] text-[#B7B9CB]">
        These results use simulated, rule-based indicators for demonstration. A
        flagged transaction is not proof of fraud.
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <Link
          href={flaggedTransactionsPath}
          className="flex min-h-[46px] items-center justify-center rounded-lg bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
        >
          Review flagged transactions
        </Link>

        <Link
          href={overviewPath}
          className="flex min-h-[46px] items-center justify-center rounded-lg border border-[#203B30] bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
        >
          Open overview
        </Link>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 block font-sans text-[14px] leading-[20px] text-[#B7B9CB] hover:text-[#EDEFFF] hover:underline"
      >
        Upload another dataset
      </button>
    </div>
  );
}
