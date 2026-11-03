"use client";

import { useState } from "react";
import {
  DetectionRule,
  activateDetectionRule,
  deactivateDetectionRule,
} from "@/lib/api/rules";

type RulesTableProps = {
  rules: DetectionRule[];
  onConfigure: (rule: DetectionRule) => void;
  onStatusChanged: () => Promise<void> | void;
};

export function RulesTable({
  rules,
  onConfigure,
  onStatusChanged,
}: RulesTableProps) {
  const [updatingRuleKey, setUpdatingRuleKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleToggleRule(rule: DetectionRule) {
    setUpdatingRuleKey(rule.ruleKey);
    setError("");

    try {
      if (rule.isActive) {
        await deactivateDetectionRule(rule.ruleKey);
      } else {
        await activateDetectionRule(rule.ruleKey);
      }

      await onStatusChanged();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update rule status.",
      );
    } finally {
      setUpdatingRuleKey(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      <table className="w-full min-w-[650px] border-separate border-spacing-0 text-left">
        <thead>
          <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
            {["Rule", "Parameters", "Status", "Action"].map((heading) => (
              <th
                key={heading}
                className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rules.map((rule) => (
            <tr key={rule.ruleKey} className="text-sm text-[#EDEFFF]">
              <td className="px-3 py-4">
                <p>{rule.name}</p>
                <p className="mt-1 text-xs text-[#A8ADB8]">
                  v{rule.version} · Weight {rule.weight}
                </p>
              </td>

              <td className="px-3 py-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(rule.params).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-2 rounded-md border border-[#393943] bg-[#292930] px-2.5 py-1.5 text-xs"
                    >
                      <span className="text-[#A8ADB8]">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                      </span>
                      <span className="font-medium text-[#EDEFFF]">
                        {String(value)}
                      </span>
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-3 py-4">
                {/* <span
                  className={
                    rule.isActive ? "text-[#34E89A]" : "text-[#A8ADB8]"
                  }
                >
                  {rule.isActive ? "Enabled" : "Disabled"}
                </span> */}
                <span
                  className={
                    rule.isActive ? "text-[#34E89A]" : "text-[#A8ADB8]"
                  }
                >
                  {rule.isActive ? "Enabled" : "Disabled"}
                </span>
              </td>

              <td className="px-3 py-4">
                {/* <button
                  type="button"
                  disabled={updatingRuleKey === rule.ruleKey}
                  onClick={() => handleToggleRule(rule)}
                  className={
                    rule.isActive ? "text-[#A8ADB8]" : "text-[#34E89A]"
                  }
                >
                  {updatingRuleKey === rule.ruleKey
                    ? "Updating..."
                    : rule.isActive
                      ? "Disable"
                      : "Enable"}
                </button> */}
                <button
                  type="button"
                  disabled={updatingRuleKey === rule.ruleKey}
                  onClick={() => handleToggleRule(rule)}
                  className={
                    rule.isActive
                      ? "text-[#A8ADB8] hover:text-[#D0D2DA]"
                      : "text-[#34E89A] hover:text-[#90EFC5]"
                  }
                >
                  {updatingRuleKey === rule.ruleKey
                    ? "Updating..."
                    : rule.isActive
                      ? "Disable"
                      : "Enable"}
                </button>
                <button
                  type="button"
                  onClick={() => onConfigure(rule)}
                  className="ml-4 font-medium text-[#34E89A] hover:text-[#90EFC5]"
                >
                  Configure
                </button>
              </td>
            </tr>
          ))}

          {rules.length === 0 && (
            <tr>
              <td colSpan={4} className="px-3 py-10 text-center text-[#A8ADB8]">
                No detection rules found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
