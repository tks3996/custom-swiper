export default class Slider {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.images = options.images || [];
        this.slidesPerView = options.slidesPerView || { mobile: 1.2, tablet: 2, desktop: 3 };
        this.pagination = options.pagination ?? true;
        this.navigation = options.navigation ?? true;
        this.autoSlideInterval = options.autoSlideInterval || 3000;
        this.transitionSpeed = options.transitionSpeed || 300;

        this.initialSlide = options.initialSlide || 0;
        this.index = this.initialSlide;
        this.autoSlide = null;
        this.currentSlidesPerView = this.getSlidesPerView();

        this.init();
    }


    init() {

        this.initLazyLoad();
        this.createSlider();
        this.updateSlidesPerView();
        this.addEventListeners();
        this.startAutoSlide();


        const slideWidth = 100 / this.getSlidesPerView();
        this.index = this.initialSlide;

        requestAnimationFrame(() => {
            this.slidesContainer.style.transition = 'none';
            this.slidesContainer.style.transform = `translateX(-${(this.index + 1) * slideWidth}%)`;
        });

        this.updatePagination();
        this.moveSlide(step, true);
        window.addEventListener('resize', () => this.updateSlidesPerView());
    }


    createSlider() {
        this.container.innerHTML = `
            <div class="slider">
                <div class="slides">
                    ${this.getClonedSlides()}  
                </div>
                ${this.navigation ? `<button class="prev">&#10094;</button><button class="next">&#10095;</button>` : ''}
                ${this.pagination ? `<div class="pagination"></div>` : ''}
            </div>
        `;

        this.slidesContainer = this.container.querySelector('.slides');
        this.prevButton = this.container.querySelector('.prev');
        this.nextButton = this.container.querySelector('.next');
        this.paginationContainer = this.container.querySelector('.pagination');

        if (this.pagination) {
            this.createPaginationDots();
        }

        this.updatePagination();


        this.index = 1;
        const slideWidth = 100 / this.getSlidesPerView();
        requestAnimationFrame(() => {
            this.slidesContainer.style.transition = 'none';
            this.slidesContainer.style.transform = `translateX(-${slideWidth}%)`;
        });
    }





    getClonedSlides() {
        const slidesPerView = Math.ceil(this.getSlidesPerView());
        let slidesHTML = '';

        for (let i = this.images.length - slidesPerView; i < this.images.length; i++) {
            slidesHTML += `<div class="slide"><img src="${this.images[i]}" loading="lazy"></div>`;
        }

        slidesHTML += this.images.map(img => `<div class="slide"><img src="${img}" loading="lazy"></div>`).join('');

        for (let i = 0; i < slidesPerView; i++) {
            slidesHTML += `<div class="slide"><img src="${this.images[i]}" loading="lazy"></div>`;
        }

        return slidesHTML;
    }


    // lazy load optimization
    initLazyLoad() {
        const lazyImages = this.container.querySelectorAll('.lazy-load');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    }





    getSlidesPerView() {
        const width = window.innerWidth;
        if (width < 768) return this.slidesPerView.mobile;
        if (width < 1024) return this.slidesPerView.tablet;
        return this.slidesPerView.desktop;
    }

    updateSlidesPerView() {
        this.currentSlidesPerView = this.getSlidesPerView();
        document.documentElement.style.setProperty('--slidesPerView', this.currentSlidesPerView);
        this.updateSlider();
    }

    moveSlide(step, freeMode = false) {
        this.index += step;
        if (freeMode) {
            this.slidesContainer.style.transition = 'none';
        } else {
            this.slidesContainer.style.transition = `transform ${this.transitionSpeed}ms ease-in-out`;
        }
        this.updateSlider(true);
        this.restartAutoSlide();
    }


    updateSlider(smooth = true) {
        const slidesPerView = this.getSlidesPerView();
        const slideWidth = 100 / slidesPerView;

        this.slidesContainer.style.transition = smooth ? `transform ${this.transitionSpeed}ms ease-in-out` : 'none';
        this.slidesContainer.style.transform = `translateX(-${(this.index + 1) * slideWidth}%)`;

        this.updatePagination();

        setTimeout(() => {
            if (this.index >= this.images.length) {
                this.slidesContainer.style.transition = 'none';
                this.index = 0;
                this.slidesContainer.style.transform = `translateX(-${slideWidth}%)`;
            } else if (this.index < 0) {
                this.slidesContainer.style.transition = 'none';
                this.index = this.images.length - 1;
                this.slidesContainer.style.transform = `translateX(-${(this.index + 1) * slideWidth}%)`;
            }
        }, this.transitionSpeed);
    }



    createPaginationDots() {
        this.paginationContainer.innerHTML = '';
        this.images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = i;
            this.paginationContainer.appendChild(dot);
        });
    }

    updatePagination() {
        if (!this.pagination) return;

        this.paginationContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        let activeIndex = (this.index - 1 + this.images.length) % this.images.length;

        this.paginationContainer.querySelector(`.dot[data-index="${activeIndex}"]`)?.classList.add('active');
    }


    startAutoSlide() {
        if (this.autoSlideInterval) {
            this.autoSlide = setInterval(() => this.moveSlide(1), this.autoSlideInterval);
        }
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    addEventListeners() {
        if (this.navigation) {
            this.prevButton.addEventListener('click', () => this.moveSlide(-1));
            this.nextButton.addEventListener('click', () => this.moveSlide(1));
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.moveSlide(-1);
            if (e.key === 'ArrowRight') this.moveSlide(1);
        });

        // Accessibility for Screen Readers
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Image Slider');
        this.container.querySelectorAll('.slide img').forEach(img => {
            img.setAttribute('role', 'img');
            img.setAttribute('aria-hidden', 'false');
        });
    }

}
