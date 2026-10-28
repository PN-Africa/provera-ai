type SettingsValues = {
  workspaceName: string;
  adminEmail: string;
  timezone: string;
  currency: string;
};

type ReviewSettingsModalProps = {
  open: boolean;
  values: SettingsValues;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ReviewSettingsModal({
  open,
  values,
  onCancel,
  onConfirm,
}: ReviewSettingsModalProps) {
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
        aria-labelledby="review-settings-title"
        className="w-full max-w-lg rounded-xl border border-[#393943] bg-[#202027] p-6"
      >
        <h2
          id="review-settings-title"
          className="text-xl font-semibold text-[#EDEFFF]"
        >
          Review changes
        </h2>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Confirm the workspace settings you want to apply.
        </p>

        <dl className="mt-5 space-y-4 rounded-lg border border-[#393943] bg-[#292930] p-4">
          {[
            ["Workspace name", values.workspaceName],
            ["Administrator contact", values.adminEmail],
            ["Timezone", values.timezone],
            ["Default currency", values.currency],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4"
            >
              <dt className="text-sm text-[#A8ADB8]">{label}</dt>
              <dd className="break-all text-sm text-[#EDEFFF]">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs leading-5 text-[#A8ADB8]">
          This prototype saves changes in the current page state only. Backend
          persistence is not connected yet.
        </p>

        <div className="mt-6 flex justify-end gap-3">
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
