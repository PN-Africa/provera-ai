import Link from "next/link";

interface TransactionDetailHeaderProps {
  transactionId: string;
  date: string;
  portal?: "client" | "admin";
}

export function TransactionDetailHeader({
  transactionId,
  date,
  portal = "client",
}: TransactionDetailHeaderProps) {
  const flaggedTransactionsPath =
    portal === "admin"
      ? "/admin/workspace/flagged-transactions"
      : "/workspace/flagged-transactions";

  return (
    <div>
      <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
        Transaction Intelligence
      </p>

      <h1 className="mt-2 font-manrope text-[40px] font-bold leading-[48px] tracking-[-0.4px] text-[#EDEFFF]">
        {transactionId}
      </h1>

      <p className="mt-2 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
        Transfer · {date}
      </p>

      <Link
        href={flaggedTransactionsPath}
        className="mt-6 flex h-[46px] w-[220px] items-center justify-center rounded-[6px] border border-[#343644] bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
      >
        Back to flagged
      </Link>
    </div>
  );
}
