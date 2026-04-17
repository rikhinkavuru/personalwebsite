document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer — fade-up on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.08 }
    );

    // Tag elements that should animate
    const selectors = [
        '.hero-badge',
        '.hero h1',
        '.hero-sub',
        '.hero-actions',
        '.section-label',
        '.bento-item',
        '.research-row',
        '.section-contact h2',
        '.section-contact p',
        '.section-contact .btn-primary',
    ];

    selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    });

    // Add stagger class to bento grid and research list
    document.querySelectorAll('.bento, .research-list').forEach((el) => {
        el.classList.add('stagger');
    });

    // Smooth-scroll for nav links (in case browser doesn't support scroll-behavior)
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
