"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DataSource } from "./data-source-types";

export function ManageDataSource({ source }: { source: DataSource }) {
  const router = useRouter();
  const [name, setName] = useState(source.name);
  const [status, setStatus] = useState(source.status);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // This currently updates the form only.
    // Connect this to your backend to persist changes.
    router.push("/admin/data-sources");
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Manage data source
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Configure availability for future transaction imports.
        </p>
      </header>

      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6"
      >
        <div>
          <h2 className="text-lg font-medium text-[#EDEFFF]">{source.name}</h2>
          <p className="mt-3 text-sm text-[#A8ADB8]">
            Source type: {source.type.toLowerCase()}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="source-name" className="block text-sm text-white">
            Source name
          </label>
          <input
            id="source-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="min-h-12 w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="source-status" className="block text-sm text-white">
            Availability
          </label>
          <select
            id="source-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="min-h-12 w-full rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]"
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
          <p className="text-sm text-[#A8ADB8]">
            Disable to prevent new uploads from this source.
          </p>
        </div>

        <p className="text-sm leading-6 text-[#EDEFFF]">
          Disabling a source keeps existing transaction data and analysis
          results. Re-enable it whenever uploads should resume.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black hover:bg-[#90EFC5]"
          >
            Save source
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/data-sources")}
            className="min-h-12 rounded-lg border border-[#393943] px-8 text-sm text-white hover:bg-[#292930]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
