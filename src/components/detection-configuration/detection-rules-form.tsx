"use client";

import { FormEvent, useState } from "react";

export function DetectionRulesForm() {
  const [highAmountThreshold, setHighAmountThreshold] = useState("500000");
  const [frequencyThreshold, setFrequencyThreshold] = useState("4");
  const [frequencyWindow, setFrequencyWindow] = useState("10");
  const [robustDeviationThreshold, setRobustDeviationThreshold] = useState("6");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Detection configuration saved:", {
      highAmountThreshold,
      frequencyThreshold,
      frequencyWindow,
      robustDeviationThreshold,
    });
  }

  return (
    <section className="mt-6 w-full max-w-[780px] rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
      <h2 className="font-manrope text-[28px] font-medium leading-[36px] tracking-[-0.3px] text-[#EDEFFF]">
        Detection rules
      </h2>

      <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
        Changes apply to new datasets. Existing results retain their original
        configuration.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        {/* High amount threshold */}
        <div>
          <label
            htmlFor="high-amount-threshold"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            High amount threshold · NGN
          </label>

          <input
            id="high-amount-threshold"
            type="number"
            value={highAmountThreshold}
            onChange={(event) => setHighAmountThreshold(event.target.value)}
            className="mt-2 h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          />

          <p className="mt-3 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            Transactions at or above this amount trigger an indicator.
          </p>
        </div>

        {/* Frequency threshold */}
        <div className="mt-5">
          <label
            htmlFor="frequency-threshold"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            Frequency threshold · transactions
          </label>

          <input
            id="frequency-threshold"
            type="number"
            value={frequencyThreshold}
            onChange={(event) => setFrequencyThreshold(event.target.value)}
            className="mt-2 h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          />

          <p className="mt-3 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            Same-customer, same-currency transactions in the window.
          </p>
        </div>

        {/* Frequency window */}
        <div className="mt-5">
          <label
            htmlFor="frequency-window"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            Frequency window · minutes
          </label>

          <input
            id="frequency-window"
            type="number"
            value={frequencyWindow}
            onChange={(event) => setFrequencyWindow(event.target.value)}
            className="mt-2 h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          />

          <p className="mt-3 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            Look-back window ending at each transaction.
          </p>
        </div>

        {/* Robust deviation threshold */}
        <div className="mt-5">
          <label
            htmlFor="robust-deviation-threshold"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            Robust deviation threshold
          </label>

          <input
            id="robust-deviation-threshold"
            type="number"
            value={robustDeviationThreshold}
            onChange={(event) =>
              setRobustDeviationThreshold(event.target.value)
            }
            className="mt-2 h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          />

          <p className="mt-3 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            Requires at least five earlier records.
          </p>
        </div>

        {/* Explanation */}
        <div className="mt-5 rounded-[6px] border border-[#343644] bg-[#171A2E] px-4 py-4">
          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            No indicators = Low. One = Medium. Two or more = High. Any triggered
            indicator flags the transaction for review.
          </p>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="mt-4 flex h-[46px] w-[240px] items-center justify-center rounded-[6px] bg-[#455EFF] font-sans text-[14px] font-medium leading-[20px] text-white transition hover:bg-[#536BFF]"
        >
          Save configuration
        </button>
      </form>
    </section>
  );
}
