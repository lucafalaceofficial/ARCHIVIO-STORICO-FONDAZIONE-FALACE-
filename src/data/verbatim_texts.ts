import { ARCHIVIO_STORICO_PAGES } from './archivioStoricoPdf';
export const VERBATIM_PDF1_TEXT = ARCHIVIO_STORICO_PAGES.slice(0, 5).map(p => p.content).join('\n\n');
export const VERBATIM_PDF2_TEXT = ARCHIVIO_STORICO_PAGES.slice(5, 10).map(p => p.content).join('\n\n');
export const VERBATIM_PDF3_TEXT = ARCHIVIO_STORICO_PAGES.slice(10, 15).map(p => p.content).join('\n\n');
