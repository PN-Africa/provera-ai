import Link from "next/link";
import {
  Activity,
  FileText,
  Search,
  Settings2,
  Upload,
  Users,
} from "lucide-react";

import { PublicHeader } from "@/components/(public)/layout/public-header";

const features = [
  {
    category: "CSV UPLOAD",
    title: "Upload and validate",
    description:
      "Bring in your CSV and fix missing or invalid values before analysis. Start your review with cleaner data.",
    icon: Upload,
  },
  {
    category: "RISK INDICATORS",
    title: "Spot unusual activity",
    description:
      "See risk indicators and flagged transactions together, so you can decide which records need attention first.",
    icon: Activity,
  },
  {
    category: "OVERVIEW & FILTERS",
    title: "Find the right transactions",
    description:
      "Use dataset and date filters to narrow your review. Move from an overview to the records that matter.",
    icon: Search,
  },
  {
    category: "DETECTION EXPLANATIONS",
    title: "Understand the reason",
    description:
      "Open a transaction to see its details and triggered indicators. Review the evidence behind the risk label.",
    icon: FileText,
  },
  {
    category: "WORKSPACE ACCESS",
    title: "Control workspace access",
    description:
      "Administrators approve access requests and assign permissions, so each team member has the right access.",
    icon: Users,
  },
  {
    category: "SETTINGS & ACTIVITY",
    title: "Manage detection settings",
    description:
      "Administrators adjust available thresholds and review workspace activity to keep the team informed.",
    icon: Settings2,
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black font-[family-name:var(--font-dm-sans)] text-[#EDEFFF]">
      {/* Public navigation */}
      <PublicHeader />

      {/* Hero section */}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[56px]">
        <section className="flex flex-col items-center pb-16 pt-10 text-center sm:pb-20 sm:pt-12 lg:pb-[76px] lg:pt-[46px]">
          <p className="font-sans text-[12px] font-medium uppercase leading-[18px] tracking-[0px] text-[#B7B9CB]">
            Provera AI Features
          </p>

          <h1 className="mt-7 max-w-[760px] font-manrope text-[30px] font-bold leading-[56px] tracking-[-0.5px] text-[#EDEFFF] sm:text-[42px] md:text-[48px]">
            A clearer way to
            <br className="hidden sm:block" /> review transactions.
          </h1>

          <p className="mt-6 max-w-[480px] font-sans text-[16px] font-normal leading-[28px] tracking-[0px] text-[#B7B9CB] sm:text-[18px]">
            Bring your data together, find unusual activity, and understand the
            signals behind every flag.
          </p>

          <Link
            href="/signup"
            className="mt-6 inline-flex min-h-[48px] w-full max-w-[224px] items-center justify-center rounded-[6px] bg-[#34E89A] px-6 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition-colors hover:bg-[#90EFC5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Get started
          </Link>
        </section>

        {/* Feature cards */}
        <section className="pb-8 sm:pb-10">
          <h2 className="mb-7 text-center font-manrope text-[24px] font-semibold leading-[32px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[28px] sm:leading-[36px]">
            Everything you need for a focused review.
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:px-[90px]  px-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.category}
                  className="flex min-h-[192px] items-center gap-5 rounded-[10px] border border-[#202236] bg-[#202026] p-5 sm:gap-6 sm:p-8 "
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-[#203B30] text-[#E1E5FF]">
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-sans text-[11px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
                      {feature.category}
                    </p>

                    <h3 className="mt-3 font-manrope text-[18px] font-semibold leading-[26px] tracking-[0px] text-[#EDEFFF] sm:text-[20px] sm:leading-[28px]">
                      {feature.title}
                    </h3>

                    <p className="mt-2 font-sans text-[14px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[16px] sm:leading-[24px]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom call to action */}
      <section className="mt-8 bg-[#232329]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 md:px-[50px] lg:flex-row lg:items-center lg:justify-between lg:px-[160px] lg:py-[42px]">
          <div>
            <h2 className="font-manrope text-[24px] font-semibold leading-[32px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[28px] sm:leading-[36px]">
              Start your next review with clarity.
            </h2>

            <p className="mt-3 font-sans text-[14px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[16px] sm:leading-[28px]">
              Create an account and request access to your team workspace.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center rounded-[6px] bg-[#34E89A] px-7 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition-colors hover:bg-[#90EFC5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF] lg:w-[224px]"
          >
            Create your account
          </Link>
        </div>
      </section>

      <footer className="bg-[#141418]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-[56px]">
          <Link
            href="/"
            className="font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
          >
            Provera AI
          </Link>

          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
            <Link
              href="/"
              className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5968FF]"
            >
              Back to home
            </Link>
          </p>
        </div>
      </footer>

      {/* Back to home */}
    </main>
  );
}
