"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/(public)/auth/auth-header";
import { AuthCard } from "@/components/(public)/auth/auth-card";
import { login } from "@/lib/api/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const user = await login({
        email: email.trim(),
        password,
      });

      const role = user.role.toLowerCase();

      if (role === "admin" || role === "administrator") {
        router.replace("/admin/workspace/overview");
      } else {
        router.replace("/workspace/overview");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#18181D] px-4 py-16 text-white">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8">
        <AuthHeader />

        <AuthCard>
          <div className="space-y-6">
            <div>
              <p className="mb-3 font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
                Provera AI Workspace
              </p>

              <h1 className="font-manrope text-[28px] font-medium leading-[36px] tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 font-sans text-sm leading-[20px] text-[#a7a9b8]">
                Sign in to review transactions and understand the signals that
                need your attention.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-sans text-[14px] font-medium leading-[20px]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0B0C0E] px-4 font-sans text-[14px] leading-[20px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#34E89A]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF]"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-12 w-full rounded-lg border border-[#343644] bg-[#0B0C0E] px-4 pr-12 font-sans text-[14px] leading-[20px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#34E89A]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-[#B7B9CB] transition hover:text-[#34E89A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E89A]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <Eye size={20} strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message styling updated to match the signup page */}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[14px] text-red-400"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <Link
              href="/signup"
              className="flex h-12 items-center justify-center rounded-lg border border-[#343541] font-sans text-[14px] leading-[20px] text-[#EDEFFF] transition hover:bg-[#252630]"
            >
              New to Provera AI? Sign up
            </Link>

            <p className="font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
              Need workspace access?{" "}
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
