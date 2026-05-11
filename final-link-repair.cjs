const fs = require('fs');
const path = require('path');

const pages = [
    'index.html', 'services.html', 'contact-us.html', 'about-us.html',
    'daily-market-insights.html', 'trade-recommendations.html', 'social-trading-and-bots.html',
    'broker-assistance.html', 'educational-packages.html', 'learning-market-resources.html',
    'free-forex-signals.html', 'research-report.html', 'blogs.html', 'market-news.html'
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. FIX THE DOUBLE-LINK BUG (e.g., /index.htmlservices.html)
    // This removes the accidental prefix added by previous replacements
    content = content.replace(/\/index\.html([a-zA-Z0-9_-]+\.html)/g, '/$1');
    content = content.replace(/\/index\.html([a-zA-Z0-9_-]+\/)/g, '/$1'); // Handles subfolders
    
    // 2. ENSURE CLEAN SERVICES LINK
    content = content.replace(/href="\/services\.html"/g, 'href="services.html"');
    content = content.replace(/href="\/index\.html"/g, 'href="index.html"');
    
    // 3. FINAL CLEANUP FOR SERVICES DROPDOWN
    // In your HTML, line 508 had href="/index.htmlservices.html"
    content = content.replace(/href="\/index\.htmlservices\.html"/g, 'href="services.html"');

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Cleaned up links in ${page}`);
});
