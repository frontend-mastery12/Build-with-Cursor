/**
 * FUTURISTIC LANDING PAGE - JAVASCRIPT
 * Interactive features and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeCardInteractions();
    initializeFormHandling();
    initializeParallaxEffects();
    initializeSmoothScroll();
});

/**
 * Initialize navigation functionality
 * - Smooth scroll to sections
 * - Active link highlighting
 * - Mobile menu toggle (if needed)
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll on navigation click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation link on scroll
    function highlightActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= (sectionTop - 200)) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav(); // Initial call
}

/**
 * Initialize scroll-triggered animations
 * - Fade in elements as they enter viewport
 * - Animate cards and sections
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .pricing-card, .hero-text, .signup-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize interactive card features
 * - 3D tilt effect on hover
 * - Glow effects
 * - Click interactions
 */
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 3D Tilt Effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Click interaction
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(139, 92, 246, 0.5);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize form handling
 * - Form validation
 * - Submit handling
 * - Input animations
 */
function initializeFormHandling() {
    const signupForm = document.querySelector('.signup-form');
    const formInputs = document.querySelectorAll('.form-input');
    
    // Add focus animations
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(signupForm);
            const name = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;
            
            // Basic validation
            if (!name || !email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = signupForm.querySelector('.btn-signup-form');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Account created successfully!', 'success');
                signupForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Sign Up button in header
    const headerSignUpBtn = document.querySelector('.btn-signup');
    if (headerSignUpBtn) {
        headerSignUpBtn.addEventListener('click', function() {
            const pricingSection = document.querySelector('#pricing');
            if (pricingSection) {
                const headerOffset = 80;
                const elementPosition = pricingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on email input
                setTimeout(() => {
                    const emailInput = document.querySelector('.signup-form input[type="email"]');
                    if (emailInput) {
                        emailInput.focus();
                    }
                }, 500);
            }
        });
    }
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
}

/**
 * Initialize parallax scrolling effects
 * - Background elements move at different speeds
 * - Creates depth illusion
 */
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const heroBg = hero.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
        
        // Parallax for orbital lines
        const orbitalLines = document.querySelectorAll('.orbital-line');
        orbitalLines.forEach((line, index) => {
            const speed = (index + 1) * 0.2;
            line.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * Initialize smooth scroll behavior
 * - Enhanced smooth scrolling
 * - Scroll progress indicator (optional)
 */
function initializeSmoothScroll() {
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
        z-index: 10001;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
}

/**
 * Add cursor glow effect for enhanced interactivity
 */
function initializeCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        display: none;
    `;
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', function(e) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.display = 'block';
    });
    
    // Expand on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .form-input');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorGlow.style.width = '20px';
            cursorGlow.style.height = '20px';
        });
    });
}

// Initialize cursor glow effect
initializeCursorGlow();

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

