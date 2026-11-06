"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { RulesTable } from "./rules-table";
import { DetectionRule, getDetectionRules } from "@/lib/api/rules";

export function DetectionRules() {
  const router = useRouter();

  const [rules, setRules] = useState<DetectionRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRules = useCallback(async () => {
    try {
      setError("");
      const data = await getDetectionRules();
      setRules(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load detection rules.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadRules();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadRules]);

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
          Configuration v{" "}
          {rules.length ? Math.max(...rules.map((rule) => rule.version)) : "—"}{" "}
          · Changes apply to future analyses.
        </p>

        <div className="mt-4">
          {loading ? (
            <p className="py-8 text-sm text-[#A8ADB8]">Loading rules…</p>
          ) : error ? (
            <p role="alert" className="py-8 text-sm text-red-400">
              {error}
            </p>
          ) : (
            <RulesTable
              rules={rules}
              onConfigure={(rule) =>
                router.push(
                  `/workspace/detection-rules/configure?ruleKey=${encodeURIComponent(
                    rule.ruleKey,
                  )}`,
                )
              }
              onStatusChanged={loadRules}
            />
          )}
        </div>
      </section>

      {/* <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
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
      </section> */}
    </div>
  );
}
