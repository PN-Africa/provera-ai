import Link from "next/link";
import type { ReactNode } from "react";

type ManagementCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon?: ReactNode;
};

export function ManagementCard({
  title,
  description,
  buttonLabel,
  href,
  icon,
}: ManagementCardProps) {
  return (
    <article className="flex min-h-[178px] flex-col items-start rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="text-[#34E89A]" aria-hidden="true">
            {icon}
          </span>
        )}

        <h2 className="text-lg font-medium tracking-tight text-[#EDEFFF]">
          {title}
        </h2>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#A8ADB8]">{description}</p>

      <Link
        href={href}
        className="mt-4 inline-flex min-h-[50px] items-center justify-center rounded-lg border border-[#393943] px-5 text-sm font-medium text-[#EDEFFF] transition-colors hover:border-[#34E89A] hover:bg-[#203B30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E89A]"
      >
        {buttonLabel}
      </Link>
    </article>
  );
}
