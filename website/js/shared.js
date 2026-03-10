/* ==========================================================================
   SPRAYCATION -- Shared JavaScript
   GSAP ScrollTrigger config, navigation, shared animation patterns
   ========================================================================== */

// --- GSAP SETUP ---
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.defaults({
  ease: 'power3.out',
  duration: 1
});

// --- NAVIGATION ---
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');

// Scroll-based nav background
if (nav) {
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });
}

// Mobile menu toggle
if (navToggle && navOverlay) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// --- PAGE TRANSITION DRIP ---
function initPageTransitions() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;

  const curtain = transition.querySelector('.drip-curtain');
  if (!curtain) return;

  // Intercept navigation clicks for internal pages
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Only intercept local .html links
    if (!href.endsWith('.html')) return;
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      transition.style.pointerEvents = 'auto';

      gsap.to(curtain, {
        y: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });

  // Entrance animation (drip sliding away on page load)
  gsap.fromTo(curtain,
    { y: 0 },
    { y: '100%', duration: 0.6, ease: 'power2.out', delay: 0.1 }
  );
}

// --- SPARKLE PARALLAX ---
function initSparkles() {
  var sparkles = document.querySelectorAll('.sparkle');
  if (!sparkles.length) return;

  // Inject SVG star into each sparkle if missing
  sparkles.forEach(function(sparkle) {
    if (!sparkle.querySelector('svg')) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z');
      svg.appendChild(path);
      sparkle.appendChild(svg);
    }
  });

  sparkles.forEach(function(sparkle, i) {
    // Random starting positions
    sparkle.style.left = (10 + Math.random() * 80) + '%';
    sparkle.style.top = (5 + Math.random() * 90) + '%';

    // Parallax on scroll
    gsap.to(sparkle, {
      scrollTrigger: {
        scrub: 1
      },
      y: -window.innerHeight * (0.15 + i * 0.08),
      rotation: 180 + Math.random() * 180,
      ease: 'none'
    });
  });
}

// --- IMAGE OVERLAY HELPER ---
// Builds a CSS background with dark overlay + photo
function imageOverlayBg(imagePath, opacity) {
  opacity = opacity || 0.5;
  return 'linear-gradient(to bottom, rgba(10,10,15,' + opacity + '), rgba(10,10,15,' + (opacity + 0.2) + ')), url(\'' + imagePath + '\')';
}

// --- COUNTER ANIMATION ---
function animateCounter(element, target, duration) {
  duration = duration || 2;
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';
  const isDecimal = target % 1 !== 0;

  gsap.fromTo(element,
    { innerText: 0 },
    {
      innerText: target,
      duration: duration,
      ease: 'power2.out',
      snap: { innerText: isDecimal ? 0.1 : 1 },
      onUpdate: function() {
        var val = isDecimal
          ? parseFloat(this.targets()[0].innerText).toFixed(1)
          : Math.round(parseFloat(this.targets()[0].innerText));
        element.textContent = prefix + val + suffix;
      }
    }
  );
}

function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(function(el) {
    var target = parseFloat(el.dataset.counter);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function() { animateCounter(el, target); }
    });
  });
}

// --- REVEAL ANIMATIONS (CSS-based, triggered by IntersectionObserver) ---
function initReveals() {
  var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function(el) { observer.observe(el); });
}

// --- SHARED SCROLL PATTERNS ---

// Pattern: Staggered reveal for groups of elements
function staggerReveal(selector, triggerSelector, options) {
  options = options || {};
  var elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  var scrollTriggerOpts = Object.assign({
    trigger: triggerSelector || elements[0].parentElement,
    start: options.start || 'top 80%',
    end: options.end || 'top 20%',
    toggleActions: 'play none none none'
  }, options.scrollTrigger || {});

  gsap.from(elements, {
    scrollTrigger: scrollTriggerOpts,
    y: options.y || 60,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.12,
    ease: options.ease || 'power3.out'
  });
}

// Pattern: Horizontal scroll section
function horizontalScroll(containerSelector, trackSelector, options) {
  options = options || {};
  var container = document.querySelector(containerSelector);
  var track = document.querySelector(trackSelector);
  if (!container || !track) return;

  var scrollWidth = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: Object.assign({
      trigger: container,
      start: 'top top',
      end: function() { return '+=' + scrollWidth; },
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }, options)
  });
}

// Pattern: Pinned narrative (sticky image, cycling text)
function pinnedNarrative(containerSelector, panelSelector, options) {
  options = options || {};
  var container = document.querySelector(containerSelector);
  var panels = document.querySelectorAll(panelSelector);
  if (!container || !panels.length) return;

  var tl = gsap.timeline({
    scrollTrigger: Object.assign({
      trigger: container,
      start: 'top top',
      end: function() { return '+=' + (panels.length * window.innerHeight * 0.8); },
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }, options)
  });

  panels.forEach(function(panel, i) {
    if (i === 0) {
      tl.from(panel, { opacity: 0, y: 30, duration: 0.5 });
    } else {
      tl.to(panels[i - 1], { opacity: 0, y: -30, duration: 0.3 })
        .from(panel, { opacity: 0, y: 30, duration: 0.5 }, '-=0.1');
    }
  });

  return tl;
}

// Pattern: Velocity-responsive marquee speed
function velocityMarquee(trackSelector) {
  var track = document.querySelector(trackSelector);
  if (!track) return;

  var style = window.getComputedStyle(track);
  var animDuration = parseFloat(style.animationDuration) || 30;

  ScrollTrigger.create({
    onUpdate: function(self) {
      var velocity = Math.abs(self.getVelocity()) / 2000;
      var newDuration = Math.max(5, animDuration / (1 + velocity));
      track.style.animationDuration = newDuration + 's';
    }
  });
}

// --- INITIALIZE ON DOM READY ---
document.addEventListener('DOMContentLoaded', function() {
  initPageTransitions();
  initSparkles();
  initCounters();
  initReveals();

  // ScrollTrigger refresh after fonts load
  if (document.fonts) {
    document.fonts.ready.then(function() {
      ScrollTrigger.refresh();
    });
  }
});
