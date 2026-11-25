// Envoie une demande de test au webhook n8n (LEADS_WEBHOOK_URL du fichier .env) pour vérifier la chaîne complète :
// site -> n8n -> e-mail. Le message est clairement marqué « TEST » ; aucune donnée réelle.
//
// Usage : npm run test:webhook          (type « demande »)
//         npm run test:webhook candidature

const url = process.env.LEADS_WEBHOOK_URL;
const secret = process.env.LEADS_WEBHOOK_SECRET;
if (!url) {
  console.error("LEADS_WEBHOOK_URL est vide dans .env : renseignez l'URL de production du webhook n8n.");
  process.exit(1);
}

const kind = process.argv[2] === "candidature" ? "candidature" : "demande";
const base = { type: kind, receivedAt: new Date().toISOString(), contact: { prenom: "TEST", nom: "ARTISANS FRANCE", telephone: "0600000000", email: "test@example.com" } };
const payload =
  kind === "demande"
    ? { ...base, trade: "couvreur", travaux: "TEST : ne pas traiter", ampleur: "petit", codePostal: "77100", deptCode: "77", delai: "1mois", budget: "10-20k", statut: "proprietaire", consentement: { transmissionPartenaires: true, recueilliLe: base.receivedAt }, source: { url: "/test/", keyword: "test", deptCode: "77", ville: null }, qualification: { budgetConfirme: true, projetProche: true, auDessusDuSeuil: true, proprietaire: true, score: 4 }, couvert: false }
    : { ...base, entreprise: "TEST SARL", siren: "000000000", trade: "couvreur", departements: "77", message: "TEST : ne pas traiter" };

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...(secret ? { "X-Webhook-Secret": secret } : {}) },
  body: JSON.stringify(payload),
});
console.log(`Réponse du webhook : ${res.status} ${res.statusText}`);
if (res.ok) console.log("Vérifiez la boîte contact.artisansfrance@gmail.com : un e-mail « TEST » doit arriver.");
else console.log("Échec : vérifiez que le workflow est activé (URL de production), et que le secret X-Webhook-Secret est identique dans n8n.");
process.exit(res.ok ? 0 : 1);
