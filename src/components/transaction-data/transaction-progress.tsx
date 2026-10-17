type PageState =
  | "upload"
  | "validation-error"
  | "valid"
  | "analyzing"
  | "complete";

interface TransactionProgressProps {
  pageState: PageState;
}

function Step({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-sans text-[12px] font-medium leading-[18px] ${
          active || completed ? "text-[#EDEFFF]" : "text-[#B7B9CB]"
        }`}
      >
        {number}
      </span>

      <span
        className={`font-sans text-[12px] font-medium leading-[18px] ${
          active || completed ? "text-[#EDEFFF]" : "text-[#B7B9CB]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function TransactionProgress({ pageState }: TransactionProgressProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <Step
        number="1"
        label="Upload data"
        active={pageState === "upload"}
        completed={
          pageState === "validation-error" ||
          pageState === "valid" ||
          pageState === "analyzing" ||
          pageState === "complete"
        }
      />

      <Step
        number="2"
        label="Validate records"
        active={pageState === "validation-error" || pageState === "valid"}
        completed={
          pageState === "valid" ||
          pageState === "analyzing" ||
          pageState === "complete"
        }
      />

      <Step
        number="3"
        label="Analyze transactions"
        active={pageState === "analyzing"}
        completed={pageState === "complete"}
      />

      <Step
        number="4"
        label="Review results"
        active={pageState === "complete"}
        completed={pageState === "complete"}
      />
    </div>
  );
}
