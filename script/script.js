// Pricing Toggle
function togglePricing() {
    const toggle = document.querySelector('.pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const annualPrices = document.querySelectorAll('.price-annual');
    const toggleOptions = document.querySelectorAll('.pricing-toggle-option');
    
    if (toggle) {
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                const isAnnual = option.textContent.trim() === 'Annual (Save 20%)';
                
                // Update active state
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Toggle prices
                monthlyPrices.forEach(price => {
                    price.style.display = isAnnual ? 'none' : 'block';
                });
                annualPrices.forEach(price => {
                    price.style.display = isAnnual ? 'block' : 'none';
                });
                
                // Update billing text
                document.querySelectorAll('.billing').forEach(el => {
                    el.textContent = isAnnual ? 'billed annually' : 'billed monthly';
                });
            });
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-question');
        
        header.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(i => {
                if (i !== item && i.classList.contains('active')) {
                    i.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.classList.add('scrolled', 'hidden');
    } else {
        // Scrolling up
        header.classList.add('scrolled');
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            fadeInObserver.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize pricing toggle
    togglePricing();
    
    // Initialize FAQ accordion
    initFAQ();
    
    // Set up scroll animations
    const animateElements = document.querySelectorAll('.outcome-card, .process-step, .case-card, .differentiator-card, .pricing-card, .faq-item, .pricing-toggle-container');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
    
    // Add active class to first pricing option by default
    const firstToggleOption = document.querySelector('.pricing-toggle-option');
    if (firstToggleOption) {
        firstToggleOption.classList.add('active');
    }
});

// Add animation class when element comes into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateOnScroll.observe(el);
});

// Enhanced form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.goal) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            alert('Thank you for your interest! We\'ll get back to you within 24 hours with your custom growth plan.');
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Track conversion (add your analytics code here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'YOUR_CONVERSION_ID',
                    'value': 1.0,
                    'currency': 'KES'
                });
            }
        }, 1500);
    });
}

// CTA click tracking
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-light');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className || 'unknown';
        
        // Track CTA clicks (add your analytics code here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': buttonText,
                'section': section
            });
        }
        
        console.log(`CTA clicked: ${buttonText} in ${section}`);
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FF7A00 0%, #122B68 100%);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();SRIPT
