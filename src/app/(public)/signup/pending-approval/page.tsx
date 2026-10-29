"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserRound,
  Mail,
} from "lucide-react";

interface PendingSignup {
  fullName: string;
  email: string;
}

function getPendingSignup(): PendingSignup | null {
  try {
    const storedSignup = sessionStorage.getItem("pendingSignup");

    if (!storedSignup) return null;

    const parsed: unknown = JSON.parse(storedSignup);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("fullName" in parsed) ||
      !("email" in parsed) ||
      typeof parsed.fullName !== "string" ||
      typeof parsed.email !== "string" ||
      !parsed.fullName.trim() ||
      !parsed.email.trim()
    ) {
      sessionStorage.removeItem("pendingSignup");
      return null;
    }

    return {
      fullName: parsed.fullName,
      email: parsed.email,
    };
  } catch {
    return null;
  }
}

export default function PendingApprovalPage() {
  const [signup] = useState<PendingSignup | null>(() => {
    if (typeof window === "undefined") return null;
    return getPendingSignup();
  });

  if (!signup) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-5 text-[#EDEFFF]">
        <section className="w-full max-w-[420px] rounded-2xl border border-[#343644] bg-[#202026] p-6 text-center sm:p-8">
          <h1 className="font-manrope text-[24px] font-semibold">
            Registration details unavailable
          </h1>

          <p className="mt-3 text-[14px] leading-6 text-[#B7B9CB]">
            Please sign up to create your account and view your registration
            status.
          </p>

          <Link
            href="/signup"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-[#34E89A] text-[14px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5]"
          >
            Back to sign up
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-12 text-[#EDEFFF]">
      <section className="w-full max-w-[480px] rounded-2xl border border-[#343644] bg-[#202026] p-6 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#286B50] bg-[#153B2D]">
          <CheckCircle2 size={28} className="text-[#34E89A]" />
        </div>

        <p className="mt-6 text-[12px] font-medium uppercase tracking-[1.5px] text-[#34E89A]">
          Registration complete
        </p>

        <h1 className="mt-3 font-manrope text-[28px] font-semibold leading-[36px]">
          Account created successfully
        </h1>

        <p className="mt-3 text-[14px] leading-[23px] text-[#B7B9CB]">
          Welcome, {signup.fullName}! Your analyst account has been submitted
          for approval. Here are the details you registered with.
        </p>

        <div className="mt-6 space-y-4 rounded-xl border border-[#343644] bg-[#171821] p-4">
          <div className="flex items-start gap-3">
            <UserRound size={20} className="mt-0.5 shrink-0 text-[#34E89A]" />
            <div className="min-w-0">
              <p className="text-[12px] text-[#8D90A5]">Full name</p>
              <p className="mt-1 break-words text-[14px] font-medium">
                {signup.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail size={20} className="mt-0.5 shrink-0 text-[#34E89A]" />
            <div className="min-w-0">
              <p className="text-[12px] text-[#8D90A5]">Registered email</p>
              <p className="mt-1 break-all text-[14px] font-medium">
                {signup.email}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4 rounded-xl border border-[#343644] bg-[#171821] p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-[#34E89A]"
            />
            <div>
              <p className="text-[14px] font-medium">Account created</p>
              <p className="mt-1 text-[13px] leading-5 text-[#A8ADB8]">
                Your registration was submitted successfully.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock3 size={20} className="mt-0.5 shrink-0 text-[#F0D18A]" />
            <div>
              <p className="text-[14px] font-medium">
                Awaiting administrator approval
              </p>
              <p className="mt-1 text-[13px] leading-5 text-[#A8ADB8]">
                Your account is expected to be reviewed within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#A8ADB8]" />
            <div>
              <p className="text-[14px] font-medium">Workspace access</p>
              <p className="mt-1 text-[13px] leading-5 text-[#A8ADB8]">
                You can sign in once an administrator approves your account.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[12px] leading-5 text-[#8D90A5]">
          The 24-hour period is the expected review window, not a guarantee of
          approval. If your account is still pending afterward, contact your
          administrator.
        </p>

        <Link
          href="/login"
          className="mt-7 flex h-12 w-full items-center justify-center rounded-lg bg-[#34E89A] text-[14px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5]"
        >
          Go to sign in
        </Link>

        <p className="mt-4 text-center text-[12px] text-[#8D90A5]">
          Your workspace remains restricted until approval.
        </p>
      </section>
    </main>
  );
}
