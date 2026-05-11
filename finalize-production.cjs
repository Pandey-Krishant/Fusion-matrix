const fs = require('fs');
const path = require('path');

const domain = 'https://marketinvestopedia.com';
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
    let content = fs.readFileSync(path.join(__dirname, page.raw), 'utf8');
    
    // Localize Brand Assets
    content = content.replace(/https:\/\/marketinvestopedia\.com\/wp-content\/uploads\/2021\/08\/MI_Logo_New-02-scaled\.png/g, '/assets/logo.png');
    content = content.replace(/https:\/\/marketinvestopedia\.com\/wp-content\/uploads\/2021\/08\/cropped-MI_logo-32x32\.webp/g, '/assets/favicon.webp');
    
    // Add "Personal" Lead Capture logic placeholder
    // We'll map "Get In Touch" buttons to a specific ID for our JS
    content = content.replace(/href="\/contact-us\.html"/g, 'href="#" class="elementskit-btn contact-trigger"');

    fs.writeFileSync(path.join(__dirname, page.out), content);
    console.log(`Finalized ${page.out} for production.`);
});
