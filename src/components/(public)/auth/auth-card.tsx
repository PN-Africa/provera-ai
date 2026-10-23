import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[500px] rounded-xl border border-[#343644] bg-[#202026] p-10">
      {children}
    </div>
  );
}
