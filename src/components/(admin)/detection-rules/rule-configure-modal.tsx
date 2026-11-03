"use client";

import { useState } from "react";
import type { DetectionRule } from "@/lib/api/rules";

type Props = {
  rule: DetectionRule | null;
  onClose: () => void;
  onSave: (rule: DetectionRule) => void;
};

export function RuleConfigureModal({ rule, onClose, onSave }: Props) {
  if (!rule) return null;

  return (
    <RuleConfigureForm
      key={rule.ruleKey}
      rule={rule}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function RuleConfigureForm({
  rule,
  onClose,
  onSave,
}: {
  rule: DetectionRule;
  onClose: () => void;
  onSave: (rule: DetectionRule) => void;
}) {
  const [name, setName] = useState(rule.name);
  const [weight, setWeight] = useState(String(rule.weight));
  const [params, setParams] = useState(JSON.stringify(rule.params, null, 2));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let parsedParams: Record<string, unknown>;

    try {
      const parsed: unknown = JSON.parse(params);

      if (
        parsed === null ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        throw new Error("Params must be a JSON object.");
      }

      parsedParams = parsed as Record<string, unknown>;
    } catch {
      alert("Enter valid JSON for params, using a JSON object.");
      return;
    }

    const parsedWeight = Number(weight);

    if (!Number.isFinite(parsedWeight)) {
      alert("Weight must be a valid number.");
      return;
    }

    onSave({
      ...rule,
      name: name.trim(),
      weight: parsedWeight,
      params: parsedParams,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="configure-rule-title"
        className="w-full max-w-lg rounded-xl border border-[#393943] bg-[#202027] p-6"
      >
        <h2
          id="configure-rule-title"
          className="text-xl font-semibold text-[#EDEFFF]"
        >
          Configure detection rule
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="rule-name"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              Rule name
            </label>
            <input
              id="rule-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-white outline-none focus:border-[#34E89A]"
            />
          </div>

          <div>
            <label
              htmlFor="rule-weight"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              Weight
            </label>
            <input
              id="rule-weight"
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              required
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-white outline-none focus:border-[#34E89A]"
            />
          </div>

          <div>
            <label
              htmlFor="rule-params"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              Params (JSON)
            </label>
            <textarea
              id="rule-params"
              value={params}
              onChange={(event) => setParams(event.target.value)}
              required
              rows={7}
              spellCheck={false}
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#34E89A]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#393943] px-4 py-3 text-sm text-white hover:bg-[#292930]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#34E89A] px-5 py-3 text-sm font-medium text-black hover:bg-[#90EFC5]"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
