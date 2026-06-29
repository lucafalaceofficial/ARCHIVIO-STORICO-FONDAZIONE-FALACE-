import fs from 'fs';
import path from 'path';

function countPages(pdfPath: string): number {
    try {
        const data = fs.readFileSync(pdfPath);
        // Look for occurrences of "/Type/Page" or "/Type /Page" or "/Page\b"
        let count = 0;
        let pos = 0;
        const searchStr1 = '/Type/Page';
        const searchStr2 = '/Type /Page';
        
        const contentStr = data.toString('utf8');
        
        // Count searchStr1
        let index1 = contentStr.indexOf(searchStr1);
        while (index1 !== -1) {
            count++;
            index1 = contentStr.indexOf(searchStr1, index1 + 1);
        }
        
        // Count searchStr2
        let index2 = contentStr.indexOf(searchStr2);
        while (index2 !== -1) {
            count++;
            index2 = contentStr.indexOf(searchStr2, index2 + 1);
        }
        
        if (count === 0) {
            // Fallback: search count of "/Page"
            let index3 = contentStr.indexOf('/Page');
            while (index3 !== -1) {
                count++;
                index3 = contentStr.indexOf('/Page', index3 + 1);
            }
        }
        
        return count;
    } catch (e: any) {
        console.error("Error reading " + pdfPath + ": " + e.message);
        return -1;
    }
}

const dir = './public';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.pdf')) {
        const fullPath = path.join(dir, file);
        const size = fs.statSync(fullPath).size;
        console.log(`File: ${file}, Size: ${size} bytes`);
    }
});
