import fs from 'fs';
import { jsPDF } from 'jspdf';

// Since we have jspdf, let's see how many pages are in our PDF files. Or wait, let's write a node snippet to get length
const files = [
  'PDF1_Origini_e_Famiglia_Dinastia_Falace_Verbatim.pdf',
  'PDF2_Patrimonio_Brevettuale_Falace_Verbatim.pdf',
  'PDF3_Scheda_Invenzione_Aeromassaggiatore_Verbatim.pdf',
  'PDF_Dossier_Luca_Falace_2005_2025.pdf',
  'PDF_Paolo_Falace_Biografia_Certificata.pdf'
];

for (const file of files) {
  const p = `./public/${file}`;
  if (fs.existsSync(p)) {
     const data = fs.readFileSync(p);
     // Find occurrences of /Type /Page (and /Type/Page)
     const contentStr = data.toString('utf8');
     let count = 0;
     let idx = contentStr.indexOf('/Type\s*/Page');
     // Regex match count of /Type\s*\/Page
     const matches = contentStr.match(/\/Type\s*\/Page\b/g);
     const count1 = matches ? matches.length : 0;
     const matches2 = contentStr.match(/\/Count\s+(\d+)/g);
     console.log(`${file}: length=${data.length} bytes, type/page regex=${count1}, count tags=${matches2}`);
  } else {
     console.log(`${file} does not exist`);
  }
}
