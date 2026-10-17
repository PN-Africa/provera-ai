interface TransactionsHeaderProps {
  title: string;
  description: string;
}

export function TransactionsHeader({
  title,
  description,
}: TransactionsHeaderProps) {
  return (
    <div>
      <p className="font-sans text-[12px] font-medium uppercase leading-[18px] tracking-[0px] text-[#B7B9CB]">
        Transaction Intelligence
      </p>

      <h1 className="mt-2 font-manrope text-[40px] font-bold leading-[48px] tracking-[-0.4px] text-[#EDEFFF]">
        {title}
      </h1>

      <p className="mt-2 font-sans text-[16px] font-normal leading-[24px] tracking-[0px] text-[#B7B9CB]">
        {description}
      </p>
    </div>
  );
}
