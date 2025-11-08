/* ============================================
   BRAIT CONSULTING DESIGN ENHANCEMENTS
   Zinara Digital - Enhanced JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const CONFIG = {
        animationDuration: 500,
        hoverScale: 1.02,
        mobileHoverScale: 1.01,
        staggerDelay: 100,
        observerThreshold: 0.1,
        isMobile: window.innerWidth <= 768
    };

    // ============================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ============================================

    function initScrollAnimations() {
        const observerOptions = {
            threshold: CONFIG.observerThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all card elements
        const cardSelectors = [
            '.service-card',
            '.pricing-card',
            '.case-card',
            '.portfolio-card',
            '.testimonial-card',
            '.content-card',
            '.feature-card',
            '.blog-card',
            '.card'
        ];

        cardSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(card => {
                observer.observe(card);
            });
        });
    }

    // ============================================
    // SMOOTH HOVER EFFECTS
    // ============================================

    function initHoverEffects() {
        const cardSelectors = [
            '.service-card',
            '.pricing-card',
            '.case-card',
            '.portfolio-card',
            '.testimonial-card',
            '.content-card',
            '.feature-card',
            '.blog-card',
            '.card'
        ];

        cardSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(card => {
                card.addEventListener('mouseenter', function() {
                    if (!CONFIG.isMobile) {
                        this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }
                });

                card.addEventListener('mouseleave', function() {
                    if (!CONFIG.isMobile) {
                        this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }
                });
            });
        });
    }

    // ============================================
    // BUTTON INTERACTIONS
    // ============================================

    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!CONFIG.isMobile) {
                    this.style.transform = 'translateY(-4px) scale(1.05)';
                }
            });

            button.addEventListener('mouseleave', function() {
                if (!CONFIG.isMobile) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });

            button.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ============================================
    // STAGGERED ANIMATION DELAYS
    // ============================================

    function initStaggeredAnimations() {
        const gridSelectors = [
            '.service-grid',
            '.pricing-grid',
            '.case-grid',
            '.portfolio-grid',
            '.testimonial-grid',
            '.content-grid',
            '.feature-grid',
            '.blog-grid'
        ];

        gridSelectors.forEach(gridSelector => {
            const grid = document.querySelector(gridSelector);
            if (grid) {
                const cards = grid.querySelectorAll('[class*="card"]');
                cards.forEach((card, index) => {
                    card.style.animationDelay = (index * CONFIG.staggerDelay / 1000) + 's';
                });
            }
        });
    }

    // ============================================
    // RESPONSIVE HOVER BEHAVIOR
    // ============================================

    function handleResponsiveHover() {
        const updateMobileStatus = () => {
            CONFIG.isMobile = window.innerWidth <= 768;
        };

        window.addEventListener('resize', updateMobileStatus);
        updateMobileStatus();
    }

    // ============================================
    // FORM SUBMISSION HANDLER
    // ============================================

    function initFormHandlers() {
        const contactForm = document.querySelector('form[name="contact"], form[id*="contact"]');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    background-color: #10b981;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    margin-top: 15px;
                    animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                `;
                successMessage.textContent = '✓ Thank you! We\'ll contact you soon.';

                this.appendChild(successMessage);

                // Reset form
                this.reset();

                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.style.animation = 'fadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);

                console.log('Form submitted:', data);
            });
        }
    }

    // ============================================
    // SMOOTH SCROLL BEHAVIOR
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================

    function initMobileMenu() {
        const menuToggle = document.querySelector('[class*="menu-toggle"], [id*="menu-toggle"]');
        const mobileMenu = document.querySelector('[class*="mobile-menu"], [id*="mobile-menu"]');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                this.classList.toggle('active');
            });

            // Close menu when clicking on a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // ============================================
    // LAZY LOAD IMAGES
    // ============================================

    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ============================================
    // PARALLAX EFFECT (Optional)
    // ============================================

    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length > 0 && !CONFIG.isMobile) {
            window.addEventListener('scroll', () => {
                parallaxElements.forEach(element => {
                    const scrollPosition = window.pageYOffset;
                    const elementOffset = element.offsetTop;
                    const distance = scrollPosition - elementOffset;
                    element.style.transform = `translateY(${distance * 0.5}px)`;
                });
            });
        }
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================

    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });

            observer.observe(counter);
        });
    }

    // ============================================
    // TOOLTIP INITIALIZATION
    // ============================================

    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');

        tooltips.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.dataset.tooltip;
                tooltip.style.cssText = `
                    position: absolute;
                    background-color: #1e40af;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                    animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                `;

                document.body.appendChild(tooltip);

                const rect = this.getBoundingClientRect();
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

                this.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
            });
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        console.log('🎨 BRAIT Design Enhancements Initialized');

        initScrollAnimations();
        initHoverEffects();
        initButtonEffects();
        initStaggeredAnimations();
        handleResponsiveHover();
        initFormHandlers();
        initSmoothScroll();
        initMobileMenu();
        initLazyLoading();
        initParallax();
        initCounterAnimation();
        initTooltips();

        console.log('✅ All enhancements loaded successfully');
    }

    // Start initialization
    init();

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Expose utility functions globally
    window.BraitEnhancements = {
        // Manually trigger animations
        animateElement: function(element, animationName = 'fadeInUp', duration = 700) {
            element.style.animation = `${animationName} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        },

        // Add hover effect to any element
        addHoverEffect: function(selector) {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('card');
            });
        },

        // Update mobile status
        updateMobileStatus: function() {
            CONFIG.isMobile = window.innerWidth <= 768;
            return CONFIG.isMobile;
        },

        // Get current config
        getConfig: function() {
            return CONFIG;
        }
    };

})();

// ============================================
// POLYFILL FOR OLDER BROWSERS
// ============================================

if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function() {
        this.parentElement.scrollTop = this.offsetTop;
    };
}
