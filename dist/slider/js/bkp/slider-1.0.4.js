//with clone feature
// thumbnail feature enable/disable
//progress bar
//mousewheel scroll
export default class Slider {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);

        this.images = options.images || [];
        this.slidesPerView = options.slidesPerView || { mobile: 1, tablet: 1, desktop: 1 };
        this.progressBarEnabled = options.progressBar ?? false;
        this.pagination = options.pagination ?? true;
        this.navigation = options.navigation ?? true;
        this.autoSlide = options.autoSlide ?? false;
        
        this.shiftMouseWheelScroll = true; // Always true unless overridden
        this.mouseWheelScroll = options.mouseWheelScroll ?? false; // Default: false

        if (this.mouseWheelScroll) {
            this.shiftMouseWheelScroll = false; // Overwrites shift scroll
        }

        this.isScrolling = false;

        this.autoSlideInterval = options.autoSlideInterval || 3000;
        this.lazyLoad = options.lazyLoad ?? true;
        this.transitionSpeed = options.transitionSpeed || 300;
        this.accessibility = options.accessibility ?? true;
        this.initialSlide = options.initialSlide || 0;
        this.loopSlide = options.loop ?? false;
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
        this.updateNavigationButtons();
        this.updateProgressBar();
    }
    createSlider() {
        this.container.innerHTML = `
            <div class="slider">
                ${this.progressBarEnabled ? '<div class="progress-bar"></div>' : ''}
                <div class="slides">${this.getSlides()}</div>
                ${this.navigation ? '<button class="prev">&#10094;</button><button class="next">&#10095;</button>' : ''}
                ${this.pagination ? '<div class="pagination"></div>' : ''}
            </div>
            ${this.showThumbnails ? `<div class="thumbnails-wrapper"><div class="thumbnails">${this.getThumbnails()}</div></div>` : ''}
        `;
        this.slidesContainer = this.container.querySelector('.slides');
        this.progressBar = this.container.querySelector('.progress-bar');
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
        if (this.autoSlide) {
            this.startAutoSlide();
        }
    }
    getSlides() {
        let slides = this.images.map((img, i) =>
            `<div class="slide"><img src="${img}" alt="Slide ${i + 1}" class="slider-image"></div>`
        );
        if (this.loopSlide) {
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
    
        // Reset all pagination dots
        this.paginationContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    
        // Ensure correct index mapping for cloned slides
        let realIndex = this.index % this.images.length; // Normalize index
        if (realIndex < 0) realIndex += this.images.length; // Ensure positive index
    
        const activeDot = this.paginationContainer.querySelector(`.dot[data-index="${realIndex}"]`);
        if (activeDot) activeDot.classList.add('active');
    }
    
    startAutoSlide() {
        if (!this.autoSlide) return;
        this.stopAutoSlide();
    
        if (!this.loopSlide && this.index === this.images.length - 1) {
            return;
        }
    
        if (this.progressBarEnabled && this.progressBar) {
            const interval = this.autoSlideInterval;
            this.progressBar.style.transition = "none";
            this.progressBar.style.width = "0%";
            setTimeout(() => {
                this.progressBar.style.transition = `width ${interval}ms linear`;
                this.progressBar.style.width = "100%";
            }, 10);
        }
    
        this.autoSlideTimer = setInterval(() => {
            if (!this.loopSlide && this.index === this.images.length - 1) {
                clearInterval(this.autoSlideTimer);
                return;
            }
            this.moveSlide(1);
        }, this.autoSlideInterval);
    }
    
    
    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
    }
    handleMouseScroll(e) {
        if (this.isScrolling) return;
    
        const isShiftActive = e.shiftKey && this.shiftMouseWheelScroll;
        const isNormalScroll = this.mouseWheelScroll && !e.shiftKey;
    
        if (isShiftActive || isNormalScroll) {
            const direction = e.deltaY > 0 ? 1 : -1;
    
            // 🔴 FIX: Prevent scrolling past first/last slide when loop is false
            if (!this.loopSlide) {
                if ((this.index === 0 && direction === -1) || 
                    (this.index === this.images.length - 1 && direction === 1)) {
                    return; // Stop scrolling
                }
            }
    
            this.isScrolling = true;
            this.moveSlide(direction);
    
            setTimeout(() => {
                this.isScrolling = false;
            }, 300); // Prevent rapid scrolling
        }
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
        
                if (!this.loopSlide) {
                    // Prevent moving beyond first and last slides when loop is disabled
                    if (e.key === 'ArrowLeft' && this.index === 0) return;
                    if (e.key === 'ArrowRight' && this.index === this.images.length - 1) return;
                }
        
                // Move slide normally
                if (e.key === 'ArrowLeft') this.moveSlide(-1);
                if (e.key === 'ArrowRight') this.moveSlide(1);
            }
        });
        
        this.container.addEventListener('wheel', (e) => this.handleMouseScroll(e));
        
        

        this.container.addEventListener('contextmenu', (e) => {
            if (!this.loopSlide && this.index === this.images.length - 1) {
                e.preventDefault();
            }
        });
    
        this.updateNavigationButtons();
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
    
        // Remove active state from all thumbnails
        this.thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
            thumb.style.opacity = "0.5";
        });
    
        // Correct index mapping for cloned slides
        let realIndex = this.index % this.images.length;
        if (realIndex < 0) realIndex += this.images.length; // Ensure positive index
    
        const activeThumb = this.thumbnailsContainer.querySelector(`.thumbnail[data-index="${realIndex}"]`);
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.style.opacity = "1";
        }
    
        this.scrollThumbnailsToActive();
    }
    
    // progress bar
    updateProgressBar() {
        if (this.progressBar) {
            let progress = ((this.index + 1) / this.images.length) * 100;
            this.progressBar.style.width = `${progress}%`;
    
            // Stop progress bar at the last slide if clone is false
            if (!this.loopSlide && this.index === this.images.length - 1) {
                this.progressBar.style.width = "100%"; // Ensure full progress
                clearInterval(this.autoSlideTimer); // Stop auto-slide
            }
        }
    }
    
    moveSlide(step, instant = false) {
        if (!this.loopSlide) {
            // Normal non-loop behavior
            if (this.index + step >= this.images.length) {
                this.index = 0;
            } else if (this.index + step < 0) {
                this.index = this.images.length - 1;
            } else {
                this.index += step;
            }
        } else {
            // Looping logic
            this.index += step;
    
            // If reaching the first slide and clicking "Previous", move instantly to the last cloned slide
            if (this.index < 0) {
                this.index = this.images.length - 1;
                this.slidesContainer.style.transition = "none"; // Remove animation for instant jump
                this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
                setTimeout(() => {
                    this.slidesContainer.style.transition = `transform ${this.transitionSpeed}ms ease-in-out`;
                }, 10);
                return;
            }
    
            // If reaching the last slide and clicking "Next", move instantly to the first cloned slide
            if (this.index >= this.images.length * 2) {
                this.index = this.images.length;
                this.slidesContainer.style.transition = "none"; // Remove animation for instant jump
                this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
                setTimeout(() => {
                    this.slidesContainer.style.transition = `transform ${this.transitionSpeed}ms ease-in-out`;
                }, 10);
                return;
            }
        }
    
        // Apply transformation
        this.slidesContainer.style.transition = instant ? 'none' : `transform ${this.transitionSpeed}ms ease-in-out`;
        this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
    
        // Update UI elements
        this.updatePagination();
        this.updateActiveThumbnail();
        this.updateNavigationButtons();
        this.updateProgressBar();
    
        // Restart autoSlide if enabled
        if (this.autoSlide) {
            this.startAutoSlide();
        }
    }
    
    
    
    
    updateNavigationButtons() {
        if (!this.loopSlide) {
            if (this.prevButton) this.prevButton.style.display = this.index === 0 ? 'none' : 'block';
            if (this.nextButton) this.nextButton.style.display = this.index === this.images.length - 1 ? 'none' : 'block';
    
            // Disable right-click on last slide
            if (this.index === this.images.length - 1) {
                this.container.addEventListener('contextmenu', (e) => e.preventDefault());
            } else {
                this.container.removeEventListener('contextmenu', (e) => e.preventDefault());
            }
        }
    }
    
    
    scrollThumbnailsToActive() {
        if (!this.thumbnailsContainer) return;
        const wrapper = this.thumbnailsContainer.parentElement;
        const wrapperWidth = wrapper.clientWidth;
        const thumbnails = Array.from(this.thumbnailsContainer.children);
        const totalThumbnails = thumbnails.length;
        if (totalThumbnails === 0) return;
        const thumbWidth = thumbnails[0].clientWidth + 10; // Include margin
    
        let realIndex = this.index % this.images.length; // Normalize index for cloned slides
        if (realIndex < 0) realIndex += this.images.length;
    
        const totalThumbnailsWidth = totalThumbnails * thumbWidth;
    
        // Case 1: If thumbnails fit within the screen, center them
        if (totalThumbnailsWidth <= wrapperWidth) {
            this.thumbnailsContainer.style.justifyContent = "center";
            this.thumbnailsContainer.style.display = "flex";
            this.thumbnailsContainer.style.scrollBehavior = "auto"; // Disable scrolling
        } else {
            // Case 2: Allow scrolling when thumbnails exceed screen width
            this.thumbnailsContainer.style.justifyContent = "flex-start";
            this.thumbnailsContainer.style.display = "flex";
            this.thumbnailsContainer.style.scrollBehavior = "smooth"; // Enable smooth scrolling
    
            // Find the active thumbnail
            const activeThumb = this.thumbnailsContainer.querySelector(`.thumbnail[data-index="${realIndex}"]`);
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
                this.index = index; // Ensure index is set directly
                this.moveSlide(0, true); // Force update without unnecessary shift
            });
        });
    }
    
}
