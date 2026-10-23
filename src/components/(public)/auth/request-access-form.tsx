"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const requestAccessSchema = z.object({
  email: z.string().email("Please enter a valid work email"),

  workspaceName: z.string().min(2, "Please enter your workspace name"),

  reason: z.string().min(10, "Please provide a little more information"),
});

type RequestAccessFormData = z.infer<typeof requestAccessSchema>;

export function RequestAccessForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestAccessFormData>({
    resolver: zodResolver(requestAccessSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RequestAccessFormData) => {
    console.log("Access request:", data);

    // Temporary frontend-only behavior.
    // Replace with the backend API call once the endpoint is confirmed.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Access request submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#203B30]"
        />

        {errors.email && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Workspace Name */}
      <div className="space-y-2">
        <label
          htmlFor="workspaceName"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Workspace name
        </label>

        <input
          id="workspaceName"
          type="text"
          placeholder="Enter your team or organization"
          {...register("workspaceName")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#203B30]"
        />

        {errors.workspaceName && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.workspaceName.message}
          </p>
        )}
      </div>

      {/* Reason for Access */}
      <div className="space-y-2">
        <label
          htmlFor="reason"
          className="font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#EDEFFF]"
        >
          Reason for access
        </label>

        <input
          id="reason"
          type="text"
          placeholder="Tell us how you will use Provera AI"
          {...register("reason")}
          className="mt-2 h-12 w-full rounded-lg border border-[#343541] bg-[#0d0e12] px-4 font-sans text-[14px] leading-[20px] tracking-[0px] text-white outline-none placeholder:text-[#B7B9CB] focus:border-[#203B30]"
        />

        {errors.reason && (
          <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-red-400">
            {errors.reason.message}
          </p>
        )}
      </div>

      {/* Information */}
      <p className="font-sans text-[14px] leading-[20px] tracking-[0px] text-[#A7A9B8]">
        An administrator will review your request and assign the appropriate
        permissions. You will receive an email when your access is approved.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] tracking-[0px] text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending request..." : "Send access request"}
      </button>

      {/* Back to Sign In */}
      <Link
        href="/login"
        className="flex h-12 items-center justify-center rounded-lg border border-[#343541] font-sans text-[14px] leading-[20px] tracking-[0px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Back to sign in
      </Link>
    </form>
  );
}
