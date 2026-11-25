import type { Metadata } from "next";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { Container, Updated } from "./Ui";
import { CONTENT_UPDATED } from "@/config/site";
import { INDEXING_ON } from "@/config/publication";
import { aboutPageLd, buildMetadata, type JsonLdObject } from "@/lib/seo";

/** Valeur obligatoire manquante : visible dans le texte et bloque l'indexation de la page. */
export function Missing({ label }: { label: string }) {
  return <mark className="rounded-sm bg-terre-100 px-1.5 py-0.5 font-semibold text-terre-700">[à renseigner : {label}]</mark>;
}

export function textMetadata(opts: { title: string; description: string; path: string; ready?: boolean }): Metadata {
  return buildMetadata({ title: opts.title, description: opts.description, path: opts.path, index: INDEXING_ON && (opts.ready ?? true) });
}

interface Props {
  title: string;
  path: string;
  lead?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  about?: boolean;
  extraLd?: JsonLdObject[];
  updated?: string;
}

/** Page de texte (confiance, légal) : fil d'Ariane, titre, corps éditorial. */
export default function TextPage({ title, path, lead, description, children, about, extraLd, updated = CONTENT_UPDATED }: Props) {
  return (
    <>
      <section className="bg-sable-100">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="mt-5 max-w-[24ch] text-4xl font-extrabold sm:text-5xl">{title}</h1>
          {lead && <div className="mt-4 max-w-[62ch] text-lg text-texte-doux">{lead}</div>}
        </Container>
      </section>
      <Container className="py-12">
        <div className="texte max-w-[68ch]">{children}</div>
        <Updated date={updated} />
      </Container>
      {about && description && <JsonLd data={aboutPageLd({ name: title, description, path })} />}
      {extraLd && <JsonLd data={extraLd} />}
    </>
  );
}
