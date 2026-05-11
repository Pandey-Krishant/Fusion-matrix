const fs = require('fs');
const path = require('path');

const newName = 'FUSION MATRIX';
const oldName1 = 'Azdan Invest';
const oldName2 = 'Market Investopedia';

const pages = [
    'index.html', 'services.html', 'contact-us.html', 'about-us.html',
    'daily-market-insights.html', 'trade-recommendations.html', 'social-trading-and-bots.html',
    'broker-assistance.html', 'educational-packages.html', 'learning-market-resources.html',
    'free-forex-signals.html', 'research-report.html', 'blogs.html', 'market-news.html'
];

pages.forEach(page => {
    if (!fs.existsSync(path.join(__dirname, page))) return;
    
    let content = fs.readFileSync(path.join(__dirname, page), 'utf8');
    
    // 1. Replace all variations of the brand name
    content = content.replace(new RegExp(oldName1, 'g'), newName);
    content = content.replace(new RegExp(oldName2, 'g'), newName);
    
    // 2. Fix the preloader logo specifically
    content = content.replace(/<div class="preloader-logo">.*?<\/div>/, `<div class="preloader-logo">${newName}</div>`);

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Updated branding to ${newName} in ${page}`);
});
