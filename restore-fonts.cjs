const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
const fonts = `
/* TYPOGRAPHY RESTORATION */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap');
body, p, a, li, span { font-family: 'Roboto', sans-serif !important; }
h1, h2, h3, h4, h5, h6, .elementor-heading-title { font-family: 'Outfit', sans-serif !important; }
`;

fs.appendFileSync(cssPath, fonts);
console.log('Typography Restored');
