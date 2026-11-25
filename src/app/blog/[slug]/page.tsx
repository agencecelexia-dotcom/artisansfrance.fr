import EditorialView, { editorialMetadata } from "@/components/EditorialView";
import { pagesOfType } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("blog").map((p) => ({ slug: p.url.split("/").filter(Boolean)[1] }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return editorialMetadata(`/blog/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <EditorialView url={`/blog/${slug}/`} />;
}
