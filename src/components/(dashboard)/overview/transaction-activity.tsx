// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import type { DashboardTrendPoint } from "@/lib/api/upload";

// type TransactionActivityProps = {
//   points: DashboardTrendPoint[];
// };

// export default function TransactionActivity({
//   points,
// }: TransactionActivityProps) {
//   const chartData = points.map((point) => ({
//     date: new Date(`${point.period}T12:00:00`).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       timeZone: "Africa/Lagos",
//     }),
//     count: point.total,
//   }));

//   return (
//     <section className="h-[298px] rounded-xl border border-[#343644] bg-[#202026] p-5">
//       <div className="mb-5">
//         <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
//           Transaction activity
//         </h2>
//         <p className="mt-3 font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
//           Daily volume · WAT
//         </p>
//       </div>

//       <div className="mt-5 h-[190px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={chartData}
//             margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
//           >
//             <CartesianGrid
//               vertical={false}
//               stroke="#343644"
//               strokeDasharray="3 3"
//             />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: "#B7B9CB", fontSize: 12 }}
//             />
//             <YAxis
//               allowDecimals={false}
//               tickLine={false}
//               axisLine={false}
//               hide
//             />
//             <Tooltip
//               cursor={false}
//               contentStyle={{
//                 background: "#1C1D27",
//                 border: "1px solid #343644",
//                 borderRadius: "8px",
//                 color: "#EDEFFF",
//               }}
//             />
//             <Bar
//               dataKey="count"
//               name="Transactions"
//               fill="#34E89A"
//               label={{
//                 position: "top",
//                 fill: "#B7B9CB",
//                 fontSize: 12,
//               }}
//               radius={[0, 0, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }

// import type { Transaction } from "@/lib/api/upload";

// type OverviewStatsProps = {
//   transactions: Transaction[];
//   totalTransactions: number;
// };

// export default function OverviewStats({
//   transactions,
//   totalTransactions,
// }: OverviewStatsProps) {
//   const highRiskCount = transactions.filter(
//     (transaction) => transaction.riskLevel === "HIGH",
//   ).length;

//   const mediumCount = transactions.filter(
//     (transaction) => transaction.riskLevel === "MEDIUM",
//   ).length;
//   const lowCount = transactions.filter(
//     (transaction) => transaction.riskLevel === "LOW",
//   ).length;

//   const stats = [
//     {
//       label: "Total transactions",
//       value: totalTransactions.toLocaleString(),
//       description: "All transactions",
//     },
//     {
//       label: "High risk",
//       value: highRiskCount.toLocaleString(),
//       description: "In the loaded transactions",
//     },
//     {
//       label: "Medium risk",
//       value: mediumCount.toLocaleString(),
//       description: "In the loaded transactions",
//     },
//     {
//       label: "Low  risk",
//       value: lowCount.toLocaleString(),
//       description: "In the loaded transactions",
//     },
//   ];

//   return (
//     <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//       {stats.map((stat) => (
//         <div
//           key={stat.label}
//           className="rounded-[10px] border border-[#343644] bg-[#202026] px-5 py-5"
//         >
//           <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
//             {stat.label}
//           </p>
//           <p className="mt-3 font-manrope text-[32px] font-semibold leading-[40px] tracking-[-0.3px] text-[#EDEFFF]">
//             {stat.value}
//           </p>
//           <p className="mt-2 font-sans text-[12px] font-normal leading-[18px] text-[#7F8297]">
//             {stat.description}
//           </p>
//         </div>
//       ))}
//     </section>
//   );
// }

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardTrendPoint } from "@/lib/api/upload";

type TransactionActivityProps = {
  points: DashboardTrendPoint[];
  interval: "day" | "week";
  onIntervalChange: (interval: "day" | "week") => void;
};

export default function TransactionActivity({
  points,
  interval,
  onIntervalChange,
}: TransactionActivityProps) {
  const chartData = points.map((point) => {
    const date = new Date(`${point.period}T12:00:00`);

    return {
      date: Number.isNaN(date.getTime())
        ? point.period
        : new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "Africa/Lagos",
          }).format(date),

      total: point.total,
      flagged: point.flagged,
      high: point.high,
    };
  });

  return (
    <section className="min-h-[298px] rounded-xl border border-[#343644] bg-[#202026] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            Transaction activity
          </h2>

          <p className="mt-2 font-sans text-[12px] text-[#B7B9CB]">
            {interval === "day"
              ? "Daily transaction activity · WAT"
              : "Weekly transaction activity · WAT"}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#343644] bg-[#171821] p-1">
          <button
            type="button"
            onClick={() => onIntervalChange("day")}
            className={`rounded-md px-3 py-2 text-xs transition ${
              interval === "day"
                ? "bg-[#34E89A] font-medium text-[#0B0C0E]"
                : "text-[#B7B9CB] hover:text-[#EDEFFF]"
            }`}
          >
            Daily
          </button>

          <button
            type="button"
            onClick={() => onIntervalChange("week")}
            className={`rounded-md px-3 py-2 text-xs transition ${
              interval === "week"
                ? "bg-[#34E89A] font-medium text-[#0B0C0E]"
                : "text-[#B7B9CB] hover:text-[#EDEFFF]"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="mt-5 h-[210px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#B7B9CB]">
            No transaction activity available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              barGap={3}
            >
              <CartesianGrid
                vertical={false}
                stroke="#343644"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#B7B9CB", fontSize: 11 }}
                interval="preserveStartEnd"
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                hide
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#1C1D27",
                  border: "1px solid #343644",
                  borderRadius: "8px",
                  color: "#EDEFFF",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={30}
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#B7B9CB",
                }}
              />

              <Bar
                dataKey="total"
                name="Total transactions"
                fill="#34E89A"
                radius={[3, 3, 0, 0]}
              />

              <Bar
                dataKey="flagged"
                name="Flagged"
                fill="#F5C56B"
                radius={[3, 3, 0, 0]}
              />

              <Bar
                dataKey="high"
                name="High risk"
                fill="#FF7B84"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
