"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RuleConfiguration } from "./configure-detection-rules";

function getDraft(): RuleConfiguration | null {
  if (typeof window === "undefined") return null;

  const draft = sessionStorage.getItem("provera-detection-rule-draft");

  if (!draft) return null;

  try {
    return JSON.parse(draft) as RuleConfiguration;
  } catch {
    return null;
  }
}

export function ReviewDetectionRules() {
  const router = useRouter();

  const [config] = useState<RuleConfiguration | null>(getDraft);

  function applyChanges() {
    if (!config) return;

    // Prototype only: save the applied configuration in this browser.
    sessionStorage.setItem(
      "provera-detection-rule-config",
      JSON.stringify(config),
    );

    sessionStorage.removeItem("provera-detection-rule-draft");

    router.push("/admin/detection-rules");
  }

  if (!config) {
    return (
      <div className="mx-auto w-full max-w-[1440px]">
        <h1 className="text-3xl font-semibold text-[#EDEFFF]">
          No configuration to review
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Configure your detection rules before reviewing changes.
        </p>
        <button
          type="button"
          onClick={() => router.replace("/admin/detection-rules/configure")}
          className="mt-5 min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
        >
          Configure rules
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Review configuration changes
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Confirm the impact before applying an updated configuration.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-xl font-medium text-[#EDEFFF]">Before you save</h2>

        <p className="mt-4 text-sm text-[#A8ADB8]">
          Configuration changes affect future analyses only.
        </p>

        <p className="mt-4 text-sm leading-6 text-[#EDEFFF]">
          Existing transaction results will keep their original settings. New
          analyses will use the updated rules and risk thresholds. Your name,
          timestamp and changes will be recorded in platform activity.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={applyChanges}
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5]"
          >
            Apply changes
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/detection-rules/configure")}
            className="min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930]"
          >
            Back to rules
          </button>
        </div>
      </section>
    </div>
  );
}
