const fs = require('fs');
const path = require('path');

const domain = 'https://marketinvestopedia.com';
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
    
    // 1. FIX THE "PAGES NOT LOADING" BUG
    // Ensure links are RELATIVE to the root (no leading slash needed for Vite in many cases)
    // Actually, for Vite dev server, /services.html is correct, but let's make sure they are not double-slashed
    content = content.replace(/href="\/\/+/g, 'href="/');
    
    // 2. RESTORE ORIGINAL TEXT ON IMAGES (Hero Section)
    // The user wants it exactly like the original site.
    content = content.replace(/Trade Smarter with Expert Market Insights & Trading Education/g, 'Trade Smarter with Expert Market Insights & Trading Education');
    // Ensure no accidental FM rebranding in the middle of sentences
    content = content.replace(/FUSION MATRIX provides beginner-friendly/g, 'Market Investopedia provides beginner-friendly');
    
    // 3. REMOVE CUSTOM HEADER & PREPARE TRANSPARENT OVERLAY
    // We do this via CSS, but we can add a class to the header for targeting
    content = content.replace(/id="site-header"/g, 'id="site-header" class="transparent-header"');

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Functional fix and text restoration in ${page}`);
});
