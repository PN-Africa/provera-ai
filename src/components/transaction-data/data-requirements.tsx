const requiredColumns = [
  "transaction_id",
  "amount",
  "currency",
  "date_time",
  "transaction_type",
];

const optionalColumns = ["customer_id", "location", "payment_method"];

export function DataRequirements() {
  return (
    <div className="rounded-xl border border-[#343644] bg-[#1C1D27] p-6">
      <h2 className="max-w-[360px] font-manrope text-[28px] font-semibold leading-[36px] tracking-[0px] text-[#EDEFFF]">
        A clean dataset makes a clearer picture.
      </h2>

      <div className="mt-5">
        <p className="font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
          Required columns
        </p>

        <div className="mt-1 space-y-1">
          {requiredColumns.map((column) => (
            <p
              key={column}
              className="font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]"
            >
              {column}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          Optional context
        </p>

        <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          {optionalColumns.join(", ")}
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-[#343644] bg-[#171A2E] p-4">
        <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          Customer ID enables frequency and historical comparisons. All records
          must pass validation.
        </p>
      </div>
    </div>
  );
}
