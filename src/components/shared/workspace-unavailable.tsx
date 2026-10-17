"use client";

export function WorkspaceUnavailable() {
  function handleRetry() {
    window.location.reload();
  }

  return (
    <section className="rounded-[10px] border border-[#343644] bg-[#1C1D27] px-6 py-7">
      <h2 className="font-manrope text-[28px] font-medium leading-[36px] tracking-[-0.3px] text-[#EDEFFF]">
        We could not load this workspace
      </h2>

      <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
        Try again. Your saved datasets have not been changed.
      </p>

      <button
        type="button"
        onClick={handleRetry}
        className="mt-4 flex h-[46px] w-[200px] items-center justify-center rounded-[6px] bg-[#455EFF] font-sans text-[14px] font-medium leading-[20px] text-white transition hover:bg-[#536BFF]"
      >
        Try again
      </button>
    </section>
  );
}
