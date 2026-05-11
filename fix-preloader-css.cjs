const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Fix the corrupted preloader background line
content = content.replace(/url\(\" \/assets\/hero-bg\.jpg\\\)/g, 'url("/assets/hero-bg.jpg")');
content = content.replace(/url\(\"\/assets\/hero-bg\.jpg\\\)/g, 'url("/assets/hero-bg.jpg")');

fs.writeFileSync(cssPath, content);
console.log('CSS Fixed: Preloader background restored');
