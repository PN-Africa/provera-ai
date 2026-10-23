const valuePropositions = [
  {
    category: "01 / DATA INPUT",
    title: "Start with cleaner data",
    description:
      "Upload a CSV, check required fields, and resolve validation errors before you analyze. Try the synthetic sample to explore first.",
  },
  {
    category: "02 / OVERVIEW",
    title: "See your transaction picture",
    description:
      "Track analyzed records, flagged transactions, risk distribution, and transaction activity from a focused dashboard.",
  },
  {
    category: "03 / REVIEW QUEUE",
    title: "Focus on what needs attention",
    description:
      "Browse all transactions or open the flagged list. Use risk levels and transaction context to prioritize your next review.",
  },
  {
    category: "04 / EXPLANATIONS",
    title: "Understand each risk signal",
    description:
      "Open a transaction to see the values and indicators behind its flag, including high amounts, unusual frequency, and historical deviations.",
  },
  {
    category: "05 / CONFIGURATION",
    title: "Keep detection transparent",
    description:
      "Administrators can review and adjust available detection settings so the team understands the thresholds used in analysis.",
  },
  {
    category: "06 / TEAM ACCESS",
    title: "Give your team the right access",
    description:
      "Create an account, request workspace access, and let an administrator assign permissions. Review platform activity in one place.",
  },
];

export function ValueProposition() {
  return (
    <section className="w-full bg-[#18181D] px-5 py-20 sm:px-8 lg:px-20 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <h2 className="font-manrope text-[32px] font-bold leading-[40px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.4px]">
            From transaction data to informed decisions.
          </h2>

          <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB]">
            Bring your data together, surface unusual activity, and review the
            evidence in one workspace.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valuePropositions.map((item) => (
            <article
              key={item.category}
              className="flex min-h-[228px] flex-col gap-3 rounded-xl border border-[#3A3A43] bg-[#202026] p-6"
            >
              {/* Category */}
              <p className="font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
                {item.category}
              </p>

              {/* Title */}
              <h3 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
