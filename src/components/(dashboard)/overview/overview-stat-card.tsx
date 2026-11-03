import type { Transaction } from "@/lib/api/upload";

type OverviewStatsProps = {
  transactions: Transaction[];
  totalTransactions: number;
};

export default function OverviewStats({
  transactions,
  totalTransactions,
}: OverviewStatsProps) {
  // const flaggedCount = transactions.filter(
  //   (transaction) => transaction.flagged,
  // ).length;

  const highRiskCount = transactions.filter(
    (transaction) => transaction.riskLevel === "HIGH",
  ).length;

  const mediumCount = transactions.filter(
    (transaction) => transaction.riskLevel === "MEDIUM",
  ).length;
  const lowCount = transactions.filter(
    (transaction) => transaction.riskLevel === "LOW",
  ).length;

  const stats = [
    {
      label: "Total transactions",
      value: totalTransactions.toLocaleString(),
      description: "All transactions",
    },
    {
      label: "High risk",
      value: highRiskCount.toLocaleString(),
      description: "In the loaded transactions",
    },
    {
      label: "Medium risk",
      value: mediumCount.toLocaleString(),
      description: "In the loaded transactions",
    },
    {
      label: "Low  risk",
      value: lowCount.toLocaleString(),
      description: "In the loaded transactions",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-[#343644] bg-[#202026] px-5 py-5"
        >
          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            {stat.label}
          </p>
          <p className="mt-3 font-manrope text-[32px] font-semibold leading-[40px] tracking-[-0.3px] text-[#EDEFFF]">
            {stat.value}
          </p>
          <p className="mt-2 font-sans text-[12px] font-normal leading-[18px] text-[#7F8297]">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  );
}
