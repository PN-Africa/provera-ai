export interface ValidationError {
  row: string;
  message: string;
}

interface ValidationErrorsProps {
  errors?: ValidationError[];
}

export function ValidationErrors({ errors = [] }: ValidationErrorsProps) {
  return (
    <div className="mt-4">
      <div className="rounded-lg border border-[#343644] bg-[#202026] p-4">
        <p className="font-sans text-[14px] leading-[20px] text-[#B7B9CB]">
          {errors.length}{" "}
          {errors.length === 1 ? "record needs" : "records need"} correction. No
          records have been imported.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {errors.map((error, index) => (
          <div key={`${error.row}-${index}`}>
            <p className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
              {error.row}
            </p>

            <p className="mt-3 font-sans text-[14px] leading-[20px] text-[#FF9B9F]">
              {error.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
