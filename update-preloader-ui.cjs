const fs = require('fs');
const path = require('path');

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
    
    // NEW PRELOADER HTML (MATCHES IMAGE)
    const newPreloader = `
    <div id="preloader">
        <div class="preloader-logo-img">
            <img src="${fusionLogo}" alt="FUSION MATRIX">
        </div>
        <div class="preloader-text">FUSION MATRIX</div>
    </div>`;
    
    content = content.replace(/<div id="preloader">[\s\S]*?<\/div>/, newPreloader);

    fs.writeFileSync(path.join(__dirname, page), content);
    console.log(`Updated preloader in ${page}`);
});
