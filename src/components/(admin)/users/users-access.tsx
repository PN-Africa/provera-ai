"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersToolbar } from "./users-toolbar";
import { UsersTable } from "./users-table";
import { initialUsers } from "./user-types";

export function UsersAccess() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Users &amp; access
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Manage members, roles and access to the workspace.
        </p>
      </header>

      <UsersToolbar
        search={search}
        onSearchChange={setSearch}
        onAddUser={() => router.push("/admin/add-user")}
        onPermissions={() => router.push("/admin/role-permissions")}
      />

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Workspace members
        </h2>
        <p className="mt-3 text-sm text-[#A8ADB8]">
          {initialUsers.filter((user) => user.status === "Active").length}{" "}
          active members · Showing {filteredUsers.length} example records
        </p>

        <div className="mt-4">
          <UsersTable
            users={filteredUsers}
            onManage={(user) => router.push(`/admin/manage-user/${user.id}`)}
          />
        </div>

        <p className="mt-4 text-sm leading-6 text-[#A8ADB8]">
          Keep at least one active administrator. Deactivating a user removes
          access but retains their activity history.
        </p>
      </section>
    </div>
  );
}
