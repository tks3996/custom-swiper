//with clone feature
// thumbnail feature enable/disable
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
        this.showThumbnails = options.showThumbnails ?? false;

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
            ${this.showThumbnails ? `<div class="thumbnails-wrapper"><div class="thumbnails">${this.getThumbnails()}</div></div>` : ''}
        `;

        this.slidesContainer = this.container.querySelector('.slides');
        this.prevButton = this.container.querySelector('.prev');
        this.nextButton = this.container.querySelector('.next');
        this.paginationContainer = this.container.querySelector('.pagination');
        this.thumbnailsContainer = this.container.querySelector('.thumbnails');

        if (this.pagination) this.createPaginationDots();
        this.updatePagination();
        this.moveSlide(0, true);

        if (this.showThumbnails) {
            this.addThumbnailListeners();
            this.updateActiveThumbnail();
        }
    }


    getSlides() {
        let slides = this.images.map((img, i) =>
            `<div class="slide"><img src="${img}" alt="Slide ${i + 1}" class="slider-image"></div>`
        );

        if (this.cloneSlides) {
            slides = [...slides, ...slides]; // Clone images
            this.index = this.initialSlide % this.images.length; // Adjust index
        }

        return slides.join('');
    }



    initLazyLoad() {
        const images = this.container.querySelectorAll('.slider-image');

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





    createPaginationDots() {
        this.paginationContainer.innerHTML = this.images
            .map((_, i) => `<div class="dot" data-index="${i}"></div>`)
            .join('');
    
        this.paginationContainer.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index, 10);
                this.moveSlide(index - this.index, true);
            });
        });
    }
    


    updatePagination() {
        if (!this.pagination) return;
        this.paginationContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        const activeDot = this.paginationContainer.querySelector(`.dot[data-index="${this.index}"]`);
        if (activeDot) activeDot.classList.add('active');
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

    // thumbnail view
    getThumbnails() {
        return this.images.map((img, i) =>
            `<div class="thumbnail ${i === this.index ? 'active' : ''}" data-index="${i}">
                <img src="${img}" alt="Thumbnail ${i + 1}">
            </div>`
        ).join('');
    }

    updateActiveThumbnail() {
        if (!this.showThumbnails) return;

        this.thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
            thumb.style.opacity = "0.5"; // Inactive thumbnails look dimmed
        });

        const activeThumb = this.thumbnailsContainer.querySelector(`.thumbnail[data-index="${this.index}"]`);
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.style.opacity = "1"; // Active thumbnail is fully visible
        }

        this.scrollThumbnailsToActive();
    }

    moveSlide(step, instant = false) {
        this.index = (this.index + step + this.images.length) % this.images.length;
        this.slidesContainer.style.transition = instant ? 'none' : `transform ${this.transitionSpeed}ms ease-in-out`;
        this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
        this.updatePagination();
        this.updateActiveThumbnail();
    }

    scrollThumbnailsToActive() {
        if (!this.thumbnailsContainer) return;
    
        const wrapper = this.thumbnailsContainer.parentElement;
        const wrapperWidth = wrapper.clientWidth;
        const thumbnails = Array.from(this.thumbnailsContainer.children);
        
        const totalThumbnails = thumbnails.length;
        if (totalThumbnails === 0) return;
    
        const thumbWidth = thumbnails[0].clientWidth + 10; // Include margin
        const totalThumbnailsWidth = totalThumbnails * thumbWidth;
    
        // Case 1: If thumbnails fit within the screen, center the container
        if (totalThumbnailsWidth <= wrapperWidth) {
            this.thumbnailsContainer.style.justifyContent = "center";
            this.thumbnailsContainer.style.display = "flex";
            this.thumbnailsContainer.style.scrollBehavior = "auto"; // Disable scrolling
        } else {
            // Case 2: If thumbnails exceed the screen width, allow scrolling from left
            this.thumbnailsContainer.style.justifyContent = "flex-start";
            this.thumbnailsContainer.style.display = "flex";
            this.thumbnailsContainer.style.scrollBehavior = "smooth"; // Enable smooth scrolling
    
            // Find active thumbnail
            const activeThumb = this.thumbnailsContainer.querySelector('.thumbnail.active');
            if (!activeThumb) return;
    
            const activeIndex = thumbnails.indexOf(activeThumb);
            const visibleCount = Math.floor(wrapperWidth / thumbWidth);
    
            if (activeIndex === 0) {
                this.thumbnailsContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else if (activeIndex >= totalThumbnails - visibleCount) {
                this.thumbnailsContainer.scrollTo({
                    left: this.thumbnailsContainer.scrollWidth - wrapperWidth,
                    behavior: 'smooth'
                });
            } else {
                this.thumbnailsContainer.scrollTo({
                    left: thumbWidth * activeIndex - wrapperWidth / 2 + thumbWidth / 2,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    
    
    

    addThumbnailListeners() {
        this.thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index, 10);
                this.moveSlide(index - this.index, true);
            });
        });
    }

    
}
