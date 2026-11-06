type TransactionIndicator = {
  ruleName: string;
  reason: string;
  details?: Record<string, unknown>;
  ruleKey?: string;
  weight?: number;
};

interface DetectionExplanationProps {
  indicators: TransactionIndicator[];
  flagged: boolean;
}

export function DetectionExplanation({
  indicators,
  flagged,
}: DetectionExplanationProps) {
  return (
    <div className="rounded-[10px] border border-[#343644] bg-[#202026] p-6">
      <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
        Detection explanation
      </p>

      <h2 className="mt-3 font-manrope text-[24px] font-medium leading-[32px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[28px] sm:leading-[36px]">
        {flagged
          ? "Why this transaction was flagged"
          : indicators.length > 0
            ? "Risk indicators"
            : "No indicators returned"}
      </h2>

      {indicators.length > 0 ? (
        <div className="mt-5 space-y-5">
          {indicators.map((indicator, index) => (
            <div key={`${indicator.ruleKey ?? indicator.ruleName}-${index}`}>
              <h3 className="font-manrope text-[18px] font-medium leading-[26px] text-[#EDEFFF]">
                {indicator.ruleName}
              </h3>
              <p className="mt-2 font-sans text-[14px] leading-[22px] text-[#B7B9CB]">
                {indicator.reason}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 font-sans text-[14px] leading-[22px] text-[#B7B9CB]">
          The backend returned no risk indicators for this transaction.
        </p>
      )}

      <p className="mt-5 font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
        Risk indicators are signals for review, not proof of fraud. Consider the
        available evidence before making a decision.
      </p>
    </div>
  );
}
