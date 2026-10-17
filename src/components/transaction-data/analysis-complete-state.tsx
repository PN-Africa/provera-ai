"use client";

import Link from "next/link";

interface AnalysisCompleteStateProps {
  onReset: () => void;
  totalAnalyzed: number;
  totalFlagged: number;
}

export function AnalysisCompleteState({
  onReset,
  totalAnalyzed,
  totalFlagged,
}: AnalysisCompleteStateProps) {
  return (
    <div className="mt-6 rounded-xl border border-[#343644] bg-[#1C1D27] p-10">
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

      <Link
        href="/workspace/flagged-transactions"
        className="mt-5 flex h-[46px] w-[280px] items-center justify-center rounded-lg bg-[#455EFF] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#4057E6]"
      >
        Review flagged transactions
      </Link>

      <Link
        href="/workspace/overview"
        className="mt-4 flex h-[46px] w-[220px] items-center justify-center rounded-lg border border-[#343644] bg-[#1C1D27] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Open overview
      </Link>

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
