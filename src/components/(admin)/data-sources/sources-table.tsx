"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const sources = [
  {
    id: "csv",
    name: "Transaction CSV",
    type: "File upload",
    status: "Enabled",
    latestImport: "22 Oct · 09:20",
  },
  {
    id: "sample",
    name: "Sample dataset",
    type: "Synthetic data",
    status: "Enabled",
    latestImport: "21 Oct · 16:10",
  },
];

export function SourcesTable() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState<
    (typeof sources)[number] | null
  >(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
              {["Source", "Type", "Status", "Latest import", "Action"].map(
                (heading, index) => (
                  <th
                    key={heading}
                    className={`border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r ${
                      index === 4 ? "text-center" : ""
                    }`}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {sources.map((source) => (
              <tr key={source.id} className="text-sm text-[#EDEFFF]">
                <td className="px-3 py-4">{source.name}</td>
                <td className="px-3 py-4">{source.type}</td>
                <td className="px-3 py-4">{source.status}</td>
                <td className="px-3 py-4">{source.latestImport}</td>
                <td className="px-3 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/admin/manage-data-source/${source.id}`)
                    }
                    className="font-medium text-[#34E89A] hover:text-[#90EFC5]"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSource && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedSource(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="source-dialog-title"
            className="w-full max-w-md rounded-xl border border-[#393943] bg-[#202027] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="source-dialog-title"
              className="text-lg font-semibold text-[#EDEFFF]"
            >
              Manage source
            </h3>

            <p className="mt-4 text-sm text-[#A8ADB8]">Source name</p>
            <p className="mt-1 text-sm text-[#EDEFFF]">{selectedSource.name}</p>

            <p className="mt-4 text-sm text-[#A8ADB8]">Source type</p>
            <p className="mt-1 text-sm text-[#EDEFFF]">{selectedSource.type}</p>

            <p className="mt-4 text-sm text-[#A8ADB8]">Current status</p>
            <p className="mt-1 text-sm text-[#EDEFFF]">
              {selectedSource.status}
            </p>

            <button
              type="button"
              onClick={() => setSelectedSource(null)}
              className="mt-6 min-h-11 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930]"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </>
  );
}
