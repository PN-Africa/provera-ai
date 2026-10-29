"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(2, "Please enter your first name"),
    lastName: z.string().trim().min(2, "Please enter your last name"),
    email: z.string().trim().email("Please enter a valid work email"),
    password: z.string().min(12, "Password must be at least 12 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    setApiError("");
    setSuccessMessage("");

    try {
      await signup({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      sessionStorage.setItem(
        "pendingSignup",
        JSON.stringify({
          fullName: `${data.firstName.trim()} ${data.lastName.trim()}`,
          email: data.email.trim(),
        }),
      );

      router.push("/signup/pending-approval");
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
      );
    }
  };

  const inputClass =
    "mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#203B30]";

  const labelClass =
    "font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF]";

  const errorClass = "text-[14px] leading-[20px] text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="firstName" className={labelClass}>
          First name
        </label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="Enter your first name"
          {...register("firstName")}
          className={inputClass}
        />
        {errors.firstName && (
          <p className={errorClass}>{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="lastName" className={labelClass}>
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Enter your last name"
          {...register("lastName")}
          className={inputClass}
        />
        {errors.lastName && (
          <p className={errorClass}>{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className={labelClass}>
          Work email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          {...register("password")}
          className={inputClass}
        />
        <p className="text-[14px] leading-[20px] text-[#A7A9B8]">
          Use at least 12 characters.
        </p>
        {errors.password && (
          <p className={errorClass}>{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          {...register("confirmPassword")}
          className={inputClass}
        />
        {errors.confirmPassword && (
          <p className={errorClass}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <p className="text-[14px] leading-[20px] text-[#A7A9B8]">
        Your account and workspace permissions are managed separately. Your team
        administrator approves workspace access.
      </p>

      {apiError && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[14px] text-red-400"
        >
          {apiError}
        </p>
      )}

      {successMessage && (
        <p
          role="status"
          className="rounded-lg border border-[#286B50] bg-[#153B2D] p-3 text-[14px] leading-6 text-[#86E0B5]"
        >
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || Boolean(successMessage)}
        className="h-12 w-full rounded-lg bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Creating account..."
          : successMessage
            ? "Account created"
            : "Create account"}
      </button>

      <Link
        href="/login"
        className="flex h-12 items-center justify-center rounded-lg border border-[#343541] text-[14px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Already have an account? Sign in
      </Link>
    </form>
  );
}
