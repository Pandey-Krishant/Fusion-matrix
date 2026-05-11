const fs = require('fs');
const path = require('path');

const domain = 'https://marketinvestopedia.com';
const fusionLogo = '/assets/fusion-logo.jpg';

const pages = [
    { raw: 'index_raw.html', out: 'index.html' },
    { raw: 'services_raw.html', out: 'services.html' },
    { raw: 'contact_raw.html', out: 'contact-us.html' },
    { raw: 'about_raw.html', out: 'about-us.html' },
    { raw: 'daily-market-insights_raw.html', out: 'daily-market-insights.html' },
    { raw: 'trade-recommendations_raw.html', out: 'trade-recommendations.html' },
    { raw: 'social-trading-and-bots_raw.html', out: 'social-trading-and-bots.html' },
    { raw: 'broker-assistance_raw.html', out: 'broker-assistance.html' },
    { raw: 'educational-packages_raw.html', out: 'educational-packages.html' },
    { raw: 'learning-market-resources_raw.html', out: 'learning-market-resources.html' },
    { raw: 'free-forex-signals_raw.html', out: 'free-forex-signals.html' },
    { raw: 'research-report_raw.html', out: 'research-report.html' },
    { raw: 'blogs_raw.html', out: 'blogs.html' },
    { raw: 'market-news_raw.html', out: 'market-news.html' }
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page.raw))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page.raw), 'utf8');
    
    // 1. Path Restoration for EVERYONE first
    content = content.replace(/(src|href|data-src|data-srcset)="(\/wp-content\/[^"]+)"/g, `$1="${domain}$2"`);
    content = content.replace(/(src|href|data-src|data-srcset)='(\/wp-content\/[^']+)'/g, `$1="${domain}$2"`);
    content = content.replace(/(src|href|data-src|data-srcset)="(\/wp-includes\/[^"]+)"/g, `$1="${domain}$2"`);
    
    // 2. SURGICAL LOGO REPLACEMENT
    content = content.replace(/class="footer-logo[^"]*"[^>]*data-src="[^"]*"/g, (match) => match.replace(/data-src="[^"]*"/, `data-src="${fusionLogo}"`));
    content = content.replace(/class="footer-logo[^"]*"[^>]*src="[^"]*"/g, (match) => match.replace(/src="[^"]*"/, `src="${fusionLogo}"`));

    const brandLogoPatterns = [/mi-logo-dark/g, /MI_Logo_New-02/g, /MI_Logo_02-1/g, /MI_logo/g];
    brandLogoPatterns.forEach(pattern => {
        content = content.replace(new RegExp(`(src|data-src|data-srcset)="[^"]*${pattern.source}[^"]*"`, 'g'), `$1="${fusionLogo}"`);
    });

    // 3. Metadata and Preloader
    content = content.replace(/rel="icon" href="[^"]*"/g, 'rel="icon" href="/assets/fusion-logo.jpg"');
    content = content.replace(/<title>.*?<\/title>/, '<title>FUSION MATRIX | Professional Trading Mentorship</title>');

    // 4. Link Localization
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
        'https://marketinvestopedia.com/': '/index.html'
    };
    Object.keys(linkMap).forEach(key => {
        content = content.replace(new RegExp(key, 'g'), linkMap[key]);
    });

    // 5. Inject Local Assets
    const localAssets = `<link rel="stylesheet" href="/src/style.css">\n<script type="module" src="/src/main.js"></script>`;
    content = content.replace('</head>', `${localAssets}\n</head>`);

    // 6. Preloader Injection
    const preloader = `
    <div id="preloader">
        <div class="preloader-content">
            <div class="preloader-logo-img"><img src="${fusionLogo}" alt="Fusion Matrix" style="width: 150px; border-radius: 50%; box-shadow: 0 0 30px #C5A059;"></div>
            <div class="preloader-bar-container"><div class="preloader-bar"></div></div>
            <div class="preloader-text">FUSION MATRIX | Loading Excellence...</div>
        </div>
    </div>`;
    if (!content.includes('id="preloader"')) {
        content = content.replace(/(<body[^>]*>)/, `$1\n${preloader}`);
    }

    fs.writeFileSync(path.join(__dirname, page.out), content);
    console.log(`Surgically branded ${page.out}`);
});
