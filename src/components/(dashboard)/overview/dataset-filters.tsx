"use client";

type DatasetFiltersProps = {
  fromDate: string;
  toDate: string;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
};

export function DatasetFilters({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: DatasetFiltersProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[1.8fr_1fr_1fr]">
      {/* Dataset */}
      <div className="flex h-[46px] items-center rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          Sample transactions.csv
        </span>
      </div>

      {/* From date */}
      <label className="flex h-[46px] items-center gap-2 rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="shrink-0 font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          From (UTC)
        </span>
        <input
          type="date"
          value={fromDate}
          onChange={(event) => onFromDateChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent font-sans text-[14px] text-[#B7B9CB] outline-none"
        />
      </label>

      {/* To date */}
      <label className="flex h-[46px] items-center gap-2 rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="shrink-0 font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          To (UTC)
        </span>
        <input
          type="date"
          value={toDate}
          min={fromDate || undefined}
          onChange={(event) => onToDateChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent font-sans text-[14px] text-[#B7B9CB] outline-none"
        />
      </label>
    </div>
  );
}
