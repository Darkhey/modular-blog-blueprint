import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const downloadsDir = join(process.cwd(), 'public', 'downloads');
const files = readdirSync(downloadsDir);

function formatSize(bytes) {
  if (bytes < 1024) {
    return '1 KB';
  } else if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const sizes = {};
for (const file of files) {
  const stats = statSync(join(downloadsDir, file));
  sizes[file] = formatSize(stats.size);
}

const content = `export const downloadSizes = ${JSON.stringify(sizes, null, 2)} as Record<string, string>\n`;
writeFileSync('src/data/downloadSizes.ts', content);
console.log('downloadSizes.ts generated');
