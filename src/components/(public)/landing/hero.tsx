import WaveCanvas from "./WaveCanvas";

export default function Hero() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6 py-12">
      {/* soft green glow, bottom-right */}
      <div className="pointer-events-none absolute -right-[10%] -bottom-[20%] size-[50vw] bg-[radial-gradient(closest-side,rgba(30,120,70,0.55),transparent)]" />

      <WaveCanvas className="absolute inset-0 block size-full" />

      <div className="relative z-10 flex max-w-[680px] flex-col items-center text-center">
        <p className="mb-7 text-xs tracking-[0.02em] text-muted">
          TRANSACTION INTELLIGENCE · HUMAN JUDGMENT
        </p>

        <h1 className="mb-7 font-display text-[clamp(40px,7vw,68px)] leading-[1.1] font-semibold tracking-[-0.02em]">
          See the pattern.
          <br />
          Understand the risk.
        </h1>

        <p className="mb-8 max-w-[34em] text-[clamp(16px,2vw,18px)] leading-[1.6]">
          Turn transaction data into clear signals. Find unusual activity,
          understand what triggered it, and focus your next review.
        </p>

        <button
          type="button"
          className="cursor-pointer rounded-lg bg-accent px-5 py-4 text-[15px] leading-none font-medium text-accent-ink transition hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-text"
        >
          Create your account
        </button>

        <p className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
          <span>Explainable indicators</span>
          <span>Decisions stay with you.</span>
        </p>
      </div>
    </main>
  );
}
