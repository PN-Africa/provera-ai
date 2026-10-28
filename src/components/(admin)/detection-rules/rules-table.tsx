"use client";

export type DetectionRule = {
  id: string;
  name: string;
  condition: string;
  enabled: boolean;
};

type RulesTableProps = {
  rules: DetectionRule[];
  onConfigure: (rule: DetectionRule) => void;
};

export function RulesTable({ rules, onConfigure }: RulesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] border-separate border-spacing-0 text-left">
        <thead>
          <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
            {["Rule", "Condition", "Status", "Action"].map((heading) => (
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
            <tr key={rule.id} className="text-sm text-[#EDEFFF]">
              <td className="px-3 py-4">{rule.name}</td>
              <td className="px-3 py-4">{rule.condition}</td>
              <td className="px-3 py-4">
                <span
                  className={rule.enabled ? "text-[#EDEFFF]" : "text-[#A8ADB8]"}
                >
                  {rule.enabled ? "Enabled" : "Disabled"}
                </span>
              </td>
              <td className="px-3 py-4">
                <button
                  type="button"
                  onClick={() => onConfigure(rule)}
                  className="font-medium text-[#34E89A] hover:text-[#90EFC5]"
                >
                  Configure
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
