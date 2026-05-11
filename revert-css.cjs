const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// The original file ended with a media query for om-campaign-1
const cutoffMarker = '/* Force images to show */';
const cutoffMarker2 = '/* SENIOR DEVELOPER UI OVERLAYS */';
const cutoffMarker3 = '/* REPLICA ESSENTIALS */';
const cutoffMarker4 = '/* PRELOADER STYLES */';
const cutoffMarker5 = '/* FUSION MATRIX BRAND THEME */';

const markers = [cutoffMarker, cutoffMarker2, cutoffMarker3, cutoffMarker4, cutoffMarker5];
let lowestIndex = content.length;

markers.forEach(marker => {
    const idx = content.indexOf(marker);
    if (idx >= 0 && idx < lowestIndex) {
        lowestIndex = idx;
    }
});

content = content.substring(0, lowestIndex);

// Add ONLY the visibility fix for lazy loading (crucial for display)
content += `
/* ESSENTIAL VISIBILITY FIXES */
.lazy { opacity: 1 !important; visibility: visible !important; }
.elementor-invisible { visibility: visible !important; animation: none !important; }
.elementor-background-video-container { opacity: 1 !important; }
img { max-width: 100%; height: auto; }
`;

fs.writeFileSync(cssPath, content);
console.log('CSS Reverted to Original Aesthetic');
