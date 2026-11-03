// "use client";

// import { useMemo } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import type { Transaction } from "@/lib/api/upload";

// type TransactionActivityProps = {
//   transactions: Transaction[];
// };

// export default function TransactionActivity({
//   transactions,
// }: TransactionActivityProps) {
//   const chartData = useMemo(() => {
//     const countsByDay = new Map<string, number>();

//     transactions.forEach((transaction) => {
//       const rawDate = transaction.uploadedAt;
//       if (!rawDate) return;

//       const date = new Date(rawDate);
//       if (Number.isNaN(date.getTime())) return;

//       const dayKey = date.toISOString().slice(0, 10);
//       countsByDay.set(dayKey, (countsByDay.get(dayKey) ?? 0) + 1);
//     });
//     console.log("Transaction date fields:", transactions[0]);

//     // transactions.forEach((transaction) => {
//     //   // const date = new Date(transaction.occurredAt);
//     //   const date = new Date(transaction.uploadedAt);
//     //   const dayKey = date.toISOString().slice(0, 10);

//     //   countsByDay.set(dayKey, (countsByDay.get(dayKey) ?? 0) + 1);
//     // });

//     // const latestDate = transactions.length
//     //   ? new Date(
//     //       Math.max(
//     //         ...transactions.map((transaction) =>
//     //           new Date(transaction.occurredAt).getTime(),
//     //         ),
//     //       ),
//     //     )
//     //   : new Date();

//     const latestDate = new Date();
//     latestDate.setUTCHours(0, 0, 0, 0);

//     latestDate.setUTCHours(0, 0, 0, 0);

//     return Array.from({ length: 4 }, (_, index) => {
//       const date = new Date(latestDate);
//       date.setUTCDate(latestDate.getUTCDate() - (3 - index));

//       const dayKey = date.toISOString().slice(0, 10);

//       return {
//         date: date.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           timeZone: "UTC",
//         }),
//         count: countsByDay.get(dayKey) ?? 0,
//       };
//     });
//   }, [transactions]);

//   return (
//     <section className="h-[298px] rounded-xl border border-[#343644] bg-[#202026] p-5">
//       <div className="mb-5">
//         <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
//           Transaction activity
//         </h2>
//         <p className="mt-3 font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
//           Daily volume · UTC
//         </p>
//       </div>

//       {chartData.length === 0 ? (
//         <p className="py-12 text-center text-sm text-muted-foreground">
//           No transaction activity to display.
//         </p>
//       ) : (
//         <div className="mt-5 h-[190px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 15,
//                 right: 10,
//                 left: -20,
//                 bottom: 0,
//               }}
//             >
//               <CartesianGrid
//                 vertical={false}
//                 stroke="#343644"
//                 strokeDasharray="3 3"
//               />
//               <XAxis
//                 dataKey="date"
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{
//                   fill: "#B7B9CB",
//                   fontSize: 12,
//                 }}
//               />
//               <YAxis
//                 allowDecimals={false}
//                 tickLine={false}
//                 axisLine={false}
//                 hide
//                 domain={[0, 25]}
//               />
//               <Tooltip
//                 cursor={false}
//                 contentStyle={{
//                   background: "#1C1D27",
//                   border: "1px solid #343644",
//                   borderRadius: "8px",
//                   color: "#EDEFFF",
//                 }}
//               />
//               <Bar
//                 dataKey="count"
//                 name="Transactions"
//                 fill="#34E89A"
//                 label={{
//                   position: "top",
//                   fill: "#B7B9CB",
//                   fontSize: 12,
//                 }}
//                 radius={[0, 0, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardTrendPoint } from "@/lib/api/upload";

type TransactionActivityProps = {
  points: DashboardTrendPoint[];
};

export default function TransactionActivity({
  points,
}: TransactionActivityProps) {
  const chartData = points.map((point) => ({
    date: new Date(`${point.period}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "Africa/Lagos",
    }),
    count: point.total,
  }));

  return (
    <section className="h-[298px] rounded-xl border border-[#343644] bg-[#202026] p-5">
      <div className="mb-5">
        <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
          Transaction activity
        </h2>
        <p className="mt-3 font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
          Daily volume · WAT
        </p>
      </div>

      <div className="mt-5 h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
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
              tick={{ fill: "#B7B9CB", fontSize: 12 }}
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
            <Bar
              dataKey="count"
              name="Transactions"
              fill="#34E89A"
              label={{
                position: "top",
                fill: "#B7B9CB",
                fontSize: 12,
              }}
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
