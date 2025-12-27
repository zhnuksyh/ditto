import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.join(__dirname, '..');
const readmePath = path.join(rootDir, 'README.md');
const packageJsonPath = path.join(rootDir, 'package.json');

// Get Data
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;
const date = new Date().toUTCString();

let lastCommitMsg = 'Unknown';
let lastCommitHash = 'Unknown';

try {
    lastCommitMsg = execSync('git log -1 --pretty=%B').toString().trim();
    lastCommitHash = execSync('git log -1 --pretty=%h').toString().trim();
} catch (e) {
    console.warn('Could not get git info', e);
}

// Format Output
const statusContent = `
| 📅 Last Updated | 🏷️ Version | 🔨 Latest Commit |
| :--- | :--- | :--- |
| ${date} | v${version} | [\`${lastCommitHash}\`](https://github.com/zhnuksyh/ditto/commit/${lastCommitHash}) - ${lastCommitMsg} |
`;

// Update README
const readmeContent = fs.readFileSync(readmePath, 'utf-8');
const startMarker = '<!-- START_SECTION:status -->';
const endMarker = '<!-- END_SECTION:status -->';

const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
const newContent = readmeContent.replace(regex, `${startMarker}\n${statusContent}\n${endMarker}`);

fs.writeFileSync(readmePath, newContent);

console.log('README.md updated with latest status');
