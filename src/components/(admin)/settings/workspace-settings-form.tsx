"use client";

import { useState } from "react";
import { ReviewSettingsModal } from "./review-settings-modal";

type SettingsValues = {
  workspaceName: string;
  adminEmail: string;
  timezone: string;
  currency: string;
};

const initialValues: SettingsValues = {
  workspaceName: "Provera AI workspace",
  adminEmail: "admin@example.com",
  timezone: "UTC",
  currency: "NGN",
};

const inputClass =
  "mt-2 min-h-[46px] w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]";

export function WorkspaceSettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [draft, setDraft] = useState(initialValues);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [message, setMessage] = useState("");

  function update<K extends keyof SettingsValues>(
    key: K,
    value: SettingsValues[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  function reviewChanges(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewOpen(true);
  }

  function confirmChanges() {
    setValues(draft);
    setReviewOpen(false);
    setMessage("Settings updated in this page's current state.");
  }

  return (
    <>
      <form onSubmit={reviewChanges} className="space-y-6">
        <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
          <h2 className="text-lg font-medium text-[#EDEFFF]">
            Workspace details
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="workspace-name"
                className="text-sm text-[#EDEFFF]"
              >
                Workspace name
              </label>
              <input
                id="workspace-name"
                value={draft.workspaceName}
                onChange={(event) =>
                  update("workspaceName", event.target.value)
                }
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="admin-email" className="text-sm text-[#EDEFFF]">
                Administrator contact
              </label>
              <input
                id="admin-email"
                type="email"
                value={draft.adminEmail}
                onChange={(event) => update("adminEmail", event.target.value)}
                required
                className={inputClass}
              />
              <p className="mt-2 text-sm text-[#A8ADB8]">
                Used as the workspace contact.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
          <h2 className="text-lg font-medium text-[#EDEFFF]">
            Display preferences
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="timezone" className="text-sm text-[#EDEFFF]">
                Timezone
              </label>
              <select
                id="timezone"
                value={draft.timezone}
                onChange={(event) => update("timezone", event.target.value)}
                className={inputClass}
              >
                <option value="UTC">UTC</option>
                <option value="Africa/Lagos">Africa/Lagos</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
              <p className="mt-2 text-sm text-[#A8ADB8]">
                Used in timestamps and activity logs.
              </p>
            </div>

            <div>
              <label htmlFor="currency" className="text-sm text-[#EDEFFF]">
                Default currency
              </label>
              <select
                id="currency"
                value={draft.currency}
                onChange={(event) => update("currency", event.target.value)}
                className={inputClass}
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
              <p className="mt-2 text-sm text-[#A8ADB8]">
                Does not convert transaction amounts.
              </p>
            </div>
          </div>

          {message && (
            <p role="status" className="mt-4 text-sm text-[#90EFC5]">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
          >
            Review changes
          </button>
        </section>
      </form>

      <ReviewSettingsModal
        open={reviewOpen}
        values={draft}
        onCancel={() => setReviewOpen(false)}
        onConfirm={confirmChanges}
      />
    </>
  );
}
