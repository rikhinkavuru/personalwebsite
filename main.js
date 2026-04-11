document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for links
    const links = document.querySelectorAll('a, .card, .project-card, .btn-primary');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.borderColor = 'var(--accent)';
            outline.style.backgroundColor = 'rgba(212, 163, 115, 0.05)';
        });
        link.addEventListener('mouseleave', () => {
            outline.style.width = '32px';
            outline.style.height = '32px';
            outline.style.borderColor = 'var(--text-primary)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.card, .project-card, .stat-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add visible class styling via JS or inject to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
