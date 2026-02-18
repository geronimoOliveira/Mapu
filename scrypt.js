// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');

// Navbar Scroll Effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin inline"></i> Enviando...';
    submitBtn.classList.add('loading');
    lucide.createIcons();
    
    // Simulate form submission (replace with actual endpoint)
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        submitBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5 inline"></i> Mensagem enviada!';
        submitBtn.classList.remove('bg-terracotta-500');
        submitBtn.classList.add('bg-green-600');
        lucide.createIcons();
        
        // Show success notification
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading', 'bg-green-600');
            submitBtn.classList.add('bg-terracotta-500');
            lucide.createIcons();
        }, 3000);
        
    } catch (error) {
        showNotification('Ocorreu um erro ao enviar. Por favor, tente novamente.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
    }
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-500 translate-x-full ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white flex items-center gap-3`;
    
    notification.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
        <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section > div').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// WhatsApp Button Hover Effect
const whatsappBtn = document.querySelector('a[href*="wa.me"]');
if (whatsappBtn) {
    whatsappBtn.classList.add('whatsapp-float');
}

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('opacity-0');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.classList.add('transition-opacity', 'duration-500', 'opacity-0');
        img.onload = () => img.classList.remove('opacity-0');
        imageObserver.observe(img);
    });
}

// Accessibility: Keyboard navigation for mobile menu
mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
        mobileMenuBtn.focus();
    }
});

// Console Easter Egg
console.log('%c🎨 Mapu Arteterapia', 'font-size: 24px; font-weight: bold; color: #D47556;');
console.log('%c"Onde a arte encontra a alma"', 'font-size: 14px; font-style: italic; color: #666;');
