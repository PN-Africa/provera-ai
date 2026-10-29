"use client";

import { Check, X, UserCheck } from "lucide-react";

type ApproveAnalystModalProps = {
  isOpen: boolean;
  analystName: string;
  isApproving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ApproveAnalystModal({
  isOpen,
  analystName,
  isApproving,
  onCancel,
  onConfirm,
}: ApproveAnalystModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isApproving) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="approve-analyst-title"
        aria-describedby="approve-analyst-description"
        className="w-full max-w-md rounded-2xl border border-[#393943] bg-[#202027] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#34E89A]/10">
            <UserCheck size={24} className="text-[#34E89A]" />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isApproving}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-[#A8ADB8] transition hover:bg-[#292930] hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <h2
          id="approve-analyst-title"
          className="mt-5 text-xl font-semibold text-[#EDEFFF]"
        >
          Approve analyst?
        </h2>

        <p
          id="approve-analyst-description"
          className="mt-3 text-sm leading-6 text-[#A8ADB8]"
        >
          Are you sure you want to approve{" "}
          <span className="font-medium text-[#EDEFFF]">{analystName}</span>?
          They will be able to sign in after their account is approved.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isApproving}
            className="rounded-lg border border-[#393943] px-4 py-2.5 text-sm font-medium text-[#EDEFFF] transition hover:bg-[#292930] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isApproving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-4 py-2.5 text-sm font-semibold text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={16} />
            {isApproving ? "Approving..." : "Confirm approval"}
          </button>
        </div>
      </div>
    </div>
  );
}
