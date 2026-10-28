"use client";

import { useState } from "react";

type Props = {
  onGrant: (
    email: string,
    role: "Administrator" | "Analyst" | "Viewer",
  ) => void;
  onCancel: () => void;
};

export function AddUserForm({ onGrant, onCancel }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Administrator" | "Analyst" | "Viewer">(
    "Analyst",
  );
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) return;

    onGrant(normalizedEmail, role);
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Add user
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Grant a user access to the workspace.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6"
      >
        <h2 className="text-lg font-medium text-[#EDEFFF]">New member</h2>

        <div className="mt-4">
          <label htmlFor="new-user-email" className="text-sm text-white">
            Email address
          </label>
          <input
            id="new-user-email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="name@company.com"
            className="mt-2 min-h-[46px] w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-white outline-none focus:border-[#34E89A]"
          />
          <p className="mt-2 text-sm text-[#A8ADB8]">
            Enter a valid email that is not already a workspace member.
          </p>
        </div>

        <div className="mt-5">
          <label htmlFor="new-user-role" className="text-sm text-white">
            Role
          </label>
          <select
            id="new-user-role"
            value={role}
            onChange={(event) => setRole(event.target.value as typeof role)}
            className="mt-2 min-h-[46px] w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-white outline-none focus:border-[#34E89A]"
          >
            <option>Administrator</option>
            <option>Analyst</option>
            <option>Viewer</option>
          </select>
          <p className="mt-2 text-sm text-[#A8ADB8]">
            Choose Administrator, Analyst or Viewer.
          </p>
        </div>

        <p className="mt-4 text-sm text-[#A8ADB8]">
          The user must sign in with this email to access the workspace.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-[#FF8290]">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="submit"
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
          >
            Grant access
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="min-h-12 rounded-lg border border-[#393943] px-8 text-sm text-white hover:bg-[#292930]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
