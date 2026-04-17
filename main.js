document.addEventListener('DOMContentLoaded', () => {
    // ─── Page Load Fade ───
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });

    // ─── Theme Toggle ───
    const themeToggle = document.querySelector('.theme-toggle');

    function applyTheme(mode) {
        if (mode === 'light') {
            document.documentElement.classList.add('light');
            if (themeToggle) themeToggle.textContent = '\u263E'; // crescent moon
        } else {
            document.documentElement.classList.remove('light');
            if (themeToggle) themeToggle.textContent = '\u2600'; // sun
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.contains('light');
            const next = isLight ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    // ─── Custom Cursor ───
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let cursorVisible = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorVisible) {
                cursorVisible = true;
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '1';
            }
            cursorDot.style.transform =
                `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.transform =
                `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover expansion on interactive elements
        document.querySelectorAll('a, button, .work-row').forEach((el) => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
        });

        // Start hidden until first mouse move
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    }

    // ─── Text Scramble Effect ───
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    const SCRAMBLE_DURATION = 600;

    function scrambleText(el) {
        const original = el.getAttribute('data-original') || el.textContent;
        el.setAttribute('data-original', original);

        const length = original.length;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);

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
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.hasAttribute('data-scramble') && !prefersReducedMotion) {
                        setTimeout(() => scrambleText(entry.target), 100);
                    }

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    const revealSelectors = [
        '.hero-quote',
        '.hero-attribution',
        '.hero-scroll',
        '.section-marker',
        '.work-row',
        '.about-opener',
        '.about-body p',
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

    if (mobileOverlay) {
        mobileOverlay.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileOverlay();
            });
        });
    }
});
