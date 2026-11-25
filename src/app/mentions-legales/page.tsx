import TextPage, { Missing, textMetadata } from "@/components/TextPage";
import { COMPANY, SITE, legalComplete } from "@/config/site";

const DESC = "Éditeur, directeur de la publication, hébergeur et informations légales d'Artisans France.";

export const metadata = textMetadata({ title: "Mentions légales", description: DESC, path: "/mentions-legales/", ready: legalComplete() });

export default function Page() {
  return (
    <TextPage title="Mentions légales" path="/mentions-legales/" lead="Informations sur l'éditeur et l'hébergeur du site.">
      <h2>Éditeur du site</h2>
      <p>
        {SITE.name} est un service édité par <strong>{COMPANY.legalName}</strong>, société par actions simplifiée unipersonnelle.
      </p>
      <ul>
        <li>SIREN : {COMPANY.siren ?? <Missing label="SIREN" />}</li>
        <li>Siège social : {COMPANY.address ?? <Missing label="adresse du siège" />}</li>
        <li>Directeur de la publication : {COMPANY.publicationDirector ?? <Missing label="directeur de la publication" />}</li>
        <li>
          Contact : {COMPANY.contactEmail ? <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a> : <Missing label="e-mail de contact" />}
          {COMPANY.phone ? ` · ${COMPANY.phone}` : ""}
        </li>
      </ul>

      <h2>Hébergeur</h2>
      <p>
        {COMPANY.host}
        {COMPANY.hostAddress ? `, ${COMPANY.hostAddress}` : null}
        {!COMPANY.hostAddress && (
          <>
            {" "}
            <Missing label="adresse de l'hébergeur" />
          </>
        )}
      </p>

      <h2>Nature du service</h2>
      <p>
        {SITE.name} est un service d'apport d'affaires : il met en relation des particuliers avec des artisans sélectionnés. Le site ne réalise pas de travaux. Le contrat de travaux est conclu directement entre le client et l'artisan.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, le graphisme et la structure du site sont protégés. Toute reproduction sans autorisation écrite de l'éditeur est interdite, sauf courte citation avec mention de la source.
      </p>

      <h2>Données et sources</h2>
      <p>
        Les données géographiques et de population viennent de l'API Découpage administratif d'Etalab. Les ventes immobilières viennent de la base « Demandes de valeurs foncières » (DGFiP, publiée sur data.gouv.fr). Les risques naturels et technologiques viennent de la base GASPAR, Géorisques. Les volumes de recherche viennent de Google France, mesurés par DataForSEO. Ces données sont indicatives, datées, et citées avec leur source sur chaque page qui les utilise.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les guides publiés sur le site donnent des informations générales : ils ne remplacent ni la visite d'un professionnel ni les conseils d'un avocat, d'un architecte ou d'un assureur. Les liens vers des sites externes sont fournis à titre d'information.
      </p>
    </TextPage>
  );
}
