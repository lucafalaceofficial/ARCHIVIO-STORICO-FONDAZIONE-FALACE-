// Gestione archiviazione locale PDF per il portale istituzionale AIC
export interface StoredPdfRecord {
  id: string;
  name: string;
  dataUrl: string;
  timestamp: number;
}

const STORAGE_KEY = 'aic_stored_pdfs_archive';

export function storePDF(id: string, name: string, dataUrl: string): boolean {
  try {
    const existing = getStoredRecords();
    const updated = [...existing.filter(item => item.id !== id), { id, name, dataUrl, timestamp: Date.now() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.warn("Spazio di archiviazione locale esaurito per i file PDF:", e);
    return false;
  }
}

export function getPDF(id: string): StoredPdfRecord | null {
  try {
    const existing = getStoredRecords();
    return existing.find(item => item.id === id) || null;
  } catch (e) {
    return null;
  }
}

export function deletePDF(id: string): boolean {
  try {
    const existing = getStoredRecords();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

function getStoredRecords(): StoredPdfRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
