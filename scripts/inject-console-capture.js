import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function findHtmlFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function injectScript(filePath) {
  let content = readFileSync(filePath, 'utf8');
  
  // Skip if script already exists
  if (content.includes('dashboard-console-capture.js')) {
    return false;
  }
  
  // Try to inject before </head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${SCRIPT_TAG}\n  </head>`);
    writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  // Try to inject before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', `  ${SCRIPT_TAG}\n  </body>`);
    writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
const distDir = join(process.cwd(), 'dist');
const htmlFiles = findHtmlFiles(distDir);

let injectedCount = 0;
htmlFiles.forEach(file => {
  if (injectScript(file)) {
    console.log(`✓ Injected console capture script into: ${file}`);
    injectedCount++;
  }
});

console.log(`\nConsole capture script injection complete. Modified ${injectedCount} file(s).`);