const fs = require('fs');
const glob = require('glob');

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // very naive check for TextNodes inside View
  // we'll look for `<View` followed eventually by `>` then look for non-< non-whitespace characters
  const regex = /<View[^>]*>(\s*[^<\{\s][^<]+)</g;
  let match;
  while ((match = regex.exec(content)) !== null) {
      console.log(`Found text node in ${filePath}:`, match[1].trim());
  }
}

const files = glob.sync('src/**/*.tsx').concat(glob.sync('app/**/*.tsx'));
files.forEach(scanFile);
