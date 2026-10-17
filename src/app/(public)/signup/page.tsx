import { AuthCard } from "@/components/(public)/auth/auth-card";
import { AuthHeader } from "@/components/(public)/auth/auth-header";
import { SignUpForm } from "@/components/(public)/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#18181D] px-4 py-16 text-white">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8">
        <AuthHeader />

        <AuthCard>
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="font-sans mb-3 text-[12px] font-medium uppercase leading-[18px] tracking-[0px] text-[#B7B9CB]">
                Provera AI Workspace
              </p>

              <h1 className="font-manrope text-[28px] font-medium leading-[36px] tracking-[0px]">
                Create your account
              </h1>

              <p className="font-sans mt-2 text-[14px] font-normal leading-[20px] tracking-[0px] text-[#A7A9B8]">
                Get started with Provera AI using your work email.
              </p>
            </div>

            {/* Form */}
            <SignUpForm />
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
