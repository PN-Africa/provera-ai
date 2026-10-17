const stats = [
  {
    label: "Transactions analyzed",
    value: "69",
    note: "Selected dataset",
  },
  {
    label: "Flagged for review",
    value: "4",
    note: "Human review required",
  },
  {
    label: "High risk",
    value: "2",
    note: "Highest priority",
  },
  {
    label: "Low / medium risk",
    value: "67",
    note: "No high-risk indication",
  },
];

export function OverviewStats() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-[#343644] bg-[#1C1D27] px-5 py-5"
        >
          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            {stat.label}
          </p>

          <p className="mt-3 font-manrope text-[32px] font-semibold leading-[40px] tracking-[-0.3px] text-[#EDEFFF]">
            {stat.value}
          </p>

          <p className="mt-2 font-sans text-[12px] font-normal leading-[18px] text-[#7F8297]">
            {stat.note}
          </p>
        </div>
      ))}
    </section>
  );
}
