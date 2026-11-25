import EditorialView, { editorialMetadata } from "@/components/EditorialView";
import { pagesOfType } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("probleme")
    .filter((p) => p.url.startsWith("/guides/"))
    .map((p) => ({ slug: p.url.split("/").filter(Boolean)[1] }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return editorialMetadata(`/guides/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <EditorialView url={`/guides/${slug}/`} />;
}
