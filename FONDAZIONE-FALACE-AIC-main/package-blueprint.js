import fs from 'fs';
import path from 'path';

const IGNORED_DIRS = ['node_modules', 'dist', '.git', '.next', '.gradle'];
const ALLOWED_EXTENTIONS = ['.ts', '.tsx', '.json', '.css', '.html', '.example'];
const IGNORED_FILES = ['siteBlueprint.ts', 'package-lock.json', 'site_replica_blueprint.json'];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.some(ignored => relativePath.startsWith(ignored) || file === ignored)) {
        walkDir(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (
        ALLOWED_EXTENTIONS.includes(ext) &&
        !IGNORED_FILES.includes(file) &&
        !relativePath.includes('dist/')
      ) {
        fileList.push(relativePath);
      }
    }
  }
  return fileList;
}

try {
  console.log('Generating site blueprint...');
  const files = walkDir(process.cwd());
  const blueprint = {
    appName: "Fondazione Falace Portal",
    exportedAt: new Date().toISOString(),
    files: {}
  };

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    // Ensure we use positive slashes for relative paths regardless of OS
    const normalizedPath = file.replace(/\\/g, '/');
    blueprint.files[normalizedPath] = content;
  }

  // Generate src/utils/siteBlueprint.ts
  const outputFilePath = path.join(process.cwd(), 'src', 'utils', 'siteBlueprint.ts');
  const dirPath = path.dirname(outputFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const exportContent = `// Automatically generated file. Do not edit manually.
export const SITE_BLUEPRINT = ${JSON.stringify(blueprint, null, 2)};
`;

  fs.writeFileSync(outputFilePath, exportContent, 'utf-8');
  console.log(`Blueprint successfully written to ${outputFilePath} with ${files.length} files.`);
} catch (error) {
  console.error('Failed to generate blueprint:', error);
  process.exit(1);
}
