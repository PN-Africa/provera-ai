"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersToolbar } from "./users-toolbar";
import { UsersTable } from "./users-table";
import { getWorkspaceMembers, type WorkspaceMember } from "@/lib/api/users";

export function UsersAccess() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<WorkspaceMember[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const membersResponse = await getWorkspaceMembers();
      setMembers(membersResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const membersResponse = await getWorkspaceMembers();

        if (!cancelled) {
          setMembers(membersResponse.data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load users.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [members, search]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Users &amp; access
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          Analysts can sign in as soon as they sign up. Deactivate an analyst
          to end their sessions and block sign-in.
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

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium text-[#EDEFFF]">Analysts</h2>

            <p className="mt-2 text-sm text-[#A8ADB8]">
              {loading
                ? "Loading analysts..."
                : `${filteredMembers.length} analyst${
                    filteredMembers.length === 1 ? "" : "s"
                  } shown`}
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
            <UsersTable
              users={filteredMembers}
              onManage={(user) => router.push(`/admin/manage-user/${user.id}`)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
