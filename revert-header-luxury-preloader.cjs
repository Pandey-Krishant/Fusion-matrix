const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Remove the "Ultimate Professional Header" block and everything after
const startMarker = '/* ULTIMATE PROFESSIONAL HEADER */';
const startIndex = content.indexOf(startMarker);
if (startIndex >= 0) {
    content = content.substring(0, startIndex);
}

// 2. Add the NEW Minimal Premium Branding
const minimalPremium = `
/* MINIMAL PREMIUM BRANDING */
#site-header {
  background: #ffffff !important; 
  height: 85px !important;
  border-bottom: 1px solid rgba(0,0,0,0.05) !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05) !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

header img, .custom-logo-link img {
  max-height: 60px !important;
  width: auto !important;
  display: block !important;
}

.main-navigation ul li a {
  color: #333 !important; 
  font-weight: 600 !important;
}

/* MINIMAL LUXURY PRELOADER */
#preloader {
  background: #ffffff !important;
  z-index: 999999;
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  transition: opacity 0.5s ease;
}

.preloader-logo-img img {
  width: 120px !important;
  animation: pulseLogo 2s infinite ease-in-out;
}

.preloader-text {
  bottom: 150px !important;
  font-size: 16px !important;
  color: #333 !important;
  letter-spacing: 5px !important;
  font-weight: 400 !important;
  font-family: 'Outfit', sans-serif !important;
}

@keyframes pulseLogo {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}
`;

fs.writeFileSync(cssPath, content + minimalPremium);
console.log('Header Reverted and Luxury Preloader Applied');
