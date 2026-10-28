"use client";

import { useState } from "react";
import { WorkspaceUser } from "./user-types";

type Props = {
  user: WorkspaceUser;
  onSave: (user: WorkspaceUser) => void;
  onDeactivate: (user: WorkspaceUser) => void;
  onCancel: () => void;
};

export function ManageUserForm({
  user,
  onSave,
  onDeactivate,
  onCancel,
}: Props) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Manage user
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Review the member &apos;s permissions and access status.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">{user.name}</h2>
        <p className="mt-3 text-sm text-[#A8ADB8]">{user.email}</p>

        <div className="mt-5">
          <label htmlFor="manage-role" className="text-sm text-white">
            Role
          </label>
          <select
            id="manage-role"
            value={role}
            disabled={user.owner}
            onChange={(event) => setRole(event.target.value as typeof role)}
            className="mt-2 min-h-[46px] w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-white outline-none focus:border-[#34E89A] disabled:opacity-60"
          >
            <option>Administrator</option>
            <option>Analyst</option>
            <option>Viewer</option>
          </select>
          <p className="mt-2 text-sm text-[#A8ADB8]">
            Administrator: manages the workspace. Analyst: imports and reviews
            data. Viewer: reads results.
          </p>
          {user.owner && (
            <p className="mt-1 text-xs text-[#A8ADB8]">
              The workspace owner role cannot be changed here.
            </p>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="manage-status" className="text-sm text-white">
            Access status
          </label>
          <select
            id="manage-status"
            value={status}
            disabled={user.owner}
            onChange={(event) => setStatus(event.target.value as typeof status)}
            className="mt-2 min-h-[46px] w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-white outline-none focus:border-[#34E89A] disabled:opacity-60"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <p className="mt-2 text-sm text-[#A8ADB8]">
            Choose Inactive to revoke workspace access.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSave({ ...user, role, status })}
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
          >
            Save user access
          </button>
          <button
            type="button"
            disabled={user.owner || status === "Inactive"}
            onClick={() => onDeactivate(user)}
            className="min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-white hover:bg-[#292930] disabled:opacity-40"
          >
            Deactivate user
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
