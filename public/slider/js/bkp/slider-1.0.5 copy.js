//with clone feature
// thumbnail feature enable/disable
//progress bar
//mousewheel scroll
//centerview
export default class Slider {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);

        this.images = options.images || [];
        this.slidesPerView = options.slidesPerView || { mobile: 1, tablet: 1, desktop: 1 };
        this.progressBarEnabled = options.progressBar ?? false;
        this.pagination = options.pagination ?? true;
        this.navigation = options.navigation ?? true;
        this.autoSlide = options.autoSlide ?? false;
        
        this.shiftMouseWheelScroll = true; 
        this.mouseWheelScroll = options.mouseWheelScroll ?? false;

        if (this.mouseWheelScroll) {
            this.shiftMouseWheelScroll = false; 
        }

        this.isScrolling = false;
        this.centeredView = options.centeredView || false;

        this.autoSlideInterval = options.autoSlideInterval || 3000;
        this.lazyLoad = options.lazyLoad ?? true;
        this.transitionSpeed = options.transitionSpeed || 300;
        this.accessibility = options.accessibility ?? true;
        this.initialSlide = options.initialSlide || 0;
        this.index = this.initialSlide;
        this.cloneSlide = options.cloneSlide ?? false;
        this.centeredView = options.centeredView ?? false;
        this.showThumbnails = options.showThumbnails ?? false;
        this.autoSlideTimer = null;
        this.currentSlidesPerView = this.getSlidesPerView();

        this.spaceBetween = options.spaceBetween || 0;

        this.init();
    }
    init() {
        this.createSlider();
        this.updateSlideWidths()
        this.updateSlidesPerView();
        window.addEventListener("resize", () => {
            this.updateSlidesPerView();
            this.updateSlideWidths();
        });
        if (this.showThumbnails) {
            this.addThumbnailListeners();
            this.updateActiveThumbnail();
        }
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
        // if (this.showThumbnails) {
        //     this.addThumbnailListeners();
        //     this.updateActiveThumbnail();
        // }
        if (this.autoSlide) {
            this.startAutoSlide();
        }
    }
    getSlides() {
        let slides = this.images.map((img, i) =>
            `<div class="slide"><img src="${img}" alt="Slide ${i + 1}" class="slider-image"></div>`
        );
        // if (this.cloneSlide) {
        //     slides = [...slides, ...slides]; 
        //     this.index = this.initialSlide % this.images.length; 
        // }
        // return slides.join('');

        if (this.cloneSlide) slides = [...slides, ...slides];
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
    
        let realIndex = this.index % this.images.length; 
        if (realIndex < 0) realIndex += this.images.length; 
    
        const activeDot = this.paginationContainer.querySelector(`.dot[data-index="${realIndex}"]`);
        if (activeDot) activeDot.classList.add('active');
    }
    
    startAutoSlide() {
        if (!this.autoSlide) return;
        this.stopAutoSlide();
    
        if (!this.cloneSlide && this.index === this.images.length - 1) {
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
            if (!this.cloneSlide && this.index === this.images.length - 1) {
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
    
    
    // key event, touchpad event, mouseweheel, nav icon click,mouse hover & out, 
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
            if (!this.cloneSlide && this.index === this.images.length - 1) {
                e.preventDefault();
            }
        });
    
        this.updateNavigationButtons();
    }

    // thumbnail view
    // getThumbnails() {
    //     return this.images.map((img, i) =>
    //         `<div class="thumbnail ${i === this.index ? 'active' : ''}" data-index="${i}">
    //             <img src="${img}" alt="Thumbnail ${i + 1}">
    //         </div>`
    //     ).join('');
    // }

    getThumbnails() {
        return this.images.map((img, i) => `
            <div class="thumbnail" data-index="${i}">
                <img src="${img}" alt="Thumbnail ${i + 1}">
            </div>`
        ).join('');
    }
    
    updateActiveThumbnail() {
        if (!this.showThumbnails) return;
    
        // Reset all thumbnails
        this.thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
            thumb.style.opacity = "0.5";
        });
    
        // Correct the real index to always be in bounds
        let realIndex = (this.index % this.images.length + this.images.length) % this.images.length;
    
        // Debugging log (optional)
        console.log(`Current index: ${this.index}, Real index: ${realIndex}`);
    
        // Select the active thumbnail
        const activeThumb = this.thumbnailsContainer.querySelector(`.thumbnail[data-index="${realIndex}"]`);
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.style.opacity = "1";
        }
    
        this.scrollThumbnailsToActive();
    }
    
    
    updateProgressBar() {
        if (this.progressBar) {
            let progress = ((this.index + 1) / this.images.length) * 100;
            this.progressBar.style.width = `${progress}%`;
    
           if (!this.cloneSlide && this.index === this.images.length - 1) {
                this.progressBar.style.width = "100%"; // Ensure full progress
                clearInterval(this.autoSlideTimer);
            }
        }
    }
    
    moveSlide(step, instant = false) {
        if (!this.cloneSlide) {
            // Without cloning, wrap around the slides
            if (this.index + step >= this.images.length) {
                this.index = 0;
            } else if (this.index + step < 0) {
                this.index = this.images.length - 1;
            } else {
                this.index += step;
            }
        } else {
            // When cloning, handle index wrapping considering the cloned slides
            this.index += step;
            
            if (this.index < 0) {
                this.index = this.images.length - 1; // Wrap to the last original slide
                this.slidesContainer.style.transition = "none"; 
                this.updateSlideWidths();
                this.slidesContainer.style.transform = `translateX(-${this.getTranslateX()}%)`;
                requestAnimationFrame(() => {
                    this.slidesContainer.style.transition = `transform ${this.transitionSpeed}ms ease-in-out`;
                });
                return;
            }
    
            if (this.index >= this.images.length * 2) {
                this.index = this.images.length; // Wrap to the first cloned slide
                this.slidesContainer.style.transition = "none";
                this.updateSlideWidths();
                this.slidesContainer.style.transform = `translateX(-${this.getTranslateX()}%)`;
                requestAnimationFrame(() => {
                    this.slidesContainer.style.transition = `transform ${this.transitionSpeed}ms ease-in-out`;
                });
                return;
            }
        }
    
        // Perform actual slide movement
        this.slidesContainer.style.transition = instant ? 'none' : `transform ${this.transitionSpeed}ms ease-in-out`;
        this.slidesContainer.style.transform = `translateX(-${this.getTranslateX()}%)`;
        
        this.updatePagination();
        this.updateActiveThumbnail();
        this.updateNavigationButtons();
        this.updateProgressBar();
    
        // Handle auto-slide synchronization with video (if any)
        if (this.autoSlide) {
            if (this.currentVideo) {
                this.autoSlideInterval = setTimeout(() => this.moveSlide(1), this.currentVideo.duration * 1000);
            } else {
                this.startAutoSlide();
            }
        }
    }
    

    
    // centeredView
    getTranslateX() {
        let slidesPerView = this.getSlidesPerView();
        let containerWidth = this.container.clientWidth;
        let totalSpacing = this.spaceBetween * (slidesPerView - 1); // Total space taken by gaps
        let slideWidth = (containerWidth - totalSpacing) / slidesPerView; // Adjusted slide width
    
        let baseTranslateX = this.index * (slideWidth + this.spaceBetween); 
    
        if (this.centeredView) {
            let offset = (slideWidth + this.spaceBetween) / 2;
            baseTranslateX -= offset;
        }
    
        // Ensure the translation is based on the original set of slides, even when clones exist
        let realIndex = (this.index % this.images.length + this.images.length) % this.images.length; // Normalize the index
        return (baseTranslateX / containerWidth) * 100; // Convert to percentage
    }
    
    
    
    
    updateSlideWidths() {
        const slides = this.slidesContainer.children;
        const slidesPerView = this.getSlidesPerView();
        const totalSpacing = this.spaceBetween * (slidesPerView - 1); // Total space used by gaps
        
        // ✅ Adjust width to ensure slides fit within container width
        const slideWidth = (this.container.clientWidth - totalSpacing) / slidesPerView;
    
        Array.from(slides).forEach((slide, index) => {
            slide.style.width = `${slideWidth}px`;
            slide.style.marginRight = index < slides.length - 1 ? `${this.spaceBetween}px` : '0px';
        });
    }
    
    
    updateNavigationButtons() {
        if (!this.cloneSlide) {
            if (this.prevButton) this.prevButton.style.display = this.index === 0 ? 'none' : 'block';
            if (this.nextButton) this.nextButton.style.display = this.index === this.images.length - 1 ? 'none' : 'block';

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
                this.index = index;
                this.moveSlide(0, true);
            });
        });
    }
    

    
    
}
