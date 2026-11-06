// interface TransactionDetailHeaderProps {
//   transactionId: string;
//   date: string;
//   onBack: () => void;
// }

// export function TransactionDetailHeader({
//   transactionId,
//   date,
//   onBack,
// }: TransactionDetailHeaderProps) {
//   return (
//     <div>
//       <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
//         Transaction Intelligence
//       </p>

//       <h1 className="mt-2 break-words font-manrope text-[28px] font-bold leading-[36px] tracking-[-0.4px] text-[#EDEFFF] sm:text-[40px] sm:leading-[48px]">
//         {transactionId}
//       </h1>

//       <p className="mt-2 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
//         Transfer · {date}
//       </p>

//       <button
//         type="button"
//         onClick={onBack}
//         className="mt-6 flex h-[46px] w-[220px] items-center justify-center rounded-[6px] border border-[#343644] bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
//       >
//         Back
//       </button>
//     </div>
//   );
// }

interface TransactionDetailHeaderProps {
  transactionId: string;
  type: string;
  date: string;
  onBack: () => void;
}

export function TransactionDetailHeader({
  transactionId,
  type,
  date,
  onBack,
}: TransactionDetailHeaderProps) {
  return (
    <div>
      <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
        Transaction Intelligence
      </p>

      <h1 className="mt-2 break-words font-manrope text-[28px] font-bold leading-[36px] tracking-[-0.4px] text-[#EDEFFF] sm:text-[40px] sm:leading-[48px]">
        {transactionId}
      </h1>

      <p className="mt-2 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
        {type} · {date}
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 flex h-[46px] w-[220px] items-center justify-center rounded-[6px] border border-[#343644] bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
      >
        Back
      </button>
    </div>
  );
}
