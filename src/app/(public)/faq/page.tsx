import Link from "next/link";
import { FAQAccordion } from "@/components/(public)/faq/faq-accordion";
import { FAQCategoryNav } from "@/components/(public)/faq/faq-category-nav";
import { faqCategories } from "@/components/(public)/faq/faq-data";
import { PublicHeader } from "@/components/(public)/layout/public-header";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black font-[family-name:var(--font-dm-sans)] text-[#EDEFFF]">
      {/* Public navigation */}
      <PublicHeader />

      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 sm:py-12 lg:px-[56px] lg:py-[46px]">
        {/* Page heading */}
        <header>
          <p className="text-[12px] font-medium  tracking-[0px] uppercase leading-[18px] text-[#B7B9CB] font-sans">
            Help &amp; guidance
          </p>

          <h1 className="mt-3 font-manrope  text-[40px] font-bold leading-[48px] tracking-[-0.4px] sm:text-[32px] text-[#EDEFFF]">
            Frequently asked questions
          </h1>

          <p className="mt-3 text-[18px] sm:text-[13px] font-normal leading-[28px] tracking-[0px] font-sans text-[#B7B9CB]">
            A little clarity before you get started. Find answers about your
            data, risk signals, and team access.
          </p>
        </header>

        {/* Category navigation */}
        <div className="mt-8">
          <FAQCategoryNav categories={faqCategories} />
        </div>

        {/* FAQ sections */}
        <div className="mt-9 space-y-9">
          {faqCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-8">
              <h2 className="mb-2 font-manrope text-[20px] sm:text[15px] font-semibold leading-[28px] tracking-[0px]">
                {category.title}
              </h2>

              <FAQAccordion items={category.items} />
            </section>
          ))}
        </div>

        {/* Request access callout */}
        <section className="mt-8 flex flex-col gap-5 rounded-[8px] border border-[#202236] bg-[#171A2E] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-manrope text-[20px] sm:text-[14px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
              Need help joining your team?
            </h2>

            <p className="mt-1 text-[14px] sm:text-[11px] leading-[18px] font-normal text-[#B7B9CB]">
              Your administrator can help with workspace access.
            </p>
          </div>

          <Link
            href="/request-access"
            className="inline-flex min-h-[36px] items-center justify-center rounded-[5px] border border-[#343644] bg-[#1C1D27] px-6 text-[14px] sm:text-[11px] font-medium text-[#EDEFFF] transition-colors hover:border-[#5968FF] hover:bg-[#242635] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
          >
            Request access
          </Link>
        </section>

        {/* Back to home */}
        <footer className="mt-8">
          <Link
            href="/"
            className="text-[14px] sm:text-[10px] font-medium text-[#EDEFFF]  leading-[20px] tracking-[0px] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
          >
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
