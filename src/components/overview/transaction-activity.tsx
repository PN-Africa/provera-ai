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

const activityData = [
  {
    date: "28 Sep",
    transactions: 16,
  },
  {
    date: "29 Sep",
    transactions: 16,
  },
  {
    date: "30 Sep",
    transactions: 16,
  },
  {
    date: "01 Oct",
    transactions: 21,
  },
];

export function TransactionActivity() {
  return (
    <div className="h-[298px] rounded-xl border border-[#343644] bg-[#1C1D27] p-5">
      <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
        Transaction activity
      </h2>

      <p className="mt-3 font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
        Daily volume · UTC
      </p>

      <div className="mt-5 h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activityData}
            margin={{
              top: 15,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#343644"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#B7B9CB",
                fontSize: 12,
              }}
            />

            <YAxis hide domain={[0, 25]} />

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
              dataKey="transactions"
              fill="#455EFF"
              radius={[0, 0, 0, 0]}
              barSize={54}
              label={{
                position: "top",
                fill: "#B7B9CB",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ("use client");

// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const activityData = [
//   {
//     date: "28 Sep",
//     transactions: 8,
//   },
//   {
//     date: "29 Sep",
//     transactions: 12,
//   },
//   {
//     date: "30 Sep",
//     transactions: 18,
//   },
//   {
//     date: "01 Oct",
//     transactions: 31,
//   },
// ];

// export function TransactionActivity() {
//   return (
//     <section className="rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
//       <div>
//         <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
//           Activity
//         </p>

//         <h2 className="mt-2 font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
//           Transaction activity
//         </h2>

//         <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
//           Transactions analyzed across the selected date range.
//         </p>
//       </div>

//       <div className="mt-8 h-[280px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={activityData}
//             margin={{
//               top: 10,
//               right: 10,
//               left: -20,
//               bottom: 0,
//             }}
//           >
//             <CartesianGrid
//               stroke="#343644"
//               strokeDasharray="3 3"
//               vertical={false}
//             />

//             <XAxis
//               dataKey="date"
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fill: "#7F8297",
//                 fontSize: 12,
//               }}
//             />

//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fill: "#7F8297",
//                 fontSize: 12,
//               }}
//               allowDecimals={false}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#1C1D27",
//                 border: "1px solid #343644",
//                 borderRadius: "6px",
//                 color: "#EDEFFF",
//               }}
//               labelStyle={{
//                 color: "#B7B9CB",
//               }}
//             />

//             <Line
//               type="monotone"
//               dataKey="transactions"
//               stroke="#455EFF"
//               strokeWidth={2}
//               dot={{
//                 r: 3,
//                 fill: "#455EFF",
//               }}
//               activeDot={{
//                 r: 5,
//               }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }
