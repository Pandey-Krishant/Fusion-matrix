const fs = require('fs');
const path = require('path');

const fusionLogo = '/assets/fusion-logo.jpg';

const pages = [
    'index.html', 'services.html', 'contact-us.html', 'about-us.html',
    'daily-market-insights.html', 'trade-recommendations.html', 'social-trading-and-bots.html',
    'broker-assistance.html', 'educational-packages.html', 'learning-market-resources.html',
    'free-forex-signals.html', 'research-report.html', 'blogs.html', 'market-news.html'
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. PURGE ALL PREVIOUS INJECTIONS (Be aggressive)
    // Remove all style blocks we added
    content = content.replace(/<style>[\s\S]*?#preloader[\s\S]*?<\/style>/g, '');
    // Remove all preloader divs we added
    content = content.replace(/<div id="preloader">[\s\S]*?<\/div>/g, '');
    
    // 2. INJECT THE ONE PERFECT EXPERT PRELOADER
    const expertPreloader = `
    <div id="preloader">
        <div class="preloader-content">
            <div class="preloader-logo"></div>
            <div class="preloader-title">FUSION MATRIX</div>
            <div class="preloader-bar-wrap">
                <div class="preloader-bar-fill"></div>
            </div>
        </div>
    </div>`;
    
    // Insert right after <body>
    content = content.replace(/<body[^>]*>/, (match) => match + expertPreloader);

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Sanitized and upgraded HTML in ${page}`);
});
