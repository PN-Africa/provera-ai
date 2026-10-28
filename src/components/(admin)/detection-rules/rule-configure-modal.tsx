"use client";

import { useState } from "react";
import type { DetectionRule } from "./rules-table";

type Props = {
  rule: DetectionRule | null;
  onClose: () => void;
  onSave: (rule: DetectionRule) => void;
};

export function RuleConfigureModal({ rule, onClose, onSave }: Props) {
  if (!rule) return null;

  return (
    <RuleConfigureForm
      key={rule.id}
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
  const [condition, setCondition] = useState(rule.condition);
  const [enabled, setEnabled] = useState(rule.enabled);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      ...rule,
      name: name.trim(),
      condition: condition.trim(),
      enabled,
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

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Changes apply to this page only until backend integration is added.
        </p>

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
              htmlFor="rule-condition"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              Condition
            </label>
            <input
              id="rule-condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              required
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-white outline-none focus:border-[#34E89A]"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-[#EDEFFF]">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              className="h-4 w-4 accent-[#34E89A]"
            />
            Enable this rule
          </label>

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
