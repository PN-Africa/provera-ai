import { notFound } from "next/navigation";
import { getWorkspaceMemberById } from "@/lib/api/users";
import { DeactivateUserPage } from "@/components/(admin)/users/deactivate-user-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  let user;

  try {
    user = await getWorkspaceMemberById(id);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Workspace member not found."
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <DeactivateUserPage
      user={{
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role === "ADMIN" ? "Administrator" : "Analyst",
        status: user.status === "ACTIVE" ? "Active" : "Inactive",
        lastActive: user.lastActive,
      }}
    />
  );
}
