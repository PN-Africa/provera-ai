"use client";

import { useState } from "react";

export type ActivityEvent = {
  id: string;
  date: string;
  actor: string;
  event: string;
  result: string;
};

type ActivityTableProps = {
  events: ActivityEvent[];
};

const PAGE_SIZE = 20;

export function ActivityTable({ events }: ActivityTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEvents = events.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
              {["Date & time", "Actor", "Event", "Result"].map((heading) => (
                <th
                  key={heading}
                  className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedEvents.map((item) => (
              <tr key={item.id} className="text-sm text-[#EDEFFF]">
                <td className="whitespace-nowrap px-3 py-4">{item.date}</td>
                <td className="px-3 py-4">{item.actor}</td>
                <td className="px-3 py-4">{item.event}</td>
                <td className="px-3 py-4 text-[#34E89A]">{item.result}</td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-10 text-center text-sm text-[#A8ADB8]"
                >
                  No activity matches your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {events.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#B7B9CB]">
          <span>
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGE_SIZE, events.length)} of {events.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-[#393943] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-[#393943] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
