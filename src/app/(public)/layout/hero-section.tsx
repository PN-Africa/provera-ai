import Link from "next/link";
import { ParticleWave } from "./particle-wave";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[720px] items-center justify-center overflow-hidden bg-[#17181c] px-5 text-white sm:min-h-[760px]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(0,190,110,0.07),transparent_55%)]"
      />

      {/* Animated particle background */}
      <div className="pointer-events-none absolute inset-0">
        <ParticleWave />
      </div>

      {/* Dark overlay keeps text readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17181c] via-[#17181c]/90 to-transparent"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto -mt-8 w-full max-w-4xl text-center sm:-mt-12">
        <p className="mb-7 text-[11px] font-medium uppercase tracking-[0.02em] text-[#b1b3bd] sm:text-xs">
          Transaction Intelligence · Human Judgment
        </p>

        <h1 className="text-[42px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#f4f4f7] sm:text-6xl md:text-[64px]">
          See the pattern.
          <br />
          Understand the risk.
        </h1>

        <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-7 text-[#e0e0e5] sm:text-[17px]">
          Turn transaction data into clear signals. Find unusual activity,
          understand what triggered it, and focus your next review.
        </p>

        <div className="mt-6">
          <Link
            href="/signup"
            className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#32e6a0] px-5 text-sm font-medium text-[#071a13] transition-colors hover:bg-[#5af0b4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#32e6a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181c]"
          >
            Create your account
          </Link>
        </div>

        <p className="mt-6 text-xs text-[#d5d6dc]">
          Explainable indicators. Decisions stay with you.
        </p>
      </div>
    </section>
  );
}
