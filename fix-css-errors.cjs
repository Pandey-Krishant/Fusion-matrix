const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Fix the unclosed strings and backslash issues caused by PowerShell escaping
content = content.replace(/font-family: " Outfit\\, sans-serif !important;/g, "font-family: 'Outfit', sans-serif !important;");
content = content.replace(/font-family: \\Outfit\\, sans-serif !important;/g, "font-family: 'Outfit', sans-serif !important;");
content = content.replace(/font-family: \\Roboto\\, sans-serif !important;/g, "font-family: 'Roboto', sans-serif !important;");

// General cleanup for any other accidental backslashes in font-family
content = content.replace(/font-family: \\(.*?)\\,/g, "font-family: '$1',");

fs.writeFileSync(cssPath, content);
console.log('CSS Syntax Errors Fixed');
