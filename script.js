// Исчезающая навигация
let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById('navbar');

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}

// Боковое меню
const burgerSocial = document.querySelector('.burger-social');
const sidebarMenu = document.querySelector('.sidebar-menu');
const overlay = document.querySelector('.overlay');
const closeSidebar = document.querySelector('.close-sidebar');

if (burgerSocial) {
    burgerSocial.addEventListener('click', () => {
        sidebarMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Выпадающие меню в сайдбаре
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.sidebar-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});

// Улучшенный поиск
const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchSuggestions = document.getElementById('search-suggestions');

// Данные для подсказок поиска
const searchData = {
    categories: ['Ножи', 'Фигурки', 'Композиции', 'Украшения'],
    products: [
        'Резной нож "Охотник"',
        'Скульптура "Орел"',
        'Композиция "Северное сияние"',
        'Кулон "Волк"',
        'Нож "Таёжный"',
        'Фигурка "Медведь"'
    ],
    materials: ['Кость мамонта', 'Рог оленя', 'Дерево', 'Металл']
};

// Функция для показа подсказок
function showSuggestions() {
    const query = searchInput.value.toLowerCase().trim();
    searchSuggestions.innerHTML = '';

    if (query.length === 0) {
        // Показываем популярные поиски
        searchSuggestions.innerHTML = `
            <div class="search-suggestion-category">Популярные запросы</div>
            <div class="search-suggestion-item">
                <i class="fas fa-search"></i>
                <span>Ножи из кости</span>
            </div>
            <div class="search-suggestion-item">
                <i class="fas fa-search"></i>
                <span>Резные фигурки</span>
            </div>
            <div class="search-suggestion-item">
                <i class="fas fa-search"></i>
                <span>Украшения ручной работы</span>
            </div>
        `;
        searchSuggestions.classList.add('active');
        return;
    }

    let hasResults = false;
    let suggestionsHTML = '';

    // Поиск по категориям
    const categoryResults = searchData.categories.filter(cat => 
        cat.toLowerCase().includes(query)
    );
    if (categoryResults.length > 0) {
        suggestionsHTML += `<div class="search-suggestion-category">Категории</div>`;
        categoryResults.forEach(cat => {
            suggestionsHTML += `
                <div class="search-suggestion-item" data-type="category" data-value="${cat}">
                    <i class="fas fa-folder"></i>
                    <span>${cat}</span>
                </div>
            `;
        });
        hasResults = true;
    }

    // Поиск по товарам
    const productResults = searchData.products.filter(product => 
        product.toLowerCase().includes(query)
    );
    if (productResults.length > 0) {
        suggestionsHTML += `<div class="search-suggestion-category">Товары</div>`;
        productResults.forEach(product => {
            suggestionsHTML += `
                <div class="search-suggestion-item" data-type="product" data-value="${product}">
                    <i class="fas fa-cube"></i>
                    <span>${product}</span>
                </div>
            `;
        });
        hasResults = true;
    }

    // Поиск по материалам
    const materialResults = searchData.materials.filter(material => 
        material.toLowerCase().includes(query)
    );
    if (materialResults.length > 0) {
        suggestionsHTML += `<div class="search-suggestion-category">Материалы</div>`;
        materialResults.forEach(material => {
            suggestionsHTML += `
                <div class="search-suggestion-item" data-type="material" data-value="${material}">
                    <i class="fas fa-palette"></i>
                    <span>${material}</span>
                </div>
            `;
        });
        hasResults = true;
    }

    if (!hasResults) {
        suggestionsHTML = `
            <div class="search-suggestion-item">
                <i class="fas fa-exclamation-circle"></i>
                <span>Ничего не найдено</span>
            </div>
        `;
    }

    searchSuggestions.innerHTML = suggestionsHTML;
    searchSuggestions.classList.add('active');
}

// Обработчики событий для поиска
if (searchIcon && searchBox && searchInput) {
    // Открытие поиска
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
            showSuggestions();
        } else {
            searchSuggestions.classList.remove('active');
        }
    });

    // Фокус на поле ввода
    searchInput.addEventListener('focus', () => {
        showSuggestions();
    });

    // Ввод текста
    searchInput.addEventListener('input', () => {
        showSuggestions();
    });

    // Выбор подсказки
    searchSuggestions.addEventListener('click', (e) => {
        const suggestionItem = e.target.closest('.search-suggestion-item');
        if (suggestionItem) {
            const value = suggestionItem.getAttribute('data-value');
            if (value) {
                searchInput.value = value;
                performSearch(value);
                searchBox.classList.remove('active');
                searchSuggestions.classList.remove('active');
            }
        }
    });

    // Закрытие поиска при клике вне
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
            searchBox.classList.remove('active');
            searchSuggestions.classList.remove('active');
        }
    });

    // Закрытие по ESC
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchBox.classList.remove('active');
            searchSuggestions.classList.remove('active');
            searchInput.blur();
        }
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
            searchBox.classList.remove('active');
            searchSuggestions.classList.remove('active');
        }
    });
}

// Функция выполнения поиска
function performSearch(query) {
    if (query.trim()) {
        console.log('Выполняется поиск:', query);
        alert(`Поиск: ${query}`);
    }
}

// Дебаунс для оптимизации поиска
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Применяем дебаунс к поиску
if (searchInput) {
    searchInput.addEventListener('input', debounce(showSuggestions, 300));
}

// Local Storage для авторизации
const STORAGE_KEY = 'artbone_users';
const CURRENT_USER_KEY = 'artbone_current_user';

function getUsers() {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

// Регистрация пользователя
function registerUser(name, email, password) {
    const users = getUsers();
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Регистрация успешна' };
}

// Авторизация пользователя
function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        setCurrentUser(user);
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Неверный email или пароль' };
    }
}

// Обновление состояния авторизации в интерфейсе
function updateAuthState() {
    const authSidebarBtn = document.getElementById('authSidebarBtn');
    const logoutSidebarBtn = document.getElementById('logoutSidebarBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    const user = getCurrentUser();
    
    if (user) {
        if (authSidebarBtn) authSidebarBtn.style.display = 'none';
        if (logoutSidebarBtn) logoutSidebarBtn.style.display = 'block';
        if (profileBtn) {
            profileBtn.innerHTML = '<i class="fas fa-user-check"></i>';
            profileBtn.title = `Профиль: ${user.name}`;
        }
    } else {
        if (authSidebarBtn) authSidebarBtn.style.display = 'block';
        if (logoutSidebarBtn) logoutSidebarBtn.style.display = 'none';
        if (profileBtn) {
            profileBtn.innerHTML = '<i class="far fa-user"></i>';
            profileBtn.title = 'Профиль';
        }
    }
}

// ПРОСТОЕ УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
function initAuthModal() {
    console.log('Инициализация модального окна...');
    
    const authModal = document.getElementById('authModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (!authModal) {
        console.error('Модальное окно не найдено!');
        return;
    }
    
    // Функция открытия
    window.openAuthModal = function() {
        console.log('Открытие модального окна');
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Функция закрытия
    window.closeAuthModal = function() {
        console.log('Закрытие модального окна');
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // Обработчики открытия
document.addEventListener('click', function(e) {
    if (e.target.closest('#profileBtn') || 
        e.target.closest('#authSidebarBtn')) {
        e.preventDefault();
        openAuthModal();
    }
});
    
    // Обработчики закрытия
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeAuthModal);
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeAuthModal();
        }
    });
}

// ОБРАБОТЧИКИ ФОРМ
function initAuthForms() {
    console.log('Инициализация форм...');
    
    // Форма входа
    const signInForm = document.querySelector('.sign-in-container form');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы входа');
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert('Заполните все поля');
                return;
            }
            
            const result = loginUser(email, password);
            
            if (result.success) {
                alert('Вход выполнен успешно!');
                updateAuthState();
                closeAuthModal();
                this.reset();
            } else {
                alert(result.message);
            }
        });
    }
    
    // Форма регистрации
    const signUpForm = document.querySelector('.sign-up-container form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы регистрации');
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            const terms = this.querySelector('#terms');
            
            if (!name || !email || !password) {
                alert('Заполните все поля');
                return;
            }
            
            if (!terms || !terms.checked) {
                alert('Согласитесь с условиями использования');
                return;
            }
            
            const result = registerUser(name, email, password);
            
            if (result.success) {
                alert('Регистрация прошла успешно! Теперь вы можете войти.');
                const toggle = document.getElementById('toggle');
                if (toggle) toggle.checked = true;
                this.reset();
            } else {
                alert(result.message);
            }
        });
    }
    
    // Выход из системы
    const logoutSidebarBtn = document.getElementById('logoutSidebarBtn');
    if (logoutSidebarBtn) {
        logoutSidebarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentUser(null);
            updateAuthState();
            alert('Вы вышли из системы');
        });
    }
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Активный пункт меню
const sections = document.querySelectorAll('.fullscreen-section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Анимация добавления в корзину
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const flyElement = document.createElement('div');
        flyElement.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--color-secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 1s ease;
        `;
        
        const rect = this.getBoundingClientRect();
        const cartIcon = document.querySelector('.fa-shopping-bag');
        const cartParent = cartIcon ? cartIcon.closest('.nav-icon') : null;
        
        if (cartParent) {
            const cartRect = cartParent.getBoundingClientRect();
            
            flyElement.style.left = rect.left + 'px';
            flyElement.style.top = rect.top + 'px';
            document.body.appendChild(flyElement);
            
            setTimeout(() => {
                flyElement.style.left = cartRect.left + 'px';
                flyElement.style.top = cartRect.top + 'px';
                flyElement.style.transform = 'scale(0.3)';
                flyElement.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                flyElement.remove();
            }, 1000);
        }
    });
});

// 3D эффект для карточек
const angle = 10;

const lerp = (start, end, amount) => {
    return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
};

function init3DCards() {
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const centerX = (rect.left + rect.right) / 2;
            const centerY = (rect.top + rect.bottom) / 2;
            const posX = event.pageX - centerX;
            const posY = event.pageY - centerY;
            const x = remap(posX, rect.width / 2, angle);
            const y = remap(posY, rect.height / 2, angle);
            card.dataset.rotateX = x;
            card.dataset.rotateY = -y;
        });

        card.addEventListener("mouseout", () => {
            card.dataset.rotateX = 0;
            card.dataset.rotateY = 0;
        });
    });

    const updateCards = () => {
        cards.forEach((card) => {
            let currentX = parseFloat(card.style.getPropertyValue('--rotateY')?.slice(0, -1)) || 0;
            let currentY = parseFloat(card.style.getPropertyValue('--rotateX')?.slice(0, -1)) || 0;
            
            const x = lerp(currentX, card.dataset.rotateX || 0, 0.05);
            const y = lerp(currentY, card.dataset.rotateY || 0, 0.05);
            
            card.style.setProperty("--rotateY", x + "deg");
            card.style.setProperty("--rotateX", y + "deg");
        });
    };

    setInterval(updateCards, 1000 / 60);
}

// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    initAuthModal();
    initAuthForms();
    updateAuthState();
    init3DCards();
    
});

// Эффект стека карточек
function initStackCards() {
    const cards = document.querySelectorAll('.stack-cards__item');
    const indicators = document.querySelectorAll('.stack-indicator');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    let currentCardIndex = 0;
    let isAnimating = false;
    
    // Инициализация
    function initCards() {
        cards.forEach((card, index) => {
            if (index === currentCardIndex) {
                card.classList.add('active');
                card.classList.remove('inactive');
            } else {
                card.classList.remove('active');
                card.classList.add('inactive');
            }
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentCardIndex);
        });
    }
    
    // Переключение карточки
    function goToCard(index) {
        if (index === currentCardIndex || isAnimating) return;
        
        isAnimating = true;
        
        // Скрываем текущую карточку
        cards[currentCardIndex].classList.remove('active');
        cards[currentCardIndex].classList.add('inactive');
        indicators[currentCardIndex].classList.remove('active');
        
        // Показываем новую карточку
        cards[index].classList.remove('inactive');
        cards[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentCardIndex = index;
        
        // Разрешаем следующую анимацию через 600ms
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToCard(index);
        });
    });
    
    // Обработка скролла колесиком на карточках
    const stackCards = document.querySelector('.stack-cards');
    if (stackCards) {
        stackCards.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (isAnimating) return;
            
            if (e.deltaY > 0) {
                // Скролл вниз - следующая карточка
                if (currentCardIndex < totalCards - 1) {
                    goToCard(currentCardIndex + 1);
                }
                // Если это последняя карточка - не делаем ничего, разрешаем скролл страницы
            } else {
                // Скролл вверх - предыдущая карточка
                if (currentCardIndex > 0) {
                    goToCard(currentCardIndex - 1);
                }
            }
        });
    }
    
    // Автоматическая прокрутка
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const nextIndex = (currentCardIndex + 1) % totalCards;
            goToCard(nextIndex);
        }, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Останавливаем автоскролл при взаимодействии
    if (stackCards) {
        stackCards.addEventListener('mouseenter', stopAutoScroll);
        stackCards.addEventListener('mouseleave', startAutoScroll);
        stackCards.addEventListener('touchstart', stopAutoScroll);
    }
    
    // Инициализация
    initCards();
    startAutoScroll();
    
    // ПРОСТОЙ СКРОЛЛ СТРАНИЦЫ: теперь обычный скролл работает всегда
    // кроме когда курсор над карточками
}

// Обновляем инициализацию
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    initAuthModal();
    initAuthForms();
    updateAuthState();
    init3DCards();
    initStackCards();
});

// Анимации при скролле для секции контактов и футера
function initScrollAnimations() {
    const contactItems = document.querySelectorAll('.contact-item, .contact-form, .footer-logo, .footer-column');
    
    if (!contactItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactItems.forEach(item => {
        observer.observe(item);
    });
}

// Обработка формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Валидация
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        if (!document.getElementById('agree').checked) {
            showNotification('Необходимо согласие на обработку данных', 'error');
            return;
        }
        
        // Здесь обычно отправка на сервер
        console.log('Отправка формы:', formData);
        
        // Показываем уведомление об успехе
        showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очищаем форму
        contactForm.reset();
        
        // Добавляем небольшую анимацию к кнопке
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Отправлено!</span>';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Отправить сообщение</span><i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-dark)' : '#f44336'};
        color: var(--color-primary);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid ${type === 'success' ? 'var(--color-secondary)' : '#d32f2f'};
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Обновляем инициализацию
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    initAuthModal();
    initAuthForms();
    updateAuthState();
    init3DCards();
    initStackCards();
    initScrollAnimations(); // Добавляем анимации для контактов
    initContactForm(); // Добавляем обработку формы
});