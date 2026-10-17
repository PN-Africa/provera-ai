import Link from "next/link";
import { AuthHeader } from "@/components/(public)/auth/auth-header";
import { AuthCard } from "@/components/(public)/auth/auth-card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-#18181D] px-4 py-16 text-white">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8">
        <AuthHeader />

        <AuthCard>
          <div className="space-y-6">
            <div>
              <p className="font-sans mb-3 text-[12px] font-medium uppercase text-[#B7B9CB] leading-[18px] tracking-[0px]">
                Provera AI Workspace
              </p>

              <h1 className="font-manrope text-[28px] leading-[36px] tracking-[0px] font-medium tracking-tight">
                Welcome back
              </h1>

              <p className="font-sans mt-2 text-sm font-normal  leading-[20px] tracking-[0px] text-[#a7a9b8]">
                Sign in to review transactions and understand the signals that
                need your attention.
              </p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2 ">
                <label
                  htmlFor="email"
                  className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 text-[14px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff] font-sans leading-[20px] tracking-[0px]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="font-sans text-[14px] font-medium  leading-[20px] tracking-[0px] text-[#EDEFFF]"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 h-12 w-full rounded-lg font-sans border border-[#343644] bg-[#0d0e12] px-4  text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff] text-[14px] font-medium  leading-[20px] tracking-[0px] "
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full font-sans rounded-lg bg-[#455EFF] text-[#EDEFFF] transition hover:bg-[#455EFF] font-sans text-[14px] font-medium  leading-[20px] tracking-[0px]"
              >
                Sign in
              </button>
            </form>

            <Link
              href="/signup"
              className="font-sans flex h-12 items-center justify-center rounded-lg border border-[#343541] text-[14px] text-[#EDEFFF] leading-[20px] tracking-[0px] transition hover:bg-[#252630]"
            >
              New to Provera AI? Sign up
            </Link>

            <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-[#EDEFFF]">
              Need workspace access? {""}
              <Link href="/request-access" className="hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
