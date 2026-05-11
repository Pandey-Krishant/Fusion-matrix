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
    
    // Convert all local links to ABSOLUTE ROOT paths for Vercel stability
    // e.g., href="services.html" -> href="/services.html"
    pages.forEach(p => {
        const regex = new RegExp(`href="${p}"`, 'g');
        content = content.replace(regex, `href="/${p}"`);
        
        // Also fix any double slashes that might occur
        content = content.replace(new RegExp(`href="//${p}"`, 'g'), `href="/${p}"`);
    });

    // Special fix for the Home link
    content = content.replace(/href="index\.html"/g, 'href="/"');

    fs.writeFileSync(path.join(__dirname, page), content);
});
console.log('Standardized all links to absolute root paths for Vercel compatibility.');
