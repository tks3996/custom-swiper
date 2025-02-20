/*** 
 
 * This slider has been implemented as a component using a constructor.  
 * For the full code, refer to 👇
 
   path: /slider/js/slider-2.0.2.js.

*/

import Slider from '/slider/js/slider-2.0.3.js';
const slider = new Slider('custom-carousel', {
    media: [
        "./slider/images/1.webp",
        "./slider/images/2.webp",
        // "https://www.youtube.com/watch?v=MIJt9H69QVc",
        // "https://www.youtube.com/watch?v=sJ9kSzMbMRY",
        "./slider/images/3.webp",
        "./slider/images/4.webp",
        "./slider/images/5.webp",
        "./slider/images/6.webp",
        "./slider/images/7.webp",
        "./slider/images/8.webp",
        "./slider/images/6.webp",
        "./slider/images/7.webp",
        "./slider/images/8.webp",

        "./slider/images/8.webp",
        "./slider/images/6.webp",
        "./slider/images/7.webp",
        "./slider/images/8.webp",
    ],
    slidesPerView: {
        mobile: 1,
        tablet: 1,
        desktop: 1
    },


    pagination: true,           // Enable/Disable pagination  
    navigation: true,           // Enable/Disable navigation buttons  
    autoSlideInterval: 2000,    // Auto-slide speed (if enabled)  
    lazyLoad: true,             // Enable/Disable lazy loading of images  

    transitionSpeed: 700,       // Transition speed for slides  
    initialSlide: 5,            //initial slide image
    showThumbnails: true,      //thumbanil view for slides
    progressBar: true,         //progressbar

    autoSlide: true,          // Enable/Disable auto-slide  
    
    cloneSlides: true,                // Enable clone whle slide for seemless slide
    mouseWheelScroll: false,        //if enable vertical mouse scroll will work
    
    spaceBetween: 0,        //gap between images by pixel
    
    centeredView: true,        //center view img will activate - work in progress..
    
    
    loop: true,
    width: "100%",  //set the slider width
    height: "inherit",  //set the height


});


