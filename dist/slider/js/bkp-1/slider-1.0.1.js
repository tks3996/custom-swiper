//with clone feature enable/disable
export default class Slider {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.images = options.images || [];
        this.slidesPerView = options.slidesPerView || { mobile: 1, tablet: 1, desktop: 1 };
        this.pagination = options.pagination ?? true;
        this.navigation = options.navigation ?? true;
        this.autoSlide = options.autoSlide ?? false;
        this.autoSlideInterval = options.autoSlideInterval || 3000;
        this.lazyLoad = options.lazyLoad ?? true;
        this.transitionSpeed = options.transitionSpeed || 300; 
        this.accessibility = options.accessibility ?? true;
        this.initialSlide = options.initialSlide || 0;
        this.cloneSlides = options.cloneSlides ?? false;
        this.centeredView = options.centeredView ?? false;

        
        this.index = this.initialSlide;
        this.autoSlideTimer = null;
        this.currentSlidesPerView = this.getSlidesPerView();
        
        this.init();
    }

    init() {
        this.createSlider();
        this.updateSlidesPerView();
        this.addEventListeners();
        if (this.lazyLoad) this.initLazyLoad();
        if (this.autoSlide) this.startAutoSlide();
    }

    createSlider() {
        this.container.innerHTML = `
            <div class="slider">
                <div class="slides">${this.getSlides()}</div>
                ${this.navigation ? '<button class="prev">&#10094;</button><button class="next">&#10095;</button>' : ''}
                ${this.pagination ? '<div class="pagination"></div>' : ''}
            </div>
        `;

        this.slidesContainer = this.container.querySelector('.slides');
        this.prevButton = this.container.querySelector('.prev');
        this.nextButton = this.container.querySelector('.next');
        this.paginationContainer = this.container.querySelector('.pagination');

        if (this.pagination) this.createPaginationDots();
        this.updatePagination();
        this.moveSlide(0, true);
    }

    getSlides() {
        let slides = this.images.map((img, i) => `<div class="slide"><img src="${img}" loading="lazy" alt="Slide ${i + 1}"></div>`);
        
        if (this.cloneSlides) {
            slides = [...slides, ...slides];
        }
        
        return slides.join('');
    }

    initLazyLoad() {
        const images = this.container.querySelectorAll('img');
        images.forEach(img => img.setAttribute('loading', 'lazy'));
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
    }

    moveSlide(step, instant = false) {
        this.index = (this.index + step + this.images.length) % this.images.length;
        this.slidesContainer.style.transition = instant ? 'none' : `transform ${this.transitionSpeed}ms ease-in-out`;
        this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
        this.updatePagination();
    }

    createPaginationDots() {
        this.paginationContainer.innerHTML = this.images.map((_, i) => `<div class="dot" data-index="${i}"></div>`).join('');
    }

    updatePagination() {
        if (!this.pagination) return;
        this.paginationContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        this.paginationContainer.querySelector(`.dot[data-index="${this.index}"]`)?.classList.add('active');
    }

    startAutoSlide() {
        if (this.autoSlide) {
            this.stopAutoSlide();
            this.autoSlideTimer = setInterval(() => this.moveSlide(1), this.autoSlideInterval);
        }
    }
    
    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
    }
    
    addEventListeners() {
        if (this.navigation) {
            this.prevButton.addEventListener('click', () => this.moveSlide(-1));
            this.nextButton.addEventListener('click', () => this.moveSlide(1));
        }
    
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    
        document.addEventListener('keydown', (e) => {
            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                if (e.key === 'ArrowLeft') this.moveSlide(-1);
                if (e.key === 'ArrowRight') this.moveSlide(1);
            }
        });
    }
}
