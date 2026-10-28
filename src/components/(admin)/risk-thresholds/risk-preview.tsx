type RiskPreviewProps = {
  mediumThreshold: number;
  highThreshold: number;
  enabledRules: number;
};

export function RiskPreview({
  mediumThreshold,
  highThreshold,
  enabledRules,
}: RiskPreviewProps) {
  const lowEnd = mediumThreshold - 1;
  const mediumEnd = highThreshold - 1;

  function formatRange(start: number, end: number) {
    if (start === end) return `${start} indicator${start === 1 ? "" : "s"}`;
    return `${start}–${end} indicators`;
  }

  const levels = [
    {
      name: "Low",
      range: formatRange(0, lowEnd),
      color: "text-[#90EFC5]",
    },
    {
      name: "Medium",
      range: formatRange(mediumThreshold, mediumEnd),
      color: "text-[#FFD166]",
    },
    {
      name: "High",
      range: formatRange(highThreshold, enabledRules),
      color: "text-[#FF8290]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {levels.map((level) => (
        <div
          key={level.name}
          className="rounded-xl border border-[#393943] bg-[#292930] p-5"
        >
          <p className={`text-sm font-medium ${level.color}`}>{level.name}</p>
          <p className="mt-3 text-xl font-medium text-[#EDEFFF]">
            {level.range}
          </p>
        </div>
      ))}
    </div>
  );
}
