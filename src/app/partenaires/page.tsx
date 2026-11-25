import TextPage, { textMetadata } from "@/components/TextPage";
import { PARTNERS } from "@/config/site";
import { TRADES } from "@/content/trades";

const DESC = "Liste des artisans partenaires auxquels une demande peut être transmise, avec l'accord du particulier.";

export const metadata = textMetadata({ title: "Liste des artisans partenaires", description: DESC, path: "/partenaires/" });

export default function Page() {
  return (
    <TextPage title="Liste des artisans partenaires" path="/partenaires/" lead="Votre demande n'est transmise qu'à des artisans de cette liste, avec votre accord.">
      {PARTNERS.length === 0 ? (
        <>
          <p>Aucun artisan partenaire n'est encore déclaré. Tant que cette liste est vide, aucune demande n'est transmise à un artisan.</p>
          <p>Cette liste est mise à jour à chaque nouveau contrat d'apport d'affaires signé, avant toute transmission de demande à l'artisan concerné.</p>
        </>
      ) : (
        <table className="w-full text-left text-[0.95rem]">
          <caption className="sr-only">Artisans partenaires</caption>
          <thead>
            <tr className="border-b border-sable-300">
              <th className="py-2 pr-4">Entreprise</th>
              <th className="py-2 pr-4">Métiers</th>
              <th className="py-2">Départements</th>
            </tr>
          </thead>
          <tbody>
            {PARTNERS.map((p) => (
              <tr key={p.name} className="border-b border-sable-200 align-top">
                <td className="py-2 pr-4 font-semibold">{p.name}</td>
                <td className="py-2 pr-4">{p.trades.map((t) => TRADES[t]?.nom ?? t).join(", ")}</td>
                <td className="py-2">{p.departments.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Votre droit d'opposition</h2>
      <p>Vous pouvez à tout moment retirer votre accord et vous opposer à la transmission de vos données à un artisan partenaire, en écrivant à l'adresse indiquée dans la politique de confidentialité.</p>
    </TextPage>
  );
}
