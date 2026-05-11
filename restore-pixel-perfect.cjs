const fs = require('fs');
const path = require('path');

const domain = 'https://marketinvestopedia.com';
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

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page.raw))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page.raw), 'utf8');
    
    // 1. Path Restoration (Global)
    content = content.replace(/(src|href|data-src|data-srcset)="(\/wp-content\/[^"]+)"/g, `$1="${domain}$2"`);
    content = content.replace(/(src|href|data-src|data-srcset)='(\/wp-content\/[^']+)'/g, `$1="${domain}$2"`);
    content = content.replace(/(src|href|data-src|data-srcset)="(\/wp-includes\/[^"]+)"/g, `$1="${domain}$2"`);
    content = content.replace(/(src|href|data-src|data-srcset)='(\/wp-includes\/[^']+)'/g, `$1="${domain}$2"`);
    
    // 2. Link Localization
    Object.keys(linkMap).forEach(original => {
        const local = linkMap[original];
        // Replace absolute version
        const absRegex = new RegExp(domain + original.replace(/\//g, '\\/'), 'g');
        content = content.replace(absRegex, local);
        // Replace relative version (if any)
        const relRegex = new RegExp('href="' + original.replace(/\//g, '\\/') + '"', 'g');
        content = content.replace(relRegex, 'href="' + local + '"');
    });

    // 3. Inject Local Styles and Scripts
    const localAssets = `
    <!-- LOCAL REPLICA ASSETS -->
    <link rel="stylesheet" href="/src/style.css">
    <script type="module" src="/src/main.js"></script>
    `;
    if (content.includes('</head>')) {
        content = content.replace('</head>', `${localAssets}\n</head>`);
    }

    // 4. Cleanup Intrusive Third-Party Scripts
    const junkPatterns = [
        /<script[^>]*optimonk\.com[^>]*><\/script>/gi,
        /<script[^>]*googletagmanager\.com[^>]*><\/script>/gi,
        /<iframe[^>]*optimonk[^>]*><\/iframe>/gi
    ];
    junkPatterns.forEach(pattern => {
        content = content.replace(pattern, '<!-- removed junk -->');
    });

    // 5. Force Visibility Overrides
    const visibilityCss = `
    <style>
        .elementor-invisible { visibility: visible !important; animation: none !important; }
        img.lazy { opacity: 1 !important; visibility: visible !important; }
        .elementor-background-video-container { opacity: 1 !important; }
    </style>
    `;
    if (content.includes('</head>')) {
        content = content.replace('</head>', `${visibilityCss}\n</head>`);
    }

    fs.writeFileSync(path.join(__dirname, page.out), content);
    console.log(`Successfully restored ${page.out} to pixel-perfect state.`);
});
