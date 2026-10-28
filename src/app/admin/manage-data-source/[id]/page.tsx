import { notFound } from "next/navigation";
import { ManageDataSource } from "@/components/(admin)/data-sources/manage-data-source";
import { initialDataSources } from "@/components/(admin)/data-sources/data-source-types";

export default async function ManageDataSourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const source = initialDataSources.find((item) => item.id === id);

  if (!source) {
    notFound();
  }

  return <ManageDataSource key={source.id} source={source} />;
}
