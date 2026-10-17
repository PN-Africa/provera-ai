"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),

    email: z.string().email("Please enter a valid work email"),

    password: z.string().min(12, "Password must be at least 12 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Sign up data:", data);

    // Temporary frontend-only behavior.
    // We will replace this with the backend API call
    // once the signup endpoint is confirmed.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Account creation submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Full name
        </label>

        <input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...register("fullName")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff]"
        />

        {errors.fullName && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Work Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Work email
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register("email")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff]"
        />

        {errors.email && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Create a password"
          {...register("password")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343644] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff]"
        />

        <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-[#A7A9B8]">
          Use at least 12 characters.
        </p>

        {errors.password && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          {...register("confirmPassword")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343644] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#4b63ff]"
        />

        {errors.confirmPassword && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Workspace Information */}
      <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-[#A7A9B8]">
        Your account and workspace permissions are managed separately. Your team
        administrator approves workspace access.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-[#455EFF] font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF] transition hover:bg-[#455EFF] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      {/* Sign In */}
      <Link
        href="/login"
        className="flex h-12 items-center justify-center rounded-lg border border-[#343541] font-sans text-[14px] leading-[20px] tracking-[0px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Already have an account? Sign in
      </Link>
    </form>
  );
}
