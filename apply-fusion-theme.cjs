const fs = require('fs');
const path = require('path');

const gold = '#C5A059';
const black = '#050505';
const white = '#FFFFFF';

const pages = [
    'index.html', 'services.html', 'contact-us.html', 'about-us.html',
    'daily-market-insights.html', 'trade-recommendations.html', 'social-trading-and-bots.html',
    'broker-assistance.html', 'educational-packages.html', 'learning-market-resources.html',
    'free-forex-signals.html', 'research-report.html', 'blogs.html', 'market-news.html'
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. Update Favicon and Metadata Images
    content = content.replace(/rel="icon" href="[^"]*"/g, 'rel="icon" href="/assets/fusion-logo.jpg"');
    content = content.replace(/rel="apple-touch-icon" href="[^"]*"/g, 'rel="apple-touch-icon" href="/assets/fusion-logo.jpg"');
    content = content.replace(/<meta property="og:image" content="[^"]*">/g, '<meta property="og:image" content="/assets/fusion-logo.jpg">');
    
    // 2. Update Header/Footer Logos
    // Look for original logo paths and replace with our new one
    content = content.replace(/https:\/\/marketinvestopedia\.com\/wp-content\/uploads\/[^\s"']+/g, '/assets/fusion-logo.jpg');
    content = content.replace(/\/assets\/logo\.png/g, '/assets/fusion-logo.jpg');
    
    // 3. Update Preloader Logo to be the actual image
    content = content.replace(/<div class="preloader-logo">.*?<\/div>/, `<div class="preloader-logo-img"><img src="/assets/fusion-logo.jpg" alt="Fusion Matrix" style="width: 150px; border-radius: 50%; box-shadow: 0 0 30px ${gold};"></div>`);

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Applied Fusion Theme to ${page}`);
});
