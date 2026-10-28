"use client";

import { useRouter } from "next/navigation";
import { RulesTable, type DetectionRule } from "./rules-table";

const initialRules: DetectionRule[] = [
  {
    id: "amount",
    name: "High transaction amount",
    condition: "Amount ≥ NGN 500,000",
    enabled: true,
  },
  {
    id: "frequency",
    name: "High transaction frequency",
    condition: "4+ transactions in 10 minutes",
    enabled: true,
  },
  {
    id: "deviation",
    name: "Unusual deviation",
    condition: "Robust deviation ≥ 6",
    enabled: true,
  },
];

export function DetectionRules() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Detection rules
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          Manage the indicators used to identify unusual transaction activity.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">Rules in use</h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          Configuration v1.4 · Changes apply to future analyses.
        </p>

        <div className="mt-4">
          <RulesTable
            rules={initialRules}
            onConfigure={() => router.push("/admin/detection-rules/configure")}
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          How rules affect risk
        </h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          An enabled rule adds one indicator when its condition is met.
        </p>

        <p className="mt-4 text-sm leading-6 text-[#EDEFFF]">
          Risk thresholds turn the indicator count into Low, Medium or High
          risk. Existing results retain the configuration used when they were
          analyzed.
        </p>

        <button
          type="button"
          onClick={() => router.push("/admin/risk-thresholds")}
          className="mt-4 min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930]"
        >
          Manage risk thresholds
        </button>
      </section>
    </div>
  );
}
