"use client";

import type { WorkspaceUser } from "./user-types";

type Props = {
  user: WorkspaceUser;
  onConfirm: (user: WorkspaceUser) => void;
  onCancel: () => void;
};

export function DeactivateUser({ user, onConfirm, onCancel }: Props) {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Deactivate user
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Confirm removal of this member&apos;s workspace access.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Deactivate {user.name}?
        </h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          Their transaction activity and history will be retained.
        </p>

        <p className="mt-4 text-sm leading-6 text-[#EDEFFF]">
          {user.name} will no longer be able to access this workspace. An
          administrator can reactivate their account later. You cannot
          deactivate the last active administrator.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={user.owner}
            onClick={() => onConfirm({ ...user, status: "Inactive" })}
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm deactivation
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="min-h-12 rounded-lg border border-[#393943] px-8 text-sm text-white hover:bg-[#292930]"
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
