interface DetailRiskBadgeProps {
  children: React.ReactNode;
}

export function DetailRiskBadge({ children }: DetailRiskBadgeProps) {
  return (
    <span className="inline-flex h-[28px] items-center rounded-[6px] bg-[#38252F] px-4 font-sans text-[12px] font-medium leading-[18px] text-[#FF9B9F]">
      {children}
    </span>
  );
}
