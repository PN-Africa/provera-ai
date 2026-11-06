"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getDetectionRule, type DetectionRule } from "@/lib/api/rules";

// type ParamValue = string | number;

export function ConfigureDetectionRules() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ruleKey = searchParams.get("ruleKey");

  const [rule, setRule] = useState<DetectionRule | null>(null);
  // const [params, setParams] = useState<Record<string, ParamValue>>({});

  const [params, setParams] = useState<Record<string, string>>({});
  const [weight, setWeight] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRule() {
      if (!ruleKey) {
        setError(
          "No rule selected. Return to Detection rules and choose Configure.",
        );
        setLoading(false);
        return;
      }

      try {
        const data = await getDetectionRule(ruleKey);

        if (cancelled) return;

        setRule(data);
        // setParams(data.params as Record<string, ParamValue>);
        setParams(
          Object.fromEntries(
            Object.entries(data.params).map(([key, value]) => [
              key,
              String(value),
            ]),
          ),
        );
        setWeight(String(data.weight));
        setIsActive(data.isActive);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load this rule.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadRule();

    return () => {
      cancelled = true;
    };
  }, [ruleKey]);

  function updateParam(key: string, value: string) {
    setParams((current) => ({ ...current, [key]: value }));
  }

  async function saveChanges(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rule || !ruleKey) return;

    const parsedWeight = Number(weight);

    if (!Number.isFinite(parsedWeight) || parsedWeight < 0) {
      setError("Weight must be a valid number greater than or equal to zero.");
      return;
    }

    const parsedParams: Record<string, unknown> = {};

    for (const key of rule.allowedParams) {
      const rawValue = params[key];

      if (rawValue === undefined || rawValue.trim() === "") {
        setError(`${key} is required.`);
        return;
      }

      const originalValue = rule.params[key];

      if (typeof originalValue === "number") {
        const numericValue = Number(rawValue);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
          setError(`${key} must be a non-negative number.`);
          return;
        }

        parsedParams[key] = numericValue;
      } else {
        parsedParams[key] = rawValue;
      }
    }
    setSaving(true);
    setError("");

    try {
      sessionStorage.setItem(
        "provera-detection-rule-draft",
        JSON.stringify({
          ruleKey,
          version: rule.version,
          name: rule.name,
          params: parsedParams,
          weight: parsedWeight,
          originalIsActive: rule.isActive,
          isActive,
        }),
      );

      router.push("/workspace/detection-rules/review");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to prepare rule changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A] disabled:opacity-50";

  if (loading) {
    return <p className="py-8 text-sm text-[#A8ADB8]">Loading rule…</p>;
  }

  if (!rule) {
    return (
      <div className="space-y-4">
        <p role="alert" className="text-sm text-red-400">
          {error || "Rule not found."}
        </p>
        <button
          type="button"
          onClick={() => router.push("/workspace/detection-rules")}
          className="text-sm text-[#34E89A] hover:text-[#90EFC5]"
        >
          Back to detection rules
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Configure detection rule
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">{rule.name}</p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <form onSubmit={saveChanges} className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-[#EDEFFF]">
                Rule status
              </h2>
              <p className="mt-1 text-sm text-[#A8ADB8]">
                Enable or disable this rule for future analyses.
              </p>
            </div>

            <label className="flex items-center gap-3 text-sm text-[#EDEFFF]">
              <span>{isActive ? "Enabled" : "Disabled"}</span>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4 accent-[#34E89A]"
              />
            </label>
          </div>

          <div>
            <label htmlFor="weight" className="text-sm text-[#EDEFFF]">
              Weight
            </label>
            <input
              id="weight"
              type="number"
              min="0"
              step="1"
              required
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-[#EDEFFF]">
              Rule parameters
            </h2>
            <p className="mt-1 text-sm text-[#A8ADB8]">
              Update the values used by this rule.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {rule.allowedParams.map((key) => {
              // const currentValue = params[key];
              // const isNumber = typeof currentValue === "number";

              return (
                <div key={key}>
                  <label
                    htmlFor={`param-${key}`}
                    className="text-sm text-[#EDEFFF]"
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (letter) => letter.toUpperCase())}
                  </label>

                  <input
                    id={`param-${key}`}
                    type={
                      typeof rule.params[key] === "number" ? "number" : "text"
                    }
                    step={
                      typeof rule.params[key] === "number" ? "any" : undefined
                    }
                    required
                    value={params[key] ?? ""}
                    onChange={(event) => updateParam(key, event.target.value)}
                    className={inputClass}
                  />
                </div>
              );
            })}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push("/workspace/detection-rules")}
              disabled={saving}
              className="min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
