const fs = require('fs');
const path = require('path');

const domain = 'https://marketinvestopedia.com';
const fusionLogo = '/assets/fusion-logo.jpg';
const originalGreen = '#0eb290';

const pages = [
    { raw: 'index.html', out: 'index.html' },
    { raw: 'services.html', out: 'services.html' },
    { raw: 'contact-us.html', out: 'contact-us.html' },
    { raw: 'about-us.html', out: 'about-us.html' },
    { raw: 'daily-market-insights.html', out: 'daily-market-insights.html' },
    { raw: 'trade-recommendations.html', out: 'trade-recommendations.html' },
    { raw: 'social-trading-and-bots.html', out: 'social-trading-and-bots.html' },
    { raw: 'broker-assistance.html', out: 'broker-assistance.html' },
    { raw: 'educational-packages.html', out: 'educational-packages.html' },
    { raw: 'learning-market-resources.html', out: 'learning-market-resources.html' },
    { raw: 'free-forex-signals.html', out: 'free-forex-signals.html' },
    { raw: 'research-report.html', out: 'research-report.html' },
    { raw: 'blogs.html', out: 'blogs.html' },
    { raw: 'market-news.html', out: 'market-news.html' }
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page.raw))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page.raw), 'utf8');
    
    // 1. Restore the ORIGINAL Preloader style (Black/Green)
    const preloaderStyle = `
    <style>
        #preloader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 999999; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.5s ease; }
        .preloader-logo-img img { width: 120px; margin-bottom: 20px; }
        .preloader-bar-container { width: 250px; height: 3px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; }
        .preloader-bar { width: 0; height: 100%; background: ${originalGreen}; animation: load 1.5s forwards; }
        .preloader-text { color: #fff; margin-top: 10px; font-size: 12px; letter-spacing: 2px; opacity: 0.6; }
        @keyframes load { 0% { width: 0; } 100% { width: 100%; } }
    </style>`;
    
    content = content.replace(/<style>[\s\S]*?<\/style>/, preloaderStyle);
    
    // 2. Ensure Preloader HTML is the simple one
    const preloaderHtml = `
    <div id="preloader">
        <div class="preloader-logo-img"><img src="${fusionLogo}" alt="FUSION MATRIX"></div>
        <div class="preloader-bar-container"><div class="preloader-bar"></div></div>
        <div class="preloader-text">FUSION MATRIX | LOADING</div>
    </div>`;
    
    content = content.replace(/<div id="preloader">[\s\S]*?<\/div>/, preloaderHtml);

    fs.writeFileSync(path.join(__dirname, page.out), content);
    console.log(`Reverted to stable branding in ${page.out}`);
});
