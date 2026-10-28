import { ThresholdForm } from "./threshold-form";

export function RiskThresholds() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Risk thresholds
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          Adjust how triggered indicators determine a transaction&apos;s risk
          level.
        </p>
      </header>

      <ThresholdForm enabledRules={3} />
    </div>
  );
}
