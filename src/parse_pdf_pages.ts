import fs from 'fs';

function findCount(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    // Find '/Type' and '/Pages' or directly check the PDF properties
    const content = data.toString('binary');
    const counts: number[] = [];
    const regex = /\/Count\s*(\d+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      counts.push(parseInt(match[1], 10));
    }
    console.log(`${filePath}: found counts:`, counts, "max count:", counts.length ? Math.max(...counts) : 'none');
  } catch (e: any) {
    console.error(`Error reading ${filePath}:`, e.message);
  }
}

const files = [
  'public/PDF1_Origini_e_Famiglia_Dinastia_Falace_Verbatim.pdf',
  'public/PDF2_Patrimonio_Brevettuale_Falace_Verbatim.pdf',
  'public/PDF3_Scheda_Invenzione_Aeromassaggiatore_Verbatim.pdf',
  'public/PDF_Dossier_Luca_Falace_2005_2025.pdf',
  'public/PDF_Paolo_Falace_Biografia_Certificata.pdf'
];

for (const f of files) {
  findCount(f);
}
