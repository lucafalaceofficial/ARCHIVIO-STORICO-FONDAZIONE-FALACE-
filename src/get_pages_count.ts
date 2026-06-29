import fs from 'fs';

function inspectPdf(pdfPath: string) {
    try {
        const data = fs.readFileSync(pdfPath);
        const dataStr = data.toString('utf8', 0, Math.min(data.length, 500000)); // Sample first 500kb
        
        // Let's find matches of /Count followed by numbers
        const regex = /\/Count\s+(\d+)/g;
        let match;
        const counts: number[] = [];
        while ((match = regex.exec(dataStr)) !== null) {
            counts.push(parseInt(match[1], 10));
        }
        
        console.log(`PDF: ${pdfPath}`);
        console.log(`Counts found:`, counts);
        
        const countPagesRegex = /\/Type\s*\/Page\b/g;
        const pageMatches = dataStr.match(countPagesRegex);
        console.log(`Page types count:`, pageMatches ? pageMatches.length : 0);
    } catch (e: any) {
        console.error("Error inspecting PDF:", e.message);
    }
}

inspectPdf('./public/PDF_Dossier_Luca_Falace_2005_2025.pdf');
