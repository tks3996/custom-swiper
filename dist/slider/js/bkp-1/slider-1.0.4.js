//with clone feature
// thumbnail feature enable/disable
//progress bar
//loop
//mouse event added 
export default class Slider {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.images = options.images || [];
        this.slidesPerView = options.slidesPerView || { mobile: 1, tablet: 1, desktop: 1 };
        this.progressBarEnabled = options.progressBar ?? false;
        this.pagination = options.pagination ?? true;
        this.navigation = options.navigation ?? true;
        this.autoSlide = options.autoSlide ?? false;
        this.loop = options.loop ?? true;


        this.shiftMouseWheelScroll = true; 
        this.mouseWheelScroll = options.mouseWheelScroll ?? false;

        if (this.mouseWheelScroll) {
            this.shiftMouseWheelScroll = false; 
        }


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
        if (this.cloneSlides) {
            slides = [...slides, ...slides, ...slides]; // Clone images three times for continuous looping
            this.index = this.initialSlide % this.images.length; // Adjust index for cloned slides
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
    
        // Adjust index mapping for cloned slides
        let realIndex = this.index % this.images.length;
        if (realIndex < 0) realIndex += this.images.length; // Ensure positive index
    
        const activeDot = this.paginationContainer.querySelector(`.dot[data-index="${realIndex}"]`);
        if (activeDot) activeDot.classList.add('active');
    }
    
    
    startAutoSlide() {
        if (!this.autoSlide) return;
        this.stopAutoSlide(); // Clear any existing timer
    
        // If cloning slides and looping, there’s no need to check for the last slide.
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
            if (this.cloneSlides && this.loop) {
                // With cloned slides and looping, don't check for the last slide, just keep looping
                this.moveSlide(1);  // Seamless looping
            } else if (!this.cloneSlides && !this.loop && this.index === this.images.length - 1) {
                clearInterval(this.autoSlideTimer); // Stop auto-slide at the last slide if looping is off
            } else {
                this.moveSlide(1);  // Move to the next slide
            }
        }, this.autoSlideInterval);
    }
    
    
    
    
    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
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
    
            // Stop progress bar at the last slide if loop & clone are false
            if (!this.cloneSlides && !this.loop && this.index === this.images.length - 1) {
                this.progressBar.style.width = "100%"; // Ensure full progress
                clearInterval(this.autoSlideTimer); // Stop auto-slide
            }
        }
    }
    
    moveSlide(step, instant = false) {
        // Handle both normal slides and cloned slides
        if (this.cloneSlides && this.loop) {
            // Seamless loop: Ensure the index wraps around properly for cloned slides
            this.index += step;
        
            // If the index goes beyond the number of cloned slides, loop back to the first slide
            if (this.index >= this.images.length * 2) {
                this.index = 0;  // Loop back to the beginning
            } else if (this.index < 0) {
                this.index = this.images.length * 2 - 1;  // Loop back to the end
            }
        } else if (this.loop) {
            // Non-clone loop: Simply loop within the actual number of images
            this.index += step;
        
            // Ensure looping within bounds of the images array
            if (this.index >= this.images.length) {
                this.index = 0;  // Loop back to the first slide
            } else if (this.index < 0) {
                this.index = this.images.length - 1;  // Loop back to the last slide
            }
        } else {
            // No cloning and no looping, just move within the bounds
            this.index += step;
            if (this.index < 0) {
                this.index = 0;
            } else if (this.index >= this.images.length) {
                this.index = this.images.length - 1;
            }
        }
        
        // Set transition style for smooth sliding
        this.slidesContainer.style.transition = instant ? 'none' : `transform ${this.transitionSpeed}ms ease-in-out`;
        
        // Move slides
        this.slidesContainer.style.transform = `translateX(-${this.index * (100 / this.getSlidesPerView())}%)`;
        
        // Update everything after slide movement
        this.updatePagination();
        this.updateActiveThumbnail();
        this.updateNavigationButtons();
        this.updateProgressBar();
        
        // Restart auto-slide if it's enabled
        if (this.autoSlide) {
            this.startAutoSlide();
        }
    }
    
    
    
    

    
    
    updateNavigationButtons() {
        if (this.cloneSlides && this.loop) {
            // Always show the navigation buttons when cloning and looping
            if (this.prevButton) this.prevButton.style.display = 'block';
            if (this.nextButton) this.nextButton.style.display = 'block';
        } else {
            // Handle visibility when cloning or looping is not active
            if (this.prevButton) {
                this.prevButton.style.display = this.index === 0 ? 'none' : 'block';
            }
            if (this.nextButton) {
                this.nextButton.style.display = this.index === this.images.length - 1 ? 'none' : 'block';
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
                this.moveSlide(index - this.index, true);
            });
        });
    }



    // mouse event

    handleMouseScroll(e) {
        if (this.isScrolling) return;
    
        const isShiftActive = e.shiftKey && this.shiftMouseWheelScroll;
        const isNormalScroll = this.mouseWheelScroll && !e.shiftKey;
    
        if (isShiftActive || isNormalScroll) {
            const direction = e.deltaY > 0 ? 1 : -1;
    
            if (!this.cloneSlide) {
                if ((this.index === 0 && direction === -1) || 
                    (this.index === this.images.length - 1 && direction === 1)) {
                    return;
                }
            }
    
            this.isScrolling = true;
            this.moveSlide(direction);
    
            setTimeout(() => {
                this.isScrolling = false;
            }, 300);
        }
    }
    
    handleTouchpadSwipe(e) {
        
        if (this.mouseWheelScroll) return; 
        
        console.log('hello');
        if (Math.abs(e.deltaX) > 50 && !this.isSwiping) { 
            e.preventDefault();
            this.isSwiping = true; 
            
            const direction = e.deltaX > 0 ? 1 : -1;
            
            if (!this.cloneSlide) {
                if ((this.index === 0 && direction === -1) || 
                    (this.index === this.images.length - 1 && direction === 1)) {
                    this.isSwiping = false;
                    return;
                }
            }
    
            this.moveSlide(direction);
    
            setTimeout(() => {
                this.isSwiping = false;
            }, 300); 
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
        
                if (!this.cloneSlide) {
                    
                    if (e.key === 'ArrowLeft' && this.index === 0) return;
                    if (e.key === 'ArrowRight' && this.index === this.images.length - 1) return;
                }
        
                if (e.key === 'ArrowLeft') this.moveSlide(-1);
                if (e.key === 'ArrowRight') this.moveSlide(1);
            }
        });

        this.container.addEventListener('wheel', (e) => this.handleMouseScroll(e));
        this.container.addEventListener('wheel', (e) => this.handleTouchpadSwipe(e));

        this.container.addEventListener('contextmenu', (e) => {
            if (!this.cloneSlides && !this.loop && this.index === this.images.length - 1) {
                e.preventDefault();
            }
        });
    
        this.updateNavigationButtons();
    }
}
