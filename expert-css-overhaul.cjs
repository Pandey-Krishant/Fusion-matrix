const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 1. COMPLETELY PURGE ALL PREVIOUS APPENDS
// I know my appends always start after the original file content.
// The original file ended near "om-campaign-1" or similar.
const originalEndMarker = '.om-campaign-1'; 
const index = content.indexOf(originalEndMarker);
if (index >= 0) {
    const endOfSelector = content.indexOf('}', index) + 1;
    content = content.substring(0, endOfSelector);
}

// 2. APPLY THE "FRONTEND EXPERT" PREMIUM LAYER
const expertLayer = `
/* ============================================================
   FRONTEND EXPERT PREMIUM BRANDING LAYER
   ============================================================ */

/* 1. Global Reset & Performance */
.lazy { opacity: 1 !important; visibility: visible !important; }
.elementor-invisible { visibility: visible !important; animation: none !important; }

/* 2. Professional Header Restoration */
#site-header {
    background: #ffffff !important;
    height: 80px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 40px !important;
    box-shadow: 0 2px 15px rgba(0,0,0,0.08) !important;
    border-bottom: 1px solid #eee !important;
    position: sticky !important;
    top: 0;
    z-index: 1000 !important;
}

header img, .custom-logo-link img {
    max-height: 50px !important;
    width: auto !important;
    display: block !important;
}

.main-navigation ul {
    display: flex !important;
    gap: 25px !important;
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

.main-navigation ul li a {
    color: #111 !important;
    font-weight: 600 !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 14px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    transition: color 0.3s ease !important;
}

.main-navigation ul li a:hover {
    color: #0eb290 !important;
}

/* 3. Luxury High-End Preloader */
#preloader {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: #0a0a0a !important;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.preloader-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.preloader-logo {
    width: 150px;
    height: 150px;
    background: url('/assets/fusion-logo.jpg') no-repeat center;
    background-size: cover;
    border-radius: 20px;
    box-shadow: 0 0 40px rgba(197, 160, 89, 0.2);
    animation: pulseExpert 2s infinite ease-in-out;
}

.preloader-title {
    font-family: 'Outfit', sans-serif !important;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 12px;
    text-transform: uppercase;
    margin-top: 20px;
}

.preloader-bar-wrap {
    width: 200px;
    height: 2px;
    background: rgba(255,255,255,0.1);
    margin-top: 10px;
    overflow: hidden;
}

.preloader-bar-fill {
    width: 0;
    height: 100%;
    background: #C5A059;
    animation: loadExpert 1.8s forwards;
}

@keyframes pulseExpert {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.05); filter: brightness(1.2); }
}

@keyframes loadExpert {
    0% { width: 0; }
    100% { width: 100%; }
}

/* 4. Professional Button Refinement */
.elementor-button-link {
    background: #C5A059 !important;
    border-radius: 8px !important;
    padding: 14px 28px !important;
    transition: all 0.3s ease !important;
    font-family: 'Outfit', sans-serif !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
}

.elementor-button-link:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(197, 160, 89, 0.4) !important;
}
`;

fs.writeFileSync(cssPath, content + expertLayer);
console.log('Frontend Expert Premium Layer Applied');
