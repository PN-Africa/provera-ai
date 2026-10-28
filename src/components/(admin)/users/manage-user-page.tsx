"use client";

import { useRouter } from "next/navigation";
import { ManageUserForm } from "./manage-user-form";
import type { WorkspaceUser } from "./user-types";

export function ManageUserPage({ user }: { user: WorkspaceUser }) {
  const router = useRouter();

  return (
    <ManageUserForm
      user={user}
      onSave={() => {
        // Backend persistence will be added during API integration.
        router.push("/admin/users-and-access");
      }}
      onDeactivate={() => {
        router.push(`/admin/deactivate-user/${user.id}`);
      }}
      onCancel={() => router.push("/admin/users-and-access")}
    />
  );
}
