        document.addEventListener('DOMContentLoaded', function() {
            const backToTopButton = document.getElementById('back-to-top');
            const header = document.getElementById('header');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            document.getElementById('year').textContent = new Date().getFullYear();

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
                    header.classList.add('shadow-lg');
                } else {
                    backToTopButton.classList.add('opacity-0', 'pointer-events-none');
                    header.classList.remove('shadow-lg');
                }
            });

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            const carousel = document.getElementById('seminar-carousel');
            const track = document.getElementById('seminar-track');
            if (track) {
                const slides = Array.from(track.children);
                const nextButton = document.getElementById('next-seminar');
                const prevButton = document.getElementById('prev-seminar');
                let currentIndex = 0;
                let intervalId = null;

                const updateCarousel = () => {
                    if (slides.length === 0) return;
                    const carouselWidth = carousel.offsetWidth;
                    const slideWidth = slides[0].offsetWidth;
                    const offset = -currentIndex * slideWidth + (carouselWidth - slideWidth) / 2;
                    track.style.transform = `translateX(${offset}px)`;

                    slides.forEach((slide, index) => {
                        slide.classList.toggle('is-active', index === currentIndex);
                    });
                };

                const moveToNextSlide = () => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateCarousel();
                };

                const startCarouselInterval = () => {
                    if (intervalId) clearInterval(intervalId);
                    intervalId = setInterval(moveToNextSlide, 5000);
                };

                nextButton.addEventListener('click', () => {
                    moveToNextSlide();
                    startCarouselInterval();
                });

                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    updateCarousel();
                    startCarouselInterval();
                });
                
                window.addEventListener('resize', updateCarousel);
                
                window.addEventListener('load', () => {
                    updateCarousel();
                    startCarouselInterval();
                });
            }
        });