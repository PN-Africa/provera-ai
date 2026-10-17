const faqs = [
  {
    category: "DATA",
    title: "What can I upload?",
    description:
      "Start with a CSV of up to 500 transactions and 1 MB. The upload screen shows the required columns and helps you identify invalid records.",
  },
  {
    category: "RISK SIGNALS",
    title: "Does a flag confirm fraud?",
    description:
      "No. Risk indicators highlight activity worth reviewing. Examine the transaction and its explanation; the final judgment stays with your team.",
  },
  {
    category: "ACCESS",
    title: "How does my team join?",
    description:
      "Create an account with your work email, then request access to your team workspace. An administrator reviews the request and assigns permissions.",
  },
];

export function FAQ() {
  return (
    <section className="w-full bg-[#18181D] px-5 py-20 sm:px-8 lg:px-20 lg:py-[96px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6">
        {/* Heading */}
        <h2 className="font-manrope text-[32px] font-bold leading-[40px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.4px]">
          Before you get started.
        </h2>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq) => (
            <article
              key={faq.category}
              className="flex min-h-[228px] flex-col gap-3 rounded-xl border border-[#343644] bg-[#1C1D27] p-6"
            >
              {/* Category */}
              <p className="font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
                {faq.category}
              </p>

              {/* Question */}
              <h3 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
                {faq.title}
              </h3>

              {/* Answer */}
              <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB]">
                {faq.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
