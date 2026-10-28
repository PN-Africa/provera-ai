"use client";

export function GuidanceCard() {
  function handleSignOut() {
    console.log("Sign out");
  }

  return (
    <>
      <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#202026] px-6 py-6">
        {/* Step 1 */}
        <div>
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            1. Start with the signal
          </h2>

          <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
            Risk levels prioritize review. They do not confirm whether a
            transaction is fraudulent.
          </p>
        </div>

        {/* Step 2 */}
        <div className="mt-5">
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            2. Inspect the evidence
          </h2>

          <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
            Review supplied attributes, rules and statistical comparisons.
            Missing context can limit interpretation.
          </p>
        </div>

        {/* Step 3 */}
        <div className="mt-5">
          <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
            3. Apply your judgment
          </h2>

          <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
            Follow your organization’s approved process. Provera does not block
            transactions or make financial decisions.
          </p>
        </div>

        {/* MVP limitation */}
        <div className="mt-5 rounded-[6px] border border-[#343644] bg-[#202026] px-4 py-4">
          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            This MVP detects selected amount and frequency patterns. It is not a
            trained fraud classifier and has no established accuracy claim.
          </p>
        </div>
      </section>

      {/* Sign out */}
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-6 flex h-[46px] w-[180px] items-center justify-center rounded-[6px] border border-[#90EFC5] bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
      >
        Sign out
      </button>
    </>
  );
}
