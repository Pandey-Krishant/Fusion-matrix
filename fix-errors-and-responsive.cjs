const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Fix the CSS Syntax Error (Unclosed string and backslash)
content = content.replace(/\.main-navigation ul li a\[href=" \/index\.html\\],/g, '.main-navigation ul li a[href="/index.html"],');
// Handle possible variations if the above exact match fails
content = content.replace(/a\[href=" \/index\.html\\/g, 'a[href="/index.html"');

// 2. Add RESPONSIVE Design Layer
const responsiveLayer = `
/* ============================================================
   RESPONSIVE DESIGN LAYER (ALL DEVICES)
   ============================================================ */

/* Tablet & Smaller Desktops */
@media (max-width: 1024px) {
    #site-header {
        padding: 0 20px !important;
        height: 70px !important;
    }
    .main-navigation ul {
        gap: 15px !important;
    }
    .main-navigation ul li a {
        font-size: 12px !important;
    }
}

/* Mobile Devices */
@media (max-width: 768px) {
    #site-header {
        height: 60px !important;
        justify-content: space-between !important;
        padding: 0 15px !important;
    }
    
    header img {
        max-height: 40px !important;
    }

    /* Adjust Preloader for Mobile */
    .preloader-title {
        font-size: 20px !important;
        letter-spacing: 6px !important;
    }
    .preloader-logo {
        width: 100px !important;
        height: 100px !important;
    }
    .preloader-text {
        bottom: 80px !important;
        font-size: 12px !important;
    }
}

/* Fix for overlapping elements on small screens */
.elementor-section { overflow: hidden !important; }
img { max-width: 100%; height: auto; }
`;

fs.writeFileSync(cssPath, content + responsiveLayer);
console.log('CSS Errors Fixed & Responsive Layer Applied');
