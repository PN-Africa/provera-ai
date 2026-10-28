import Link from "next/link";

type OverviewHeaderProps = {
  portal?: "client" | "admin";
};

export function OverviewHeader({ portal = "client" }: OverviewHeaderProps) {
  const transactionDataPath =
    portal === "admin"
      ? "/admin/workspace/transaction-data"
      : "/workspace/transaction-data";

  return (
    <div>
      <p className="font-sans text-[12px] font-medium uppercase leading-[18px] tracking-[0px] text-[#B7B9CB]">
        Transaction Intelligence
      </p>

      <h1 className="mt-2 font-manrope text-[40px] font-bold leading-[48px] tracking-[-0.4px] text-[#EDEFFF]">
        Overview
      </h1>

      <p className="mt-2 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
        Your transaction picture, with the signals that need attention.
      </p>

      <Link
        href={transactionDataPath}
        className="mt-6 flex h-[46px] w-[214px] items-center justify-center rounded-lg bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
      >
        Add transaction data
      </Link>
    </div>
  );
}
