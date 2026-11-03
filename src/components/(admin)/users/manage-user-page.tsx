// "use client";

// import { useRouter } from "next/navigation";
// import { ManageUserForm } from "./manage-user-form";
// import type { WorkspaceUser } from "./user-types";

// export function ManageUserPage({ user }: { user: WorkspaceUser }) {
//   const router = useRouter();

//   return (
//     <ManageUserForm
//       user={user}
//       onSave={() => {
//         // Backend persistence will be added during API integration.
//         router.push("/admin/users-and-access");
//       }}
//       onDeactivate={() => {
//         router.push(`/admin/deactivate-user/${user.id}`);
//       }}
//       onCancel={() => router.push("/admin/users-and-access")}
//     />
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deactivateMember, updateMemberStatus } from "@/lib/api/users";
import type { WorkspaceUser } from "./user-types";
import { ManageUserForm } from "./manage-user-form";

type Props = {
  user: WorkspaceUser;
};

export function ManageUserPage({ user }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(updatedUser: WorkspaceUser) {
    setSaving(true);
    setError("");

    try {
      await updateMemberStatus(
        updatedUser.id,
        updatedUser.status === "Active" ? "ACTIVE" : "DEACTIVATED",
      );
      router.push("/admin/users-and-access");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save member access.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(selectedUser: WorkspaceUser) {
    setSaving(true);
    setError("");

    try {
      await deactivateMember(selectedUser.id);
      router.push("/admin/users-and-access");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to deactivate member.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <ManageUserForm
        user={user}
        onSave={handleSave}
        onDeactivate={handleDeactivate}
        onCancel={() => router.push("/admin/users-and-access")}
        saving={saving}
      />
    </div>
  );
}
