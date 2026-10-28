interface ValidDatasetProps {
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
}

export function ValidDataset({
  totalRecords,
  validRecords,
  invalidRecords,
}: ValidDatasetProps) {
  return (
    <div className="mt-4 rounded-lg border border-[#343644] bg-[#202026] p-4">
      <p className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
        {totalRecords} total records · {validRecords} valid · {invalidRecords}{" "}
        invalid
      </p>

      <p className="mt-1 font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
        {invalidRecords === 0
          ? "Every record passed validation."
          : `${invalidRecords} records need correction before analysis.`}
      </p>
    </div>
  );
}
