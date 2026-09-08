import { redirect } from "next/navigation";

export default async function RepertoireWinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/vins/${slug}`);
}
