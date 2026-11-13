"use client";

import type { DashboardSummary } from "@/lib/api/upload";
import { ClipboardCheck } from "lucide-react";

type ReviewProgressProps = {
  reviews: DashboardSummary["reviews"];
};

const REVIEW_STATUSES = [
  {
    label: "Open",
    key: "open",
    color: "#9DBBFF",
    background: "bg-[#252F45]",
    dot: "bg-[#9DBBFF]",
  },
  {
    label: "Closed",
    key: "closed",
    color: "#B7B9CB",
    background: "bg-[#30303B]",
    dot: "bg-[#B7B9CB]",
  },
  {
    label: "Cleared",
    key: "cleared",
    color: "#7FD7BD",
    background: "bg-[#19372F]",
    dot: "bg-[#34E89A]",
  },
  {
    label: "Escalated",
    key: "escalated",
    color: "#FF9B9F",
    background: "bg-[#38252F]",
    dot: "bg-[#FF7B84]",
  },
] as const;

export default function ReviewProgress({ reviews }: ReviewProgressProps) {
  const totalReviews = REVIEW_STATUSES.reduce(
    (total, status) => total + Number(reviews?.[status.key] ?? 0),
    0,
  );

  return (
    <section className="self-start rounded-xl border border-[#343644] bg-[#202026] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            Review progress
          </h2>

          <p className="mt-2 text-[12px] text-[#B7B9CB]">
            Overview of transaction review statuses
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#252F45]">
          <ClipboardCheck size={20} className="text-[#9DBBFF]" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[12px] text-[#8D90A5]">Total reviews</p>

        <p className="mt-1 font-manrope text-[30px] font-semibold text-[#EDEFFF]">
          {totalReviews.toLocaleString()}
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {REVIEW_STATUSES.map((status) => {
          const count = Number(reviews?.[status.key] ?? 0);

          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <div key={status.key}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${status.dot}`} />

                  <span className="text-[13px] text-[#B7B9CB]">
                    {status.label}
                  </span>
                </div>

                <span className="text-[13px] font-semibold text-[#EDEFFF]">
                  {count.toLocaleString()}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#343644]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: status.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
