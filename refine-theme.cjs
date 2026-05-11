const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const markers = [
    '/* FUSION MATRIX BRAND THEME */',
    '/* PRELOADER STYLES */',
    '/* REPLICA ESSENTIALS */',
    '/* Force images to show */'
];

markers.forEach(marker => {
    const index = content.indexOf(marker);
    if (index >= 0) {
        content = content.substring(0, index);
    }
});

const refinedTheme = `
/* FUSION MATRIX PREMIUM THEME */
:root {
  --fusion-gold: #C5A059;
  --fusion-dark: #0a1d2f;
}

#preloader {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: var(--fusion-dark);
  display: flex; justify-content: center; align-items: center;
  z-index: 999999; transition: opacity 0.8s ease;
}

.preloader-bar { width: 0; height: 4px; background: var(--fusion-gold); animation: load 2s forwards; }
@keyframes load { 0% { width: 0; } 100% { width: 300px; } }

/* Surgical Branding UI Fixes */
.lazy { opacity: 1 !important; visibility: visible !important; }
img.custom-logo, .footer-logo img { filter: drop-shadow(0 0 5px rgba(197, 160, 89, 0.4)); }

/* Professional Scroll Trigger Logic */
.elementor-invisible { visibility: visible !important; }
`;

fs.writeFileSync(cssPath, content + refinedTheme);
console.log('CSS Cleaned and Refined Theme Applied');
