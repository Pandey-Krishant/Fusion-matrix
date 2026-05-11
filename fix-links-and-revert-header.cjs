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

const linkMap = {
    '/services/': '/services.html',
    '/contact-us/': '/contact-us.html',
    '/about-us/': '/about-us.html',
    '/services/daily-market-insights/': '/daily-market-insights.html',
    '/services/trade-recommendations/': '/trade-recommendations.html',
    '/services/social-trading-and-bots/': '/social-trading-and-bots.html',
    '/broker-assistance/': '/broker-assistance.html',
    '/services/educational-packages/': '/educational-packages.html',
    '/learning-market-resources/': '/learning-market-resources.html',
    '/free-forex-signals/': '/free-forex-signals.html',
    '/research-report/': '/research-report.html',
    '/blogs/': '/blogs.html',
    '/market-news/': '/market-news.html',
};

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. FIX THE LINKS (ROBUST VERSION)
    // First, convert absolute domain links to relative
    Object.keys(linkMap).forEach(original => {
        const local = linkMap[original];
        // Match domain + original (with or without trailing slash)
        const regex1 = new RegExp(`href="${domain}${original.slice(0, -1)}/?"`, 'g');
        const regex2 = new RegExp(`href="${original.slice(0, -1)}/?"`, 'g');
        content = content.replace(regex1, `href="${local}"`);
        content = content.replace(regex2, `href="${local}"`);
    });

    // Special case for root
    content = content.replace(new RegExp(`href="${domain}/?"`, 'g'), 'href="/index.html"');
    content = content.replace(/href="\/"/g, 'href="/index.html"');

    // 2. RESTORE ORIGINAL HEADER STYLE (Purge our overrides)
    // We do this by simply letting the original CSS handle it, but we need to ensure the logo fits.
    
    // 3. LOGO REPLACEMENT (Surgical)
    const brandLogos = [/mi-logo-dark/g, /MI_Logo_New-02/g, /MI_Logo_02-1/g, /MI_logo_Color/g];
    brandLogos.forEach(pattern => {
        content = content.replace(new RegExp(`(src|data-src|data-srcset)="[^"]*${pattern.source}[^"]*"`, 'g'), `$1="${fusionLogo}"`);
    });

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Localized links and restored branding in ${page}`);
});
