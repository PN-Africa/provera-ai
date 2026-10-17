interface TransactionSummaryCardProps {
  amount: string;
  customerId: string;
  paymentMethod: string;
  location: string;
  status: string;
  timestamp: string;
}

export function TransactionSummaryCard({
  amount,
  customerId,
  paymentMethod,
  location,
  status,
  timestamp,
}: TransactionSummaryCardProps) {
  const details = [
    { label: "Customer ID", value: customerId },
    { label: "Payment method", value: paymentMethod },
    { label: "Location", value: location },
    { label: "Review status", value: status },
    { label: "Timestamp", value: timestamp },
  ];

  return (
    <div className="rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
      <div className="mb-6">
        <p className="font-manrope text-[28px] font-medium leading-[36px] tracking-[-0.3px] text-[#EDEFFF]">
          {amount}
        </p>
      </div>

      <div className="space-y-5">
        {details.map((detail) => (
          <div key={detail.label}>
            <p className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
              {detail.label}
            </p>

            <p className="mt-2 break-words font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
              {detail.value || "Not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
