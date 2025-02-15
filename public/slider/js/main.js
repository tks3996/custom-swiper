// import Slider from '/slider/slider.js';
// import Slider from '/slider/js/slider-1.0.2.js';

import Slider from '/slider/js/slider-2.0.0.js';

// import Slider from '/slider/js/test.5.js';
const slider = new Slider('custom-carousel', {
    images: [
        "./slider/images/1.webp",
        "./slider/images/3.webp",
        "./slider/images/4.webp",
        "./slider/images/5.webp",
        "./slider/images/6.webp",
        "./slider/images/7.webp",
        "./slider/images/8.webp",
        
        
    ],
    slidesPerView: {
        mobile: 1,
        tablet: 1,
        desktop: 1   },
    
    //Features with Enable/Disable Options

    pagination: true,           // Enable/Disable pagination  
    navigation: true,           // Enable/Disable navigation buttons  
    autoSlideInterval: 1300,    // Auto-slide speed (if enabled)  
    lazyLoad: true,             // Enable/Disable lazy loading of images  
    freeMode: true,             // Enable/Disable free drag mode  
    
    transitionSpeed: 300,       // Transition speed for slides  
    accessibility: true,        // Enable/Disable accessibility features 
    initialSlide: 0,            //initial slide image
    showThumbnails: true,      //thumbanil view for slides
    progressBar: true,         //progressbar
    
    autoSlide: true,          // Enable/Disable auto-slide  
    loop: true,
    
    cloneSlides: true,                // Enable clone whle slide for seemless slide
    mouseWheelScroll: false,        //if enable vertical mouse scroll will work
    
    spaceBetween: 0,        //gap between images by pixel
    
    // centeredView: true,        //center view img will activate - work in progress..

});