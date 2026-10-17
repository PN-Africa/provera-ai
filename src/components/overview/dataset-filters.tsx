export function DatasetFilters() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[1.8fr_1fr_1fr]">
      {/* Dataset */}
      <div className="flex h-[46px] items-center rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          Sample transactions.csv
        </span>
      </div>

      {/* From date */}
      <div className="flex h-[46px] items-center rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          From (UTC)&nbsp; 28 Sep 2026
        </span>
      </div>

      {/* To date */}
      <div className="flex h-[46px] items-center rounded-lg border border-[#343644] bg-[#0D0E12] px-4">
        <span className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          To (UTC)&nbsp; 01 Oct 2026
        </span>
      </div>
    </div>
  );
}
