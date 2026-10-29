"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersToolbar } from "./users-toolbar";
import { UsersTable } from "./users-table";
import { ApproveAnalystModal } from "./approve-analyst-modal";
import { PendingAnalystsTable } from "./pending-analysts-table";
import { initialUsers, type WorkspaceUser } from "./user-types";
import {
  approveAnalyst,
  getPendingAnalysts,
  type PendingAnalyst,
} from "@/lib/api/users";

export function UsersAccess() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [members] = useState<WorkspaceUser[]>(initialUsers);
  const [pendingUsers, setPendingUsers] = useState<PendingAnalyst[]>([]);

  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAnalyst, setSelectedAnalyst] = useState<PendingAnalyst | null>(
    null,
  );
  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const result = await getPendingAnalysts();
      setPendingUsers(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load pending analysts.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchPendingUsers() {
      try {
        const result = await getPendingAnalysts();

        if (!cancelled) {
          setPendingUsers(result);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load pending analysts.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchPendingUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [members, search]);

  const filteredPendingUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pendingUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [pendingUsers, search]);

  // async function handleApprove(user: PendingAnalyst) {
  //   const confirmed = window.confirm(
  //     `Approve ${user.fullName}? They will be able to sign in after approval.`,
  //   );

  //   if (!confirmed) return;

  //   setApprovingId(user.id);
  //   setError("");
  //   setSuccess("");

  //   try {
  //     await approveAnalyst(user.id);

  //     setPendingUsers((current) =>
  //       current.filter((item) => item.id !== user.id),
  //     );

  //     setSuccess(`${user.fullName} has been approved successfully.`);
  //   } catch (err) {
  //     setError(
  //       err instanceof Error ? err.message : "Unable to approve this analyst.",
  //     );
  //   } finally {
  //     setApprovingId(null);
  //   }
  // }

  async function handleApprove(user: PendingAnalyst) {
    setSelectedAnalyst(user);
  }
  async function confirmApproval() {
    if (!selectedAnalyst || approvingId !== null) return;

    const user = selectedAnalyst;

    setApprovingId(user.id);
    setError("");
    setSuccess("");

    try {
      await approveAnalyst(user.id);

      setPendingUsers((current) =>
        current.filter((item) => item.id !== user.id),
      );

      setSelectedAnalyst(null);
      setSuccess(`${user.fullName} has been approved successfully.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to approve this analyst.",
      );
    } finally {
      setApprovingId(null);
    }
  }
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Users &amp; access
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Review analyst registrations and manage workspace access.
        </p>
      </header>

      <UsersToolbar
        search={search}
        onSearchChange={setSearch}
        onAddUser={() => router.push("/admin/add-user")}
        onPermissions={() => router.push("/admin/role-permissions")}
      />

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}

          <button
            type="button"
            onClick={() => void loadUsers()}
            disabled={loading}
            className="ml-3 underline disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-[#34E89A]/30 bg-[#34E89A]/10 p-4 text-sm text-[#34E89A]"
        >
          {success}
        </div>
      )}

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Workspace members
        </h2>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          {filteredMembers.length} member
          {filteredMembers.length === 1 ? "" : "s"}
        </p>

        <div className="mt-4">
          <UsersTable
            users={filteredMembers}
            onManage={(user) => router.push(`/admin/manage-user/${user.id}`)}
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium text-[#EDEFFF]">
              Pending analyst registrations
            </h2>

            <p className="mt-2 text-sm text-[#A8ADB8]">
              {loading
                ? "Loading registrations..."
                : `${filteredPendingUsers.length} pending registration${
                    filteredPendingUsers.length === 1 ? "" : "s"
                  }`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadUsers()}
            disabled={loading}
            className="rounded-lg border border-[#393943] px-4 py-2 text-sm text-[#EDEFFF] transition hover:bg-[#292930] disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="py-10 text-center text-sm text-[#A8ADB8]">
              Loading analysts...
            </p>
          ) : (
            <PendingAnalystsTable
              users={filteredPendingUsers}
              onApprove={handleApprove}
              approvingId={approvingId}
            />
          )}
        </div>
      </section>
      <ApproveAnalystModal
        isOpen={selectedAnalyst !== null}
        analystName={selectedAnalyst?.fullName ?? ""}
        isApproving={approvingId !== null}
        onCancel={() => {
          if (approvingId === null) {
            setSelectedAnalyst(null);
          }
        }}
        onConfirm={() => void confirmApproval()}
      />
    </div>
  );
}
