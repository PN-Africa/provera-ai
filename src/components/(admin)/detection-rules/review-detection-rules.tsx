"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  activateDetectionRule,
  deactivateDetectionRule,
  updateDetectionRule,
} from "@/lib/api/rules";

type DetectionRuleDraft = {
  ruleKey: string;
  version: number;
  name: string;
  params: Record<string, unknown>;
  weight: number;
  originalIsActive: boolean;
  isActive: boolean;
};

function getDraft(): DetectionRuleDraft | null {
  if (typeof window === "undefined") return null;

  const draft = sessionStorage.getItem("provera-detection-rule-draft");
  if (!draft) return null;

  try {
    return JSON.parse(draft) as DetectionRuleDraft;
  } catch {
    return null;
  }
}

export function ReviewDetectionRules() {
  const router = useRouter();
  const [config] = useState<DetectionRuleDraft | null>(getDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function applyChanges() {
    if (!config || saving) return;

    setSaving(true);
    setError("");

    try {
      await updateDetectionRule(config.ruleKey, {
        version: config.version,
        name: config.name,
        params: config.params,
        weight: config.weight,
      });

      if (config.isActive !== config.originalIsActive) {
        if (config.isActive) {
          await activateDetectionRule(config.ruleKey);
        } else {
          await deactivateDetectionRule(config.ruleKey);
        }
      }

      sessionStorage.removeItem("provera-detection-rule-draft");
      router.push("/workspace/detection-rules");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to apply rule changes.",
      );
    } finally {
      setSaving(false);
    }
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
          onClick={() => router.replace("/workspace/detection-rules/configure")}
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

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={applyChanges}
            disabled={saving}
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5] disabled:opacity-50"
          >
            {saving ? "Applying…" : "Apply changes"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => router.back()}
            className="min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930] disabled:opacity-50"
          >
            Back to rules
          </button>
        </div>
      </section>
    </div>
  );
}
