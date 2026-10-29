import { Check } from "lucide-react";
import type { PendingAnalyst } from "@/lib/api/users";

type PendingAnalystsTableProps = {
  users: PendingAnalyst[];
  onApprove: (user: PendingAnalyst) => void;
  approvingId: string | null;
};

export function PendingAnalystsTable({
  users,
  onApprove,
  approvingId,
}: PendingAnalystsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left">
        <thead>
          <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
            {["Analyst", "Date registered", "Status", "Action"].map(
              (heading) => (
                <th
                  key={heading}
                  className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-sm text-[#EDEFFF]">
              <td className="px-3 py-4">
                <p>{user.fullName}</p>
                <p className="mt-1 text-xs text-[#A8ADB8]">{user.email}</p>
              </td>

              <td className="px-3 py-4 text-[#B7B9CB]">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </td>

              <td className="px-3 py-4">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                  Pending
                </span>
              </td>

              <td className="px-3 py-4">
                <button
                  type="button"
                  onClick={() => onApprove(user)}
                  disabled={approvingId !== null}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#34E89A] px-3 py-2 font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Check size={15} />
                  {approvingId === user.id ? "Approving..." : "Approve"}
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-3 py-10 text-center text-[#A8ADB8]">
                No pending analysts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
