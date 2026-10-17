export function AnalyzingState() {
  return (
    <div className="mt-6 rounded-xl border border-[#343644] bg-[#1C1D27] p-10">
      <h2 className="font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
        Analyzing your transactions...
      </h2>

      <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
        Checking configured patterns and preparing detection explanations. Keep
        this window open.
      </p>

      <div className="mt-5 rounded-lg border border-[#343644] bg-[#171A2E] p-4">
        <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          Progress is indeterminate until processing finishes. No unsupported
          completion estimate is shown.
        </p>
      </div>

      <button
        type="button"
        disabled
        className="mt-4 flex h-[46px] w-[220px] cursor-not-allowed items-center justify-center rounded-lg bg-[#455EFF] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] opacity-90"
      >
        Processing...
      </button>
    </div>
  );
}
