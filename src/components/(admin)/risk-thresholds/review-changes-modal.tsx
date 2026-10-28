type ReviewChangesModalProps = {
  open: boolean;
  mediumThreshold: number;
  highThreshold: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ReviewChangesModal({
  open,
  mediumThreshold,
  highThreshold,
  onCancel,
  onConfirm,
}: ReviewChangesModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-threshold-title"
        className="w-full max-w-lg rounded-xl border border-[#393943] bg-[#202027] p-6"
      >
        <h2
          id="review-threshold-title"
          className="text-xl font-semibold text-[#EDEFFF]"
        >
          Review changes
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          Review the proposed risk classification before applying it.
        </p>

        <div className="mt-5 space-y-4 rounded-lg border border-[#393943] bg-[#292930] p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#A8ADB8]">
              Medium risk starts at
            </span>
            <span className="text-sm font-medium text-[#EDEFFF]">
              {mediumThreshold}{" "}
              {mediumThreshold === 1 ? "indicator" : "indicators"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#A8ADB8]">High risk starts at</span>
            <span className="text-sm font-medium text-[#EDEFFF]">
              {highThreshold} indicators
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#A8ADB8]">
          In this frontend prototype, confirmation updates the displayed
          thresholds only. It does not change backend detection behavior.
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-lg border border-[#393943] px-4 text-sm text-[#EDEFFF] hover:bg-[#292930]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
          >
            Confirm changes
          </button>
        </div>
      </section>
    </div>
  );
}
