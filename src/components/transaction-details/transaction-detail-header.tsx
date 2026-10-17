import Link from "next/link";

interface TransactionDetailHeaderProps {
  transactionId: string;
  date: string;
}

export function TransactionDetailHeader({
  transactionId,
  date,
}: TransactionDetailHeaderProps) {
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
        href="/workspace/flagged-transactions"
        className="mt-6 flex h-[46px] w-[220px] items-center justify-center rounded-[6px] border border-[#343644] bg-[#1C1D27] font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#222431]"
      >
        Back to flagged
      </Link>
    </div>
  );
}
