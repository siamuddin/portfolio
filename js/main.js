/* ============================================================
   SIAMUDDIN PORTFOLIO — SHARED JAVASCRIPT
   js/main.js

   This file runs on EVERY page. It handles:
     1. Custom cursor movement
     2. Hamburger / mobile menu toggle
     3. Active nav link highlighting
     4. Scroll-triggered reveal animations
     5. Navbar shrink on scroll
   ============================================================ */


/* ── Wait until the full HTML is loaded before running JS ──── */
document.addEventListener('DOMContentLoaded', () => {


  /* ── 1. CUSTOM CURSOR ──────────────────────────────────────
     We track mouse X/Y. The small dot snaps to it instantly.
     The ring uses "lerp" (linear interpolation) to lag behind,
     creating a smooth trailing effect.
  ────────────────────────────────────────────────────────── */
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  // Current mouse position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Ring's current position (starts at center)
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Snap the dot instantly
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Animate ring with lerp (smooth lag)
  function animateCursor() {
    // Lerp: move ring 12% of the remaining distance each frame
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateCursor); // loop
  }
  animateCursor();

  // Grow ring when hovering clickable things
  const clickables = document.querySelectorAll('a, button, .card, .skill-tag, .tag, input, textarea');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });


  /* ── 2. MOBILE HAMBURGER MENU ──────────────────────────────
     Click the hamburger → show the full-screen mobile menu.
     Click the × or a link → close it.
  ────────────────────────────────────────────────────────── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Animate hamburger into X
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }


  /* ── 3. ACTIVE NAV LINK ─────────────────────────────────────
     Checks the current page URL and adds class "active"
     to the matching nav link so it glows cyan.
  ────────────────────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });


  /* ── 4. SCROLL-TRIGGERED REVEAL ANIMATION ───────────────────
     IntersectionObserver watches elements with class "reveal".
     When one enters the viewport, it gets class "visible"
     which triggers the CSS fade-in transition.
  ────────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // stop watching once animated
        }
      });
    },
    {
      threshold: 0.12,       // trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px' // trigger 40px before the bottom edge
    }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ── 5. NAVBAR SHRINK ON SCROLL ─────────────────────────────
     When the user scrolls down, add a class to make the
     navbar slightly more compact.
  ────────────────────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '0.7rem 4rem';
    } else {
      navbar.style.padding = '';
    }
  }, { passive: true }); // passive: true = better scroll performance


  /* ── 6. CURRENT YEAR IN FOOTER ──────────────────────────────
     Auto-updates the copyright year so you never have to
     manually change it.
  ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


});
