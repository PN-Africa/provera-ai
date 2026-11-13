"use client";

import { useEffect, useState } from "react";
import { getDetectionRules, type DetectionRule } from "@/lib/api/rules";

export function ClientDetectionRules() {
  const [rules, setRules] = useState<DetectionRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch detection rules
  useEffect(() => {
    let cancelled = false;

    getDetectionRules()
      .then((data) => {
        if (!cancelled) {
          setRules(data);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load detection rules.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Retry fetching rules
  const handleRetry = () => {
    setLoading(true);
    setError("");
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF]">
          Detection Rules
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          View the rules used by Provera AI to identify unusual transaction
          activities.
        </p>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="rounded-xl border border-[#393943] bg-[#202027] py-12 text-center">
          <p className="text-sm text-[#A8ADB8]">Loading detection rules...</p>
        </div>
      ) : error ? (
        /* Error State */
        <div className="rounded-xl border border-red-500/20 bg-[#202027] p-6">
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-4 rounded-lg border border-[#393943] px-4 py-2 text-sm text-white transition hover:bg-[#292930]"
          >
            Try Again
          </button>
        </div>
      ) : (
        /* Rules Table */
        <section className="overflow-hidden rounded-xl border border-[#393943] bg-[#202027]">
          <div className="border-b border-[#393943] p-5">
            <h2 className="font-medium text-[#EDEFFF]">
              Available Detection Rules
            </h2>

            <p className="mt-1 text-sm text-[#A8ADB8]">
              {rules.length} detection rules configured
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-[#292930] text-[#A8ADB8]">
                <tr>
                  <th className="px-5 py-4 font-medium">Rule</th>

                  <th className="px-5 py-4 font-medium">Type</th>

                  <th className="px-5 py-4 font-medium">Parameters</th>

                  <th className="px-5 py-4 font-medium">Weight</th>

                  <th className="px-5 py-4 font-medium">Version</th>

                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#393943]">
                {rules.map((rule) => (
                  <tr
                    key={rule.ruleKey}
                    className="transition hover:bg-[#292930]/50"
                  >
                    {/* Rule Name */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#EDEFFF]">{rule.name}</p>

                      <p className="mt-1 text-xs text-[#858B98]">
                        {rule.ruleKey}
                      </p>
                    </td>

                    {/* Rule Type */}
                    <td className="px-5 py-4 text-[#C2C6D0]">
                      {rule.type.replace(/_/g, " ")}
                    </td>

                    {/* Rule Parameters */}
                    <td className="px-5 py-4">
                      <div className="flex max-w-sm flex-wrap gap-2">
                        {Object.entries(rule.params ?? {}).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="rounded-md bg-[#303039] px-2 py-1 text-xs text-[#C2C6D0]"
                            >
                              {key}:{" "}
                              {typeof value === "object" && value !== null
                                ? JSON.stringify(value)
                                : String(value)}
                            </span>
                          ),
                        )}
                      </div>
                    </td>

                    {/* Weight */}
                    <td className="px-5 py-4 text-[#EDEFFF]">{rule.weight}</td>

                    {/* Version */}
                    <td className="px-5 py-4 text-[#C2C6D0]">
                      v{rule.version}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          rule.isActive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {rule.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {rules.length === 0 && (
            <p className="py-10 text-center text-sm text-[#A8ADB8]">
              No detection rules found.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
