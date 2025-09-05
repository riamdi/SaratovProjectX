document.addEventListener('DOMContentLoaded', function() {
            // Данные мероприятий
            const events = [
                {
                    title: "Щелкунчик",
                    image: "img/shelcunchik.png",
                    location: "Театр драмы им. Слонова",
                    time: "23 декабря, 19:00",
                    description: "Максим Аверин прочтет сказку Э. Гофмана «Щелкунчик и Мышиный король»!",
                },
                {
                    title: "Баста",
                    image: "img/basta.jpg",
                    location: "Ледовый дворец 'Кристалл'",
                    time: "22 ноября, суббота, 19:00",
                    description: "Баста — один из самых популярных артистов в русскоязычной музыке."
                },
                {
                    title: "Звери",
                    image: "img/zveri.jpeg",
                    location: "ФОК 'Звёздный'",
                    time: "1 ноября, 20:00",
                    description: "Специальная акустическая программа с новым звучанием лучших хитов и композиций."
                },
                {
                    title: "Вечернее шоу «Дела»",
                    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    location: "Центр народного творчества",
                    time: "19 сентября, 20:00",
                    description: "«Дела» — возможность погрузиться в атмосферу криминального подкаста."
                },
                {
                    title: "Gayazov$ Brother$",
                    image: "img/GAYAZOV-BROTHER.jpg",
                    location: "Клуб ONYX",
                    time: "18 октября, 20:00",
                    description: "Ильяс и Тимур — в этот вечер разорвут танцпол своими хитами! "
                }
            ];

            const carousel = document.querySelector('.carousel');
            const indicator = document.querySelector('.indicator');
            
            // Генерация карточек мероприятий
            events.forEach((event, index) => {
                // Создание карточки
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
                        <button class="card-button">Участвовать</button>
                    </div>
                `;
                carousel.appendChild(card);
                
                // Создание индикатора
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
            const cardWidth = cards[0].offsetWidth + 30; // width + margin
            
            // Клонируем карточки для бесконечной прокрутки
            const firstCard = cards[0].cloneNode(true);
            const lastCard = cards[cardCount - 1].cloneNode(true);
            
            carousel.insertBefore(lastCard, cards[0]);
            carousel.appendChild(firstCard);
            
            // Обновляем список карточек
            const allCards = document.querySelectorAll('.card');
            const totalCards = allCards.length;
            
            // Устанавливаем начальное положение карусели
            carousel.style.transform = `translateX(${-cardWidth}px)`;
            
            // Функция обновления карусели
            function updateCarousel() {
                carousel.style.transition = "transform 0.5s ease-in-out";
                carousel.style.transform = `translateX(${-(currentIndex + 1) * cardWidth}px)`;
                
                // Обновление индикаторов
                dots.forEach((dot, index) => {
                    if (index === (currentIndex + cardCount) % cardCount) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Функция для перехода к следующей карточке
            function nextSlide() {
                currentIndex = (currentIndex + 1) % cardCount;
                updateCarousel();
            }
            
            // Функция для перехода к предыдущей карточке
            function prevSlide() {
                currentIndex = (currentIndex - 1 + cardCount) % cardCount;
                updateCarousel();
            }
            
            // Обработчик завершения перехода
            carousel.addEventListener('transitionend', () => {
                // Если достигли клона последней карточки, незаметно переходим к началу
                if (currentIndex === cardCount - 1) {
                    carousel.style.transition = 'none';
                    currentIndex = -1;
                    carousel.style.transform = `translateX(0px)`;
                    
                    // Небольшая задержка для сброса перехода
                    setTimeout(() => {
                        carousel.style.transition = "transform 0.5s ease-in-out";
                        nextSlide();
                    }, 50);
                }
                // Если достигли клона первой карточки, незаметно переходим к концу
                else if (currentIndex === -1) {
                    carousel.style.transition = 'none';
                    currentIndex = cardCount - 2;
                    carousel.style.transform = `translateX(${-(cardCount) * cardWidth}px)`;
                    
                    // Небольшая задержка для сброса перехода
                    setTimeout(() => {
                        carousel.style.transition = "transform 0.5s ease-in-out";
                        prevSlide();
                    }, 50);
                }
            });
            
            // Автоматическая прокрутка
            let autoScroll = setInterval(nextSlide, 3000);
            
            // Обработчики для кнопок
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoScroll();
            });
            
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoScroll();
            });
            
            // Обработчики для индикаторов
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const targetIndex = parseInt(dot.dataset.index);
                    currentIndex = targetIndex - 1;
                    nextSlide();
                    resetAutoScroll();
                });
            });
            
            // Сброс автоматической прокрутки при взаимодействии
            function resetAutoScroll() {
                clearInterval(autoScroll);
                autoScroll = setInterval(nextSlide, 3000);
            }
            
            // Остановка прокрутки при наведении мыши
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoScroll);
            });
            
            // Возобновление прокрутки при убирании мыши
            carousel.addEventListener('mouseleave', () => {
                resetAutoScroll();
            });
        });