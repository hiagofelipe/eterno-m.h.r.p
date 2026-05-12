/* ==========================================================================
   O ETERNO MHRP — Interactions
   ========================================================================== */

(() => {
  'use strict';

  // --------------------- Year in footer ---------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --------------------- Navbar on scroll ---------------------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --------------------- Mobile menu ---------------------
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');

  const closeMenu = () => {
    if (!burger || !navMobile) return;
    if (!navMobile.classList.contains('open')) return;
    burger.setAttribute('aria-expanded', 'false');
    navMobile.classList.add('closing');
    setTimeout(() => {
      navMobile.classList.remove('open', 'closing');
      navMobile.setAttribute('aria-hidden', 'true');
    }, 340);
  };
  const toggleMenu = () => {
    if (!burger || !navMobile) return;
    const open = burger.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
    } else {
      navMobile.classList.remove('closing');
      burger.setAttribute('aria-expanded', 'true');
      navMobile.classList.add('open');
      navMobile.setAttribute('aria-hidden', 'false');
    }
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // --------------------- Pillars accordion (single-open, smooth) ---------------------
  const pilares = document.querySelectorAll('.pilar');
  pilares.forEach((pilar, idx) => {
    const head = pilar.querySelector('.pilar-head');
    if (!head) return;
    head.addEventListener('click', () => {
      const isOpen = pilar.classList.contains('open');
      // Close all
      pilares.forEach(p => {
        p.classList.remove('open');
        const h = p.querySelector('.pilar-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      // Open this one unless it was the one already open
      if (!isOpen) {
        pilar.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
    // Open the first one on load by default on desktop only
    if (idx === 0 && window.matchMedia('(min-width: 961px)').matches) {
      pilar.classList.add('open');
      head.setAttribute('aria-expanded', 'true');
    }
  });

  // --------------------- FAQ accordion (multi-open) ---------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, idx) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    if (idx === 0) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // --------------------- Reveal on scroll ---------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // --------------------- Hero load-in staggered ---------------------
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add('loaded');
      hero.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    });
  }

  // --------------------- Count-up for stats ---------------------
  const countEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && countEls.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1400;
        const start = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * easeOut(t)).toString();
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = target.toString();
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    countEls.forEach(el => cio.observe(el));
  }

  // --------------------- Smooth anchor offset ---------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --------------------- Founder countdown (encerra 10/06/2026) ---------------------
  const cdDeadline = new Date('2026-06-10T23:59:59-03:00');
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  if (cdDays && cdHours && cdMins && cdSecs) {
    const pad = n => String(Math.max(0, n)).padStart(2, '0');
    const updateCountdown = () => {
      const diff = cdDeadline - Date.now();
      if (diff <= 0) {
        [cdDays, cdHours, cdMins, cdSecs].forEach(el => { el.textContent = '00'; });
        return;
      }
      cdDays.textContent  = pad(Math.floor(diff / 86400000));
      cdHours.textContent = pad(Math.floor(diff % 86400000 / 3600000));
      cdMins.textContent  = pad(Math.floor(diff % 3600000  / 60000));

      const newSec = pad(Math.floor(diff % 60000 / 1000));
      if (cdSecs.textContent !== newSec) {
        cdSecs.classList.remove('tick');
        void cdSecs.offsetWidth; // reflow para reiniciar animação
        cdSecs.classList.add('tick');
        cdSecs.textContent = newSec;
      }
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --------------------- Subtle parallax on hero mark ---------------------
  const mark = document.querySelector('.hero-mark img');
  if (mark && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 600);
      mark.style.transform = `translateY(${y * 0.08}px) scale(${1 - y * 0.0003})`;
      mark.style.opacity = String(Math.max(1 - y * 0.0015, 0.2));
    }, { passive: true });
  }

})();
