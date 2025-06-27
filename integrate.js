const fs = require('fs');
const path = require('path');

// Directory to fetch files from
const currentFolder = __dirname;

// Output file
const outputFile = path.join(currentFolder, 'integrated-output.txt');

// Function to fetch and integrate files
function integrateFiles(folder) {
  const files = fs.readdirSync(folder);
  let integratedContent = '';

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const content = fs.readFileSync(filePath, 'utf-8');
      integratedContent += `\n/* File: ${file} */\n${content}\n`;
    } else if (stats.isDirectory()) {
      integratedContent += integrateFiles(filePath); // Recursive for subdirectories
    }
  });

  return integratedContent;
}

// Write integrated content to output file
const integratedContent = integrateFiles(currentFolder);
fs.writeFileSync(outputFile, integratedContent, 'utf-8');

console.log(`All files have been integrated into ${outputFile}`);