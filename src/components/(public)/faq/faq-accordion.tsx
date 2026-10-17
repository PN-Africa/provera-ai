import type { FAQItem } from "./faq-data";

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[5px] border border-[#373849] bg-[#1C1D27] px-4 py-4 sm:px-[17px] sm:py-[17px]"
        >
          <summary className="flex cursor-pointer font-manrope list-none items-center justify-between gap-4 text-[20px] sm:text-[14px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF] [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>

            <span
              aria-hidden="true"
              className="shrink-0 text-[15px] text-[#B7B9CB]"
            >
              <span className="hidden group-open:inline">−</span>
              <span className="inline group-open:hidden">+</span>
            </span>
          </summary>

          <p className="font-sans mt-3 pr-2 text-[16px] sm:text-[13px] leading-[24px] tracking-[0px] text-[#B7B9CB]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
