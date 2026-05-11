const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Find the start of our overrides
const startMarker = '/* Force images to show */';
const originalStyle = content.substring(0, content.indexOf(startMarker));

const cleanOverrides = `
/* REPLICA ESSENTIALS */
.lazy { opacity: 1 !important; visibility: visible !important; }
img { max-width: 100%; height: auto; }

/* REFINED INTERACTIVITY - Subtle enough not to break layout */
.elementskit-btn {
  transition: all 0.3s ease-out !important;
}
.elementskit-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* Fix Hero Video centering */
.elementor-background-video-hosted {
    object-fit: cover;
    width: 100% !important;
    height: 100% !important;
}
`;

fs.writeFileSync(cssPath, originalStyle + cleanOverrides);
console.log('CSS Sanitized for pixel-perfection');
