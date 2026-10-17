type RiskLevel = "High risk" | "Medium risk" | "Low risk";

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const styles = {
    "High risk": "text-[#FF9B9F]",
    "Medium risk": "text-[#FFD66B]",
    "Low risk": "text-[#8FD6C0]",
  };

  return (
    <span
      className={`font-sans text-[14px] font-normal leading-[20px] ${styles[level]}`}
    >
      {level}
    </span>
  );
}
