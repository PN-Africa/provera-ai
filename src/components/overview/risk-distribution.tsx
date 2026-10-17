export function RiskDistribution() {
  return (
    <div className="h-[298px] rounded-xl border border-[#343644] bg-[#1C1D27] p-5">
      <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
        Risk distribution
      </h2>

      <div className="mt-5 space-y-4">
        {/* High risk */}
        <div className="flex items-center gap-6">
          <span className="flex h-7 w-[108px] items-center justify-center rounded-lg bg-[#38252F] font-sans text-[12px] font-medium leading-[18px] text-[#FF9B9F]">
            High risk
          </span>

          <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
            2 transactions · 3%
          </span>
        </div>

        {/* Medium risk */}
        <div className="flex items-center gap-6">
          <span className="flex h-7 w-[108px] items-center justify-center rounded-lg bg-[#40371F] font-sans text-[12px] font-medium leading-[18px] text-[#E9C45F]">
            Medium risk
          </span>

          <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
            2 transactions · 3%
          </span>
        </div>

        {/* Low risk */}
        <div className="flex items-center gap-6">
          <span className="flex h-7 w-[108px] items-center justify-center rounded-lg bg-[#19372F] font-sans text-[12px] font-medium leading-[18px] text-[#7FD7BD]">
            Low risk
          </span>

          <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
            65 transactions · 94%
          </span>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import {
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const riskData = [
//   {
//     name: "High risk",
//     value: 2,
//   },
//   {
//     name: "Medium risk",
//     value: 2,
//   },
//   {
//     name: "Low risk",
//     value: 65,
//   },
// ];

// const riskColors = ["#FF6B70", "#FFD66B", "#8FD6C0"];

// export function RiskDistribution() {
//   return (
//     <section className="rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
//       <div>
//         <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
//           Risk
//         </p>

//         <h2 className="mt-2 font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
//           Risk distribution
//         </h2>

//         <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
//           Risk indications across the selected dataset.
//         </p>
//       </div>

//       <div className="mt-6 flex items-center justify-center">
//         <div className="h-[220px] w-[220px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={riskData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={62}
//                 outerRadius={88}
//                 paddingAngle={2}
//                 stroke="none"
//               >
//                 {riskData.map((entry, index) => (
//                   <Cell
//                     key={entry.name}
//                     fill={riskColors[index]}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1C1D27",
//                   border: "1px solid #343644",
//                   borderRadius: "6px",
//                   color: "#EDEFFF",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="mt-4 space-y-3">
//         {riskData.map((risk, index) => (
//           <div
//             key={risk.name}
//             className="flex items-center justify-between"
//           >
//             <div className="flex items-center gap-3">
//               <span
//                 className="h-2.5 w-2.5 rounded-full"
//                 style={{
//                   backgroundColor: riskColors[index],
//                 }}
//               />

//               <span className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
//                 {risk.name}
//               </span>
//             </div>

//             <span className="font-manrope text-[16px] font-semibold leading-[24px] text-[#EDEFFF]">
//               {risk.value}
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
