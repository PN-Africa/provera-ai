import Link from "next/link";

const metrics = [
  {
    label: "Transactions analyzed",
    value: "69",
  },
  {
    label: "Flagged for review",
    value: "4",
  },
  {
    label: "High risk",
    value: "2",
  },
];

export function Hero() {
  return (
    <section className="w-full bg-[#18181D] px-5 py-20 sm:px-8 lg:px-20 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center">
        {/* Eyebrow */}
        <p className="w-full font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
          TRANSACTION INTELLIGENCE · HUMAN JUDGMENT
        </p>

        {/* Heading */}
        <h1 className="mt-6 w-full text-center font-manrope text-[42px] font-bold leading-[48px] tracking-[-0.75px] text-[#EDEFFF] sm:text-[52px] sm:leading-[60px] lg:mt-6 lg:text-[64px] lg:leading-[72px] lg:tracking-[-1px]">
          See the pattern.
          <br />
          Understand the risk.
        </h1>

        {/* Description */}
        <p className="mt-6 w-full text-center font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB] sm:text-[18px] sm:leading-[28px]">
          Turn transaction data into clear signals. Find unusual activity,
          understand what triggered it, and focus your next review.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/signup"
            className="flex h-[46px] w-full items-center justify-center rounded-lg bg-[#455EFF] px-4 font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF] transition hover:bg-[#4057E6] sm:w-[200px]"
          >
            Create your account
          </Link>

          <Link
            href="#overview"
            className="flex h-[46px] w-full items-center justify-center rounded-lg border border-[#343644] bg-[#1C1D27] px-4 font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF] transition hover:bg-[#252630] sm:w-[220px]"
          >
            Explore sample data
          </Link>
        </div>

        {/* Supporting text */}
        <p className="mt-6 w-full text-left font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
          Explainable indicators. Decisions stay with you.
        </p>

        {/* Overview */}
        <div
          id="overview"
          className="mt-6 w-full rounded-xl border border-[#343644] bg-[#1C1D27] p-5 sm:p-8"
        >
          {/* Overview Header */}
          <div>
            <p className="font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#B7B9CB]">
              PROVERA AI / OVERVIEW · ILLUSTRATIVE DATA
            </p>

            <h2 className="mt-2 font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
              Signals worth a closer look.
            </h2>
          </div>

          {/* Metrics */}
          <div className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex h-[150px] flex-col gap-3 rounded-lg bg-[#1C1D27] px-4 py-5"
              >
                <p className="font-sans text-[14px] font-normal leading-[20px] tracking-[0px] text-[#B7B9CB]">
                  {metric.label}
                </p>

                <p className="font-manrope text-[32px] font-semibold leading-[40px] tracking-[0px] text-[#EDEFFF]">
                  {metric.value}
                </p>

                <p className="font-sans text-[12px] font-normal leading-[18px] tracking-[0px] text-[#B7B9CB]">
                  Synthetic sample
                </p>
              </div>
            ))}
          </div>

          {/* Flagged Transaction */}
          <div className="mt-4 w-full max-w-[837px] rounded-xl border border-[#343644] bg-[#1C1D27] p-4">
            {/* Transaction */}
            <h3 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
              PV-1048 · NGN 950,000.00
            </h3>

            {/* Risk Badge */}
            <div className="mt-4 flex h-7 w-[110px] items-center justify-center rounded-lg bg-[#38252F] px-4">
              <span className="font-sans text-[12px] font-medium leading-[18px] tracking-[0px] text-[#FF9B9F]">
                High risk
              </span>
            </div>

            {/* Signals */}
            <div className="mt-4 font-sans text-[14px] font-normal leading-[20px] tracking-[0px] text-[#B7B9CB]">
              <p>High amount</p>
              <p>Deviation from earlier activity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
