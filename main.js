document.addEventListener('DOMContentLoaded', () => {
    // ─── Page Load Fade ───
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });

    // ─── Text Scramble Effect (Option C) ───
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    const SCRAMBLE_DURATION = 600;
    const SCRAMBLE_FPS = 30;
    const FRAME_INTERVAL = 1000 / SCRAMBLE_FPS;

    function scrambleText(el) {
        const original = el.getAttribute('data-original') || el.textContent;
        el.setAttribute('data-original', original);

        const length = original.length;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);

            // Characters settle from left to right
            const settledCount = Math.floor(progress * length);
            let result = '';

            for (let i = 0; i < length; i++) {
                if (original[i] === ' ') {
                    result += ' ';
                } else if (i < settledCount) {
                    result += original[i];
                } else {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }

            el.textContent = result;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.textContent = original;
            }
        }

        requestAnimationFrame(animate);
    }

    // ─── Scroll Reveal with Blur ───
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Trigger scramble on elements with data-scramble
                    if (entry.target.hasAttribute('data-scramble') && !prefersReducedMotion) {
                        // Small delay so reveal and scramble feel sequential
                        setTimeout(() => scrambleText(entry.target), 100);
                    }

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    // Tag elements for reveal animation
    const revealSelectors = [
        '.hero-name',
        '.hero-headline',
        '.hero-meta',
        '.hero-scroll',
        '.section-marker',
        '.work-row',
        '.about-opener',
        '.about-body p',
        '.about-now',
        '.contact-email',
        '.contact-handles',
    ];

    revealSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    });

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile overlay if open
                closeMobileOverlay();
            }
        });
    });

    // ─── Mobile Navigation ───
    const navToggle = document.querySelector('.nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const overlayClose = document.querySelector('.mobile-overlay-close');

    function openMobileOverlay() {
        mobileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileOverlay() {
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMobileOverlay);
    }

    if (overlayClose) {
        overlayClose.addEventListener('click', closeMobileOverlay);
    }

    // Close overlay when clicking a link inside it
    if (mobileOverlay) {
        mobileOverlay.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileOverlay();
            });
        });
    }
});
