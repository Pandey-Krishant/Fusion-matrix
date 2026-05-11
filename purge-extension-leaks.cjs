const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let lines = fs.readFileSync(cssPath, 'utf8').split('\n');

// Filter out any lines containing chrome-extension: or BinancePlex
const filteredLines = lines.filter(line => !line.includes('chrome-extension:') && !line.includes('BinancePlex'));

fs.writeFileSync(cssPath, filteredLines.join('\n'));
console.log('Purged Chrome Extension leaks from CSS');
