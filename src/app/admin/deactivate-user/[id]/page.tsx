import { notFound } from "next/navigation";

import { initialUsers } from "@/components/(admin)/users/user-types";
import { DeactivateUserPage } from "@/components/(admin)/users/deactivate-user-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = initialUsers.find((member) => member.id === id);

  if (!user) notFound();

  return <DeactivateUserPage user={user} />;
}
