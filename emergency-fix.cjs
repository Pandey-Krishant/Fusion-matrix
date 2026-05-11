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
    
    // 1. FIX THE BROKEN PATHS (e.g. /index.htmlwp-content/)
    content = content.replace(/\/index\.htmlwp-(content|includes)/g, '/wp-$1');
    content = content.replace(/\/services\.htmlwp-(content|includes)/g, '/wp-$1');
    content = content.replace(/\/contact-us\.htmlwp-(content|includes)/g, '/wp-$1');
    
    // 2. Ensure ALL wp-content and wp-includes are ABSOLUTE to the original domain
    content = content.replace(/(src|href|data-src|data-srcset)="\/wp-(content|includes)\//g, `$1="${domain}/wp-$2/`);
    content = content.replace(/(src|href|data-src|data-srcset)='\/wp-(content|includes)\//g, `$1='${domain}/wp-$2/`);

    // 3. SURGICAL LOGO REPLACEMENT (Only the brand logo)
    const brandLogos = [
        /mi-logo-dark/g,
        /MI_Logo_New-02/g,
        /MI_Logo_02-1/g,
        /MI_logo_Color/g
    ];
    brandLogos.forEach(pattern => {
        content = content.replace(new RegExp(`(src|data-src|data-srcset)="[^"]*${pattern.source}[^"]*"`, 'g'), `$1="${fusionLogo}"`);
    });
    
    // Also replace class="footer-logo" specifically
    content = content.replace(/class="footer-logo[^"]*"[^>]*data-src="[^"]*"/g, (match) => match.replace(/data-src="[^"]*"/, `data-src="${fusionLogo}"`));
    content = content.replace(/class="footer-logo[^"]*"[^>]*src="[^"]*"/g, (match) => match.replace(/src="[^"]*"/, `src="${fusionLogo}"`));

    // 4. Link Localization (CAREFLY)
    // Only localize the main nav and known links
    content = content.replace(/href="https:\/\/marketinvestopedia\.com\/services\/"/g, 'href="/services.html"');
    content = content.replace(/href="https:\/\/marketinvestopedia\.com\/contact-us\/"/g, 'href="/contact-us.html"');
    content = content.replace(/href="https:\/\/marketinvestopedia\.com\/about-us\/"/g, 'href="/about-us.html"');
    content = content.replace(/href="https:\/\/marketinvestopedia\.com\/"/g, 'href="/index.html"');

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Fixed paths and logos in ${page}`);
});
