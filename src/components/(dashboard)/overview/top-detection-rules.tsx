"use client";

import type { DashboardSummary } from "@/lib/api/upload";
import { ShieldAlert, TrendingUp } from "lucide-react";

type TopDetectionRulesProps = {
  indicators: DashboardSummary["topIndicators"];
};

export default function TopDetectionRules({
  indicators,
}: TopDetectionRulesProps) {
  const sortedIndicators = [...(indicators ?? [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const highestCount = Math.max(
    ...sortedIndicators.map((item) => item.count),
    0,
  );

  return (
    <section className="self-start rounded-xl border border-[#343644] bg-[#202026] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            Top 10 detection rules
          </h2>

          <p className="mt-2 text-[12px] text-[#B7B9CB]">
            Most frequently triggered fraud indicators
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#19372F]">
          <ShieldAlert size={20} className="text-[#34E89A]" />
        </div>
      </div>

      {sortedIndicators.length === 0 ? (
        <div className="py-10 text-center">
          <ShieldAlert size={28} className="mx-auto text-[#8D90A5]" />

          <p className="mt-3 text-sm text-[#B7B9CB]">
            No detection indicators available.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {sortedIndicators.map((indicator, index) => {
            const percentage =
              highestCount > 0 ? (indicator.count / highestCount) * 100 : 0;

            return (
              <div key={`${indicator.ruleName}-${index}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#30303B] text-[11px] font-semibold text-[#B7B9CB]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="break-words text-[13px] font-medium leading-5 text-[#EDEFFF]">
                        {indicator.ruleName}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-[#8D90A5]">
                        <TrendingUp size={12} />
                        {indicator.percentOfScored.toFixed(1)}% of scored
                        transactions
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[15px] font-semibold text-[#34E89A]">
                      {indicator.count.toLocaleString()}
                    </p>

                    <p className="text-[10px] text-[#8D90A5]">Triggers</p>
                  </div>
                </div>

                <div className="ml-10 mt-3 h-1.5 overflow-hidden rounded-full bg-[#343644]">
                  <div
                    className="h-full rounded-full bg-[#34E89A] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
