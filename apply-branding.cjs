const fs = require('fs');
const path = require('path');

const newName = 'FUSION MATRIX';
const oldName = 'Market Investopedia';

const pages = [
    'index.html', 'services.html', 'contact-us.html', 'about-us.html',
    'daily-market-insights.html', 'trade-recommendations.html', 'social-trading-and-bots.html',
    'broker-assistance.html', 'educational-packages.html', 'learning-market-resources.html',
    'free-forex-signals.html', 'research-report.html', 'blogs.html', 'market-news.html'
];

const preloaderHtml = `
    <!-- PREMIUM PRELOADER -->
    <div id="preloader">
        <div class="preloader-content">
            <div class="preloader-logo">${newName}</div>
            <div class="preloader-bar-container">
                <div class="preloader-bar"></div>
            </div>
            <div class="preloader-text">Loading Excellence...</div>
        </div>
    </div>
`;

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. Rename Brand
    content = content.replace(new RegExp(oldName, 'g'), newName);
    
    // 2. Inject Preloader HTML
    if (content.includes('<body')) {
        content = content.replace(/(<body[^>]*>)/, `$1\n${preloaderHtml}`);
    }

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Branded and added preloader to ${page}`);
});
