const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Fix content: \\;
content = content.replace(/content: \\\\;/g, 'content: "";');

fs.writeFileSync(cssPath, content);
console.log('CSS Fixed: Content property restored');
