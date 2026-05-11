import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMobileMenu();
  initCounters();
  initLeadCapture();
  
  // Force visibility for lazy elements
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
  }, 1000);
});

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.visibility = 'hidden';
        }, 800);
      }, 1500); 
    });
  }
}

function initMobileMenu() {
  const hamburger = document.querySelector('.elementskit-menu-hamburger');
  const menuContainer = document.querySelector('.elementskit-menu-container');
  const overlay = document.querySelector('.elementskit-menu-overlay');
  const closeBtn = document.querySelector('.elementskit-menu-close');

  if (hamburger && menuContainer) {
    const toggleMenu = (isOpen) => {
      menuContainer.classList.toggle('elementskit-menu-offcanvas-elements-open', isOpen);
      if (overlay) {
        overlay.style.display = isOpen ? 'block' : 'none';
        overlay.style.opacity = isOpen ? '1' : '0';
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
    if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.elementor-counter-number');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-to-value'));
    if (isNaN(target)) return;
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = Math.ceil(obj.val);
          }
        });
      }
    });
  });
}

function initLeadCapture() {
  const contactTriggers = document.querySelectorAll('.contact-trigger, .elementor-button-link[href*="contact"]');
  contactTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (trigger.getAttribute('href').startsWith('#') || trigger.classList.contains('contact-trigger')) {
        e.preventDefault();
        const telegramLink = 'https://t.me/your_telegram_username?text=Hi! I am interested in FUSION MATRIX services.';
        window.open(telegramLink, '_blank');
      }
    });
  });
}

console.log('FUSION MATRIX - Restored Stable Engine');
