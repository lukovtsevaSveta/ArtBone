// Scroll Storytelling
class SimpleScrollStory {
    constructor() {
        this.init();
    }

    init() {
        console.log('Simple Scroll Story initialized');
        
        // Ждем полной загрузки
        window.addEventListener('load', () => {
            this.setupObservers();
            this.animateOnLoad();
        });
    }

    setupObservers() {
        // Intersection Observer для отслеживания появления элементов
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        
        const elementsToAnimate = document.querySelectorAll(
            '.hero-subtitle, .hero-description, .section-title, .card, .cta-circle, .stack-card'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('animated')) return;
        
        element.classList.add('animated');
        
        // Разные анимации для разных элементов
        if (element.classList.contains('card')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateY(0) scale(1)';
        } else if (element.classList.contains('stack-card')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateY(0) scale(1)';
        } else {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    }

    animateOnLoad() {
        // Анимация при загрузке для видимых элементов
        setTimeout(() => {
            document.querySelector('.navbar').style.opacity = '1';
            document.querySelector('.navbar').style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            if (document.querySelector('.social-sidebar')) {
                document.querySelector('.social-sidebar').style.opacity = '1';
                document.querySelector('.social-sidebar').style.transform = 'translateX(0)';
            }
        }, 500);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new SimpleScrollStory();
});