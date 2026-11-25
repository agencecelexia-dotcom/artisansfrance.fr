import { SECTIONS, entriesFor, urlsetXml, type Section } from "@/lib/sitemap";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: `${s}.xml` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const name = section.replace(/\.xml$/, "") as Section;
  if (!SECTIONS.includes(name)) return new Response("Not found", { status: 404 });
  return new Response(urlsetXml(entriesFor(name)), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
