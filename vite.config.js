import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact-us.html'),
        about: resolve(__dirname, 'about-us.html'),
        daily_insights: resolve(__dirname, 'daily-market-insights.html'),
        trade_recs: resolve(__dirname, 'trade-recommendations.html'),
        social_trading: resolve(__dirname, 'social-trading-and-bots.html'),
        broker_assist: resolve(__dirname, 'broker-assistance.html'),
        edu_packages: resolve(__dirname, 'educational-packages.html'),
        resources: resolve(__dirname, 'learning-market-resources.html'),
        signals: resolve(__dirname, 'free-forex-signals.html'),
        research: resolve(__dirname, 'research-report.html'),
        blogs: resolve(__dirname, 'blogs.html'),
        news: resolve(__dirname, 'market-news.html'),
      },
    },
  },
});
