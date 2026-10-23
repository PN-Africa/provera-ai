const steps = [
  {
    number: "01",
    title: "Provide your data",
    description:
      "Upload a CSV with transaction IDs, amounts, currencies, dates, and transaction types. Fix validation errors before continuing.",
  },
  {
    number: "02",
    title: "Surface the signals",
    description:
      "Run the analysis and follow its processing status. Review the resulting risk levels and the records flagged for closer inspection.",
  },
  {
    number: "03",
    title: "Review with context",
    description:
      "Open a flagged transaction, inspect its details, and read the explanation behind each indicator before deciding your next action.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-[#232329] px-5 py-20 sm:px-8 lg:px-20 lg:py-[120px]">
      <div className="mx-auto items-center text-center flex w-full max-w-[1280px] flex-col gap-6">
        {/* Heading */}
        <h2 className="font-manrope text-[32px] font-bold leading-[40px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.4px]">
          Three steps to a clearer picture.
        </h2>

        {/* Steps */}
        <div className="flex w-full flex-col gap-6">
          {steps.map((step) => (
            <article key={step.number} className="flex w-full flex-col gap-2">
              {/* Number */}
              {/* <p className="font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
                {step.number}
              </p> */}

              {/* Title */}
              <h3 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
