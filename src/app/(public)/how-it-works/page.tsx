import Link from "next/link";
import { PublicHeader } from "@/components/(public)/layout/public-header";

const steps = [
  {
    number: "01",
    title: "Upload your transactions",
    description:
      "Use the CSV template to organize your transaction IDs, amounts, currencies, dates, and types. Upload your file from Transaction data.",
    category: "PREPARE",
    cardTitle: "Your transaction CSV",
    cardDescription:
      "Keep the required columns in place. Optional customer details add context to the review.",
  },
  {
    number: "02",
    title: "Check and correct your data",
    description:
      "Review the validation results. If a record has missing or invalid information, correct it in your file and upload again before continuing.",
    category: "VALIDATE",
    cardTitle: "Resolve errors first",
    cardDescription:
      "Clear feedback helps you identify what needs correcting before analysis can begin.",
  },
  {
    number: "03",
    title: "Run the analysis",
    description:
      "Select Analyze transactions and follow the processing status. When analysis completes, open the overview to see the results.",
    category: "ANALYZE",
    cardTitle: "See the risk summary",
    cardDescription:
      "Review transaction totals, risk levels, and the records flagged for closer inspection.",
  },
  {
    number: "04",
    title: "Review the flagged transactions",
    description:
      "Open a flagged record to inspect its details and the explanation behind each indicator. Use this evidence to decide your next action.",
    category: "REVIEW",
    cardTitle: "Understand the reason",
    cardDescription:
      "A flag highlights unusual activity. It does not confirm fraud; the final judgment stays with your team.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-black font-[family-name:var(--font-dm-sans)] text-[#EDEFFF]">
      {/* Public navigation */}
      <PublicHeader />

      {/* Hero section */}
      <section className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pb-20 sm:pt-12 lg:px-[56px] lg:pb-[76px] lg:pt-[46px]">
        <p className="font-sans text-[12px] font-medium uppercase leading-[18px] tracking-[0px] text-[#B7B9CB]">
          How Provera AI works
        </p>

        <h1 className="mt-7 max-w-[760px] font-manrope text-[30px] font-bold leading-[56px] tracking-[-0.5px] text-[#EDEFFF] sm:text-[42px] md:text-[48px]">
          From transaction data
          <br />
          to a clearer review.
        </h1>

        <p className="mt-6 max-w-[480px] font-sans text-[15px] font-normal leading-[28px] tracking-[0px] text-[#B7B9CB] sm:text-[18px]">
          Upload your records, run the analysis, and understand which
          transactions need a closer look.
        </p>

        <Link
          href="/signup"
          className="mt-6 inline-flex min-h-[48px] w-full max-w-[224px] items-center justify-center rounded-[6px] bg-[#34E89A] px-6 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition-colors hover:bg-[#90EFC5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#90EFC5] focus-visible:ring-offset-2 focus-visible:ring-offset-black "
        >
          Create your account
        </Link>
      </section>

      {/* Before you begin */}
      <section className="bg-[#232329]">
        <div className="mx-auto w-full  px-5 py-7 sm:px-8 md:px-[50px] sm:py-8 lg:px-[160px]">
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
            Before you begin
          </h2>

          <p className="mt-2 font-sans text-[14px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[16px] sm:leading-[28px]">
            Create an account and get access to your team workspace. Prepare a
            transaction CSV, or use the synthetic sample available in the upload
            screen.
          </p>
        </div>
      </section>

      {/* Four-step workflow */}
      <section className="mx-auto w-full md:px-[50px] lg:px-[160px] px-5 py-12 sm:px-8 sm:py-16  lg:py-[76px]">
        <div className="space-y-6 sm:space-y-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)] md:gap-8"
            >
              {/* Step description */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-[10px] bg-[#203B30] font-manrope text-[24px] font-semibold leading-[32px] tracking-[-0.3px] text-[#EDEFFF] sm:size-16 sm:text-[28px]">
                  {step.number}
                </div>

                <div className="min-w-0 pt-0 sm:pt-1">
                  <h2 className="font-manrope text-[21px] font-semibold leading-[29px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[28px] sm:leading-[36px]">
                    {step.title}
                  </h2>

                  <p className="mt-2 font-sans text-[14px] font-normal leading-[23px] tracking-[0px] text-[#B7B9CB] sm:text-[15px] sm:leading-[24px]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Supporting information card */}
              <div className="min-h-[180px] rounded-[10px] border border-[#343644] bg-[#202026] p-5 sm:min-h-[176px] sm:p-6">
                <p className="font-sans text-[11px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
                  {step.category}
                </p>

                <h3 className="mt-3 font-manrope text-[18px] font-medium leading-[28px] tracking-[0px] text-[#EDEFFF] sm:text-[20px]">
                  {step.cardTitle}
                </h3>

                <p className="mt-2 font-sans text-[14px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[15px]">
                  {step.cardDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final call to action */}
      <section className="bg-[#232329]">
        <div className="mx-auto flex md:px-[50px] w-full max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-[160px] lg:py-[42px]">
          <div>
            <h2 className="font-manrope text-[24px] font-semibold leading-[32px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[28px] sm:leading-[36px]">
              Ready for your first review?
            </h2>

            <p className="mt-3 font-sans text-[14px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[16px] sm:leading-[28px]">
              Create your account and request access to your team workspace.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center rounded-[6px] bg-[#34E89A] px-7 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition-colors hover:bg-[#90EFC5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#90EFC5] lg:w-[224px]"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Public footer */}
      <footer className="bg-[##141418]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-[56px]">
          <Link
            href="/"
            className="font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
          >
            Provera AI
          </Link>

          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
            Questions?{" "}
            <Link
              href="/faq"
              className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
            >
              Read the FAQs
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
