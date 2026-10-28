"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type RuleConfiguration = {
  highAmount: number;
  frequencyCount: number;
  lookBackWindow: number;
  robustDeviation: number;
  highAmountEnabled: boolean;
  frequencyEnabled: boolean;
  deviationEnabled: boolean;
};

const defaultConfiguration: RuleConfiguration = {
  highAmount: 500000,
  frequencyCount: 4,
  lookBackWindow: 10,
  robustDeviation: 6,
  highAmountEnabled: true,
  frequencyEnabled: true,
  deviationEnabled: true,
};

export function ConfigureDetectionRules() {
  const router = useRouter();
  const [config, setConfig] = useState(defaultConfiguration);
  const [error, setError] = useState("");

  function updateConfig<K extends keyof RuleConfiguration>(
    key: K,
    value: RuleConfiguration[K],
  ) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  function reviewChanges(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      config.highAmount <= 0 ||
      config.frequencyCount <= 0 ||
      config.lookBackWindow <= 0 ||
      config.robustDeviation <= 0
    ) {
      setError("All rule values must be positive.");
      return;
    }

    if (
      !config.highAmountEnabled &&
      !config.frequencyEnabled &&
      !config.deviationEnabled
    ) {
      setError("At least one detection rule must remain enabled.");
      return;
    }

    sessionStorage.setItem(
      "provera-detection-rule-draft",
      JSON.stringify(config),
    );

    router.push("/admin/detection-rules/review");
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]";

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Configure detection rules
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Set rule conditions for future transaction analyses.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-xl font-medium text-[#EDEFFF]">Rule conditions</h2>
        <p className="mt-4 text-sm text-[#A8ADB8]">
          Turn rules on or off and set the values used during analysis.
        </p>

        <form onSubmit={reviewChanges} className="mt-5 space-y-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="highAmount" className="text-sm text-[#EDEFFF]">
                High amount ·{" "}
                {config.highAmountEnabled ? "Enabled" : "Disabled"}
              </label>
              <input
                type="checkbox"
                aria-label="Enable high amount rule"
                checked={config.highAmountEnabled}
                onChange={(e) =>
                  updateConfig("highAmountEnabled", e.target.checked)
                }
                className="h-4 w-4 accent-[#34E89A]"
              />
            </div>
            <input
              id="highAmount"
              type="number"
              min="1"
              step="1"
              required
              disabled={!config.highAmountEnabled}
              value={config.highAmount}
              onChange={(e) =>
                updateConfig("highAmount", Number(e.target.value))
              }
              className={inputClass}
            />
            <p className="mt-2 text-sm text-[#A8ADB8]">
              Transactions at or above this amount trigger an indicator.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor="frequencyCount"
                  className="text-sm text-[#EDEFFF]"
                >
                  Frequency count ·{" "}
                  {config.frequencyEnabled ? "Enabled" : "Disabled"}
                </label>
                <input
                  type="checkbox"
                  aria-label="Enable frequency rule"
                  checked={config.frequencyEnabled}
                  onChange={(e) =>
                    updateConfig("frequencyEnabled", e.target.checked)
                  }
                  className="h-4 w-4 accent-[#34E89A]"
                />
              </div>
              <input
                id="frequencyCount"
                type="number"
                min="1"
                step="1"
                required
                disabled={!config.frequencyEnabled}
                value={config.frequencyCount}
                onChange={(e) =>
                  updateConfig("frequencyCount", Number(e.target.value))
                }
                className={inputClass}
              />
              <p className="mt-2 text-sm text-[#A8ADB8]">
                Same customer and currency.
              </p>
            </div>

            <div>
              <label
                htmlFor="lookBackWindow"
                className="text-sm text-[#EDEFFF]"
              >
                Look-back window
              </label>
              <input
                id="lookBackWindow"
                type="number"
                min="1"
                step="1"
                required
                disabled={!config.frequencyEnabled}
                value={config.lookBackWindow}
                onChange={(e) =>
                  updateConfig("lookBackWindow", Number(e.target.value))
                }
                className={inputClass}
              />
              <p className="mt-2 text-sm text-[#A8ADB8]">
                Window ending at the transaction, in minutes.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="robustDeviation"
                className="text-sm text-[#EDEFFF]"
              >
                Robust deviation ·{" "}
                {config.deviationEnabled ? "Enabled" : "Disabled"}
              </label>
              <input
                type="checkbox"
                aria-label="Enable robust deviation rule"
                checked={config.deviationEnabled}
                onChange={(e) =>
                  updateConfig("deviationEnabled", e.target.checked)
                }
                className="h-4 w-4 accent-[#34E89A]"
              />
            </div>
            <input
              id="robustDeviation"
              type="number"
              min="0.01"
              step="any"
              required
              disabled={!config.deviationEnabled}
              value={config.robustDeviation}
              onChange={(e) =>
                updateConfig("robustDeviation", Number(e.target.value))
              }
              className={inputClass}
            />
            <p className="mt-2 text-sm text-[#A8ADB8]">
              Requires at least five earlier records.
            </p>
          </div>

          <p className="text-sm leading-6 text-[#A8ADB8]">
            Amounts, counts and windows must be positive. At least one detection
            rule must remain enabled.
          </p>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5]"
          >
            Review changes
          </button>
        </form>
      </section>
    </div>
  );
}
