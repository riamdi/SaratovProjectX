// Улучшенная версия с обработкой touch-событий
document.addEventListener('DOMContentLoaded', function() {
    // ========== БУРГЕР-МЕНЮ ==========
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        // Блокируем скролл при открытом меню
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }

    // Обработчики для клика и касания
    burger.addEventListener('click', toggleMenu);
    burger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
    }, {passive: false});

    overlay.addEventListener('click', toggleMenu);
    overlay.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
    }, {passive: false});

    // Закрываем меню при клике на ссылки
    document.querySelectorAll('.a_menu').forEach(link => {
        link.addEventListener('click', toggleMenu);
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu();
            window.location.href = this.href;
        }, {passive: false});
    });

    // ========== КАРУСЕЛЬ ==========
    const events = [
        {
            title: "Щелкунчик",
            image: "img/shelcunchik.png",
            location: "Театр драмы им. Слонова",
            time: "23 декабря, 19:00",
            description: "Максим Аверин прочтет сказку Э. Гофмана!",
        },
        // ... остальные события
    ];

    const carousel = document.querySelector('.carousel');
    const indicator = document.querySelector('.indicator');
    
    // Создаем карточки
    events.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${event.image}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'">
            </div>
            <div class="card-content">
                <h3 class="card-title">${event.title}</h3>
                <div class="card-details">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="card-details">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <p class="card-description">${event.description}</p>
                <button class="card-button">Посмотреть</button>
            </div>
        `;
        carousel.appendChild(card);
        
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        indicator.appendChild(dot);
    });
    
    const cards = document.querySelectorAll('.card');
    const dots = document.querySelectorAll('.indicator-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    const cardWidth = cards[0].offsetWidth + 30;
    
    // Клонируем для бесконечной прокрутки
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cardCount - 1].cloneNode(true);
    
    carousel.insertBefore(lastCard, cards[0]);
    carousel.appendChild(firstCard);
    
    function updateCarousel() {
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(${-(currentIndex + 1) * cardWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentIndex + cardCount) % cardCount);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    }
    
    carousel.addEventListener('transitionend', () => {
        if (currentIndex === cardCount - 1) {
            carousel.style.transition = 'none';
            currentIndex = -1;
            carousel.style.transform = `translateX(0px)`;
            setTimeout(() => {
                carousel.style.transition = "transform 0.5s ease-in-out";
                nextSlide();
            }, 50);
        } else if (currentIndex === -1) {
            carousel.style.transition = 'none';
            currentIndex = cardCount - 2;
            carousel.style.transform = `translateX(${-(cardCount) * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = "transform 0.5s ease-in-out";
                prevSlide();
            }, 50);
        }
    });
    
    let autoScroll = setInterval(nextSlide, 3000);
    
    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = setInterval(nextSlide, 3000);
    }
    
    // Обработчики для кнопок карусели
    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            btn === nextBtn ? nextSlide() : prevSlide();
            resetAutoScroll();
        });
        
        btn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            btn === nextBtn ? nextSlide() : prevSlide();
            resetAutoScroll();
        }, {passive: false});
    });
    
    // Обработчики для индикаторов
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetIndex = parseInt(dot.dataset.index);
            currentIndex = targetIndex - 1;
            nextSlide();
            resetAutoScroll();
        });
        
        dot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const targetIndex = parseInt(this.dataset.index);
            currentIndex = targetIndex - 1;
            nextSlide();
            resetAutoScroll();
        }, {passive: false});
    });
    
    // Остановка автопрокрутки при наведении
    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', resetAutoScroll);
    
    // ========== КНОПКА TELEGRAM ==========
    const tgButton = document.querySelector('.route_footer_button_tg');
    if (tgButton) {
        tgButton.addEventListener('click', () => {
            window.open('https://t.me/your_bot', '_blank');
        });
        
        tgButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            window.open('https://t.me/your_bot', '_blank');
        }, {passive: false});
    }
    
    // ========== ФОРМА ==========
    const form = document.querySelector('.glass_form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Форма отправлена!');
            form.reset();
        });
    }
});