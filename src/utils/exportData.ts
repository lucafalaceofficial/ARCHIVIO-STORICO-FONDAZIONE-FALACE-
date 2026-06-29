// Utilità di esportazione dati istituzionali AIC e Blueprint del Sito
import { exportSiteToXml } from './xmlExporter';

export function downloadBackupXml() {
  exportSiteToXml();
}

export function downloadBackupXmlReal() {
  exportSiteToXml();
}

export function downloadSiteBlueprint() {
  const content = JSON.stringify({
    foundation: "Fondazione Falace delle AIC",
    version: "2.4.0-synchronized",
    timestamp: new Date().toISOString(),
    chapters: 16,
    status: "Verified & Immutable"
  }, null, 2);

  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AIC_Site_Blueprint_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSiteBlueprintTxt() {
  const content = `===================================================================
FONDAZIONE FALACE - BLUEPRINT STRUTTURALE SITO AIC
===================================================================
Data Esportazione: ${new Date().toUTCString()}
Protocollo Sincronicità: 9 Livelli Operativi
Autenticazione: Verbatim Blockchain & Deposito UIBM

Indice dei 16 Capitoli Istituzionali:
1. Hero, Origini e Fondazione
2. Teoria AIC (9 Livelli)
3. Biblioteca Digitale (50 Libri)
4. Pinacoteca e Collezione Falace (250 Opere)
5. Brevetti UIBM e 41 Invenzioni
6. Armonizzazione Acustica 432 Hz
7. Archivio Documentari e TV
8. Imprenditorialità e Riconoscimenti
9. CERN & Zenodo Repository
10. Storia della Dinastia Falace
11. Dipartimenti di Ricerca AIC
12. SocialHub e Community
13. Polo Museale Virtuale
14. Etica e Tutela Copyright
15. Progetti Futuri & HUMANA HUB
16. Esportazione Integrale e Contatti
===================================================================`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AIC_Site_Blueprint_${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
