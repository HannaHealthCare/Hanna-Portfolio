// ============================================
//  NURSING PORTFOLIO – MAIN JAVASCRIPT
// ============================================

// ── Progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});

// ── Sticky navbar shrink
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.padding = '10px 48px';
    } else {
        navbar.style.padding = '18px 48px';
    }
});

// ── Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
// Close nav when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll
const sections = document.querySelectorAll('.portfolio-section');
const navLinkEls = document.querySelectorAll('.nav-link');

const observerOpts = { rootMargin: '-40% 0px -55% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkEls.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, observerOpts);
sections.forEach(s => sectionObserver.observe(s));

// ── Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

// ── Scroll-in animations
const animItems = document.querySelectorAll(
    '.profile-card, .timeline-item, .growth-card, .competency-card, .forward-card, .skill-item, .analysis-item'
);
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, (entry.target.dataset.delay || 0));
            animObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -60px 0px' });

animItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    el.dataset.delay = (i % 4) * 80;
    animObserver.observe(el);
});

console.log('Nursing Portfolio loaded ✓');
