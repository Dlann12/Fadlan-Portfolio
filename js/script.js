/**
 * Main Script for Fadlan Dwi Febrio Portfolio
 * Handles custom cursor, scroll animations, typing effect, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverElements = document.querySelectorAll('[data-hover], a, button');

    // Update cursor position
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.opacity = '1';
        });
    });

    // ==========================================
    // 2. MOBILE NAVIGATION
    // ==========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuIcon = document.querySelector('.menu-icon');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileOverlay.classList.add('open');
            menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileOverlay.classList.remove('open');
            menuIcon.textContent = 'menu';
            document.body.style.overflow = '';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 5. TYPING EFFECT
    // ==========================================
    const typingText = document.getElementById('typing-text');
    const words = [
        "Software Engineer",
        "Machine Learning Eng",
        "Data Analyst",
        "Graphic Designer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeEffect, 1000);

    // ==========================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a staggered container, animate children
                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = entry.target.querySelectorAll('.reveal-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('active');
                        }, index * 150);
                    });
                    entry.target.classList.add('active');
                } else {
                    // For single items, respect data-delay if present
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, parseFloat(delay) * 1000);
                    } else {
                        entry.target.classList.add('active');
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Instantly reveal hero items if already in view
    document.querySelector('.hero-content').classList.add('active');
    const heroItems = document.querySelectorAll('.hero-content .reveal-item');
    heroItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active');
        }, index * 150);
    });
    
    setTimeout(() => {
        const visual = document.querySelector('.hero-visual');
        if(visual) visual.classList.add('active');
    }, 600);

    // ==========================================
    // 7. BENTO BOX MOUSE GLOW EFFECT
    // ==========================================
    const bentoItems = document.querySelectorAll('.bento-item');
    
    bentoItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 8. BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Remove loading class
    document.body.classList.remove('loading');
});
