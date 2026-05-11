const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Fix the corrupted font-family line
content = content.replace(/font-family: \" Inter\\,/g, 'font-family: \"Inter\",');
content = content.replace(/font-family: \"Inter\\,/g, 'font-family: \"Inter\",');

fs.writeFileSync(cssPath, content);
console.log('CSS fixed successfully');
