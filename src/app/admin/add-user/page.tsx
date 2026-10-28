"use client";

import { useRouter } from "next/navigation";
import { AddUserForm } from "@/components/(admin)/users/add-user-form";

export default function AddUserPage() {
  const router = useRouter();

  function handleGrant(
    email: string,
    role: "Administrator" | "Analyst" | "Viewer",
  ) {
    // TODO: Connect to the backend invitation API.
    // For now, return to Users & Access after submission.
    console.log("New user invitation:", { email, role });

    router.push("/admin/users-and-access");
  }

  return (
    <AddUserForm
      onGrant={handleGrant}
      onCancel={() => router.push("/admin/users-and-access")}
    />
  );
}
