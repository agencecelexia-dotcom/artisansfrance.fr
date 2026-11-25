import Link from "next/link";
import TextPage, { Missing, textMetadata } from "@/components/TextPage";
import { COMPANY, MATCHING_CRITERIA, OPS, SELECTION_CHECKS, confirmedChecks, confirmedCriteria, selectionPublishable } from "@/config/site";

const DESC = "Critères de mise en relation et de sélection des artisans, rémunération d'Artisans France, qualité des professionnels et règlement des litiges.";

// Page d'information des consommateurs imposée aux plateformes en ligne (Code de la consommation, L111-7 et D111-7).
// Elle reste en noindex tant que Thomas n'a pas confirmé les critères réellement appliqués.
export const metadata = textMetadata({ title: "Critères de classement et de sélection", description: DESC, path: "/classement-et-selection/", ready: selectionPublishable() });

export default function Page() {
  const criteria = confirmedCriteria();
  const checks = confirmedChecks();
  return (
    <TextPage
      title="Critères de classement et de sélection"
      path="/classement-et-selection/"
      about
      description={DESC}
      lead="Cette page vous informe, comme la loi l'exige des plateformes en ligne, de la manière dont vos demandes sont traitées et dont Artisans France est rémunéré."
    >
      {!selectionPublishable() && (
        <p>
          <Missing label="critères de mise en relation confirmés par Celexia, voir src/config/site.ts (MATCHING_CRITERIA)" />
        </p>
      )}

      <h2>Comment votre demande est traitée</h2>
      <p>Artisans France ne publie ni liste d'artisans à comparer, ni classement, ni note. Un conseiller Celexia étudie votre demande, puis la confie, avec votre accord, à un artisan sélectionné.</p>
      {criteria.length > 0 ? (
        <>
          <p>L'artisan est choisi selon :</p>
          <ul>
            {criteria.map((c) => (
              <li key={c.id}>{c.label}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          <Missing label={`critères réellement appliqués (${MATCHING_CRITERIA.map((c) => c.label.toLowerCase()).join(", ")})`} />
        </p>
      )}

      <h2>Notre rémunération</h2>
      <p>
        Le service est gratuit pour vous. {COMPANY.legalName} est rémunérée par l'artisan, sous forme de commission, uniquement si votre chantier est signé, dans le cadre d'un contrat d'apport d'affaires. Il s'agit d'un lien contractuel entre Celexia et les artisans partenaires.
      </p>

      <h2>Nombre d'artisans qui reçoivent votre demande</h2>
      <p>
        {OPS.artisansPerRequest ? (
          <>Votre demande est transmise à {OPS.artisansPerRequest} artisan{OPS.artisansPerRequest > 1 ? "s" : ""} au plus, avec votre accord.</>
        ) : (
          <Missing label="nombre d'artisans qui reçoivent chaque demande (OPS.artisansPerRequest)" />
        )}{" "}
        Nous ne promettons aucune exclusivité.
      </p>

      <h2>Qualité des professionnels</h2>
      {checks.length > 0 ? (
        <>
          <p>Avant de confier des demandes à un artisan, nous vérifions :</p>
          <ul>
            {checks.map((c) => (
              <li key={c.id}>{c.label}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          <Missing label={`vérifications effectivement réalisées parmi : ${SELECTION_CHECKS.map((c) => c.label.toLowerCase()).join(" ; ")}`} />
        </p>
      )}
      <p>Nous ne publions aucun avis ni aucune note sur les artisans. Si nous le faisions un jour, nous expliquerions ici comment les avis sont collectés et modérés.</p>

      <h2>Règlement des litiges</h2>
      <p>
        Le contrat de travaux est conclu entre vous et l'artisan. En cas de difficulté avec nous (traitement de votre demande, données personnelles), écrivez-nous :{" "}
        {COMPANY.contactEmail ? <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a> : <Missing label="e-mail de contact" />}. Vous pouvez aussi recourir gratuitement à un médiateur de la consommation :{" "}
        <Missing label="coordonnées du médiateur de la consommation de Celexia" />.
      </p>
      <p>
        Pour la suite de votre parcours, voir <Link href="/comment-ca-marche/">comment ça marche</Link> et notre <Link href="/politique-de-confidentialite/">politique de confidentialité</Link>.
      </p>
    </TextPage>
  );
}
