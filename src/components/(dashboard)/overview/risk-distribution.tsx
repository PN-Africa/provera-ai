import type { Transaction } from "@/lib/api/upload";

type RiskDistributionProps = {
  transactions: Transaction[];
};

const RISK_LEVELS = [
  { label: "High", key: "HIGH", barClass: "bg-red-500" },
  { label: "Medium", key: "MEDIUM", barClass: "bg-amber-500" },
  { label: "Low", key: "LOW", barClass: "bg-emerald-500" },
] as const;

export default function RiskDistribution({
  transactions,
}: RiskDistributionProps) {
  const total = transactions.length;

  const counts = RISK_LEVELS.map((level) => {
    const count = transactions.filter(
      (transaction) => transaction.riskLevel === level.key,
    ).length;

    return {
      ...level,
      count,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
    };
  });

  return (
    <section className="rh-[298px] rounded-xl border border-[#343644] bg-[#202026] p-5">
      <div className="mb-5">
        <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
          Risk distribution
        </h2>
      </div>

      {total === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No transactions to display.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {counts.map((level) => {
            const styles = {
              HIGH: {
                label: "High risk",
                background: "bg-[#38252F]",
                text: "text-[#FF9B9F]",
              },
              MEDIUM: {
                label: "Medium risk",
                background: "bg-[#40371F]",
                text: "text-[#E9C45F]",
              },
              LOW: {
                label: "Low risk",
                background: "bg-[#19372F]",
                text: "text-[#7FD7BD]",
              },
            }[level.key];

            return (
              <div key={level.key} className="flex items-center gap-6">
                <span
                  className={`flex h-7 w-[108px] shrink-0 items-center justify-center rounded-lg font-sans text-[12px] font-medium leading-[18px] ${styles.background} ${styles.text}`}
                >
                  {styles.label}
                </span>

                <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
                  {level.count} transactions · {level.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
