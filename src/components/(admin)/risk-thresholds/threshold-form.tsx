"use client";

import { useState } from "react";
import { RiskPreview } from "./risk-preview";
import { ReviewChangesModal } from "./review-changes-modal";

type ThresholdFormProps = {
  enabledRules?: number;
};

export function ThresholdForm({ enabledRules = 3 }: ThresholdFormProps) {
  const [mediumThreshold, setMediumThreshold] = useState(1);
  const [highThreshold, setHighThreshold] = useState(2);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [message, setMessage] = useState("");

  const valid =
    Number.isInteger(mediumThreshold) &&
    Number.isInteger(highThreshold) &&
    mediumThreshold >= 1 &&
    highThreshold > mediumThreshold &&
    highThreshold <= enabledRules;

  function confirmChanges() {
    setReviewOpen(false);
    setMessage("Threshold changes applied to this page's current state.");
  }

  return (
    <>
      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Risk classification
        </h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          Based on the number of triggered indicators, not a probability score.
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="medium-threshold"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              Medium risk starts at
            </label>

            <input
              id="medium-threshold"
              type="number"
              min={1}
              max={enabledRules - 1}
              step={1}
              value={mediumThreshold}
              onChange={(event) => {
                setMediumThreshold(
                  event.target.value === "" ? 0 : Number(event.target.value),
                );
                setMessage("");
              }}
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]"
            />

            <p className="mt-2 text-sm text-[#A8ADB8]">
              Whole numbers only. Must be lower than the High threshold.
            </p>
          </div>

          <div>
            <label
              htmlFor="high-threshold"
              className="mb-2 block text-sm text-[#EDEFFF]"
            >
              High risk starts at
            </label>

            <input
              id="high-threshold"
              type="number"
              min={2}
              max={enabledRules}
              step={1}
              value={highThreshold}
              onChange={(event) => {
                setHighThreshold(
                  event.target.value === "" ? 0 : Number(event.target.value),
                );
                setMessage("");
              }}
              className="w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 py-3 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]"
            />

            <p className="mt-2 text-sm text-[#A8ADB8]">
              Must be higher than Medium and no greater than enabled rules.
            </p>
          </div>
        </div>

        {valid ? (
          <div className="mt-5">
            <RiskPreview
              mediumThreshold={mediumThreshold}
              highThreshold={highThreshold}
              enabledRules={enabledRules}
            />
          </div>
        ) : (
          <p role="alert" className="mt-4 text-sm text-[#FF8290]">
            Enter valid whole numbers: Medium must be at least 1, High must be
            greater than Medium, and High cannot exceed {enabledRules}.
          </p>
        )}

        <p className="mt-4 text-sm leading-6 text-[#A8ADB8]">
          Any triggered indicator flags the transaction for review. Saving
          updates future analyses only.
        </p>

        {message && (
          <p role="status" className="mt-4 text-sm text-[#90EFC5]">
            {message}
          </p>
        )}

        <button
          type="button"
          disabled={!valid}
          onClick={() => setReviewOpen(true)}
          className="mt-4 min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Review changes
        </button>
      </section>

      <ReviewChangesModal
        open={reviewOpen}
        mediumThreshold={mediumThreshold}
        highThreshold={highThreshold}
        onCancel={() => setReviewOpen(false)}
        onConfirm={confirmChanges}
      />
    </>
  );
}
