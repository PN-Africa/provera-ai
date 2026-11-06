// interface DetailRiskBadgeProps {
//   children: React.ReactNode;
// }

// export function DetailRiskBadge({ children }: DetailRiskBadgeProps) {
//   return (
//     <span className="inline-flex h-[28px] items-center rounded-[6px] bg-[#38252F] px-4 font-sans text-[12px] font-medium leading-[18px] text-[#FF9B9F]">
//       {children}
//     </span>
//   );
// }

import type { ReactNode } from "react";

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

interface DetailRiskBadgeProps {
  riskLevel: RiskLevel;
  children: ReactNode;
}

const riskStyles: Record<RiskLevel, string> = {
  HIGH: "bg-[#38252F] text-[#FF9B9F]",
  MEDIUM: "bg-[#3A3021] text-[#F5C56B]",
  LOW: "bg-[#1E352C] text-[#34E89A]",
};

export function DetailRiskBadge({ riskLevel, children }: DetailRiskBadgeProps) {
  return (
    <span
      className={`inline-flex h-[28px] items-center rounded-[6px] px-4 font-sans text-[12px] font-medium leading-[18px] ${riskStyles[riskLevel]}`}
    >
      {children}
    </span>
  );
}
