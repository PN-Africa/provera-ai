import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="w-full bg-[#18181D] px-5 py-20 sm:px-8 lg:px-20 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 text-center">
        {/* Heading */}
        <h2 className="font-manrope text-[32px] font-bold leading-[40px] tracking-[-0.3px] text-[#EDEFFF] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px] lg:tracking-[-0.4px]">
          Make your next review a more informed one.
        </h2>

        {/* CTA */}
        <Link
          href="/signup"
          className="flex h-[46px] w-full items-center justify-center rounded-lg bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#0B0C0E] transition hover:bg-[#90EFC5] sm:w-[240px]"
        >
          Create your account
        </Link>
      </div>
    </section>
  );
}
