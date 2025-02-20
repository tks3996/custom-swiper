import Slider from '/slider/js/slider-2.0.3.js';

document.addEventListener("DOMContentLoaded", function () {
    let sliderInstance;

    function getSettings() {
        return {
            media: [
                "./slider/images/1.webp",
                "./slider/images/2.webp",
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
            pagination: document.getElementById("pagination").checked,
            navigation: document.getElementById("navigation").checked,
            autoSlide: document.getElementById("autoSlideInterval").value > 0,
            autoSlideInterval: parseInt(document.getElementById("autoSlideInterval").value) || 2000,
            lazyLoad: document.getElementById("lazyLoad").checked,
            transitionSpeed: parseInt(document.getElementById("transitionSpeed").value) || 700,
            initialSlide: parseInt(document.getElementById("initialSlide").value) || 0,
            showThumbnails: document.getElementById("showThumbnails").checked,
            progressBar: document.getElementById("progressBar").checked,
            loop: document.getElementById("loop").checked,
            cloneSlides: document.getElementById("cloneSlides").checked,
            mouseWheelScroll: document.getElementById("mouseWheelScroll").checked,
            spaceBetween: parseInt(document.getElementById("spaceBetween").value) || 0,
            centeredView: true, // Work in progress, kept as true
            width: document.getElementById("width").value || "100%",
            height: document.getElementById("height").value || "150px",
        };
    }

    function initializeSlider() {
        if (sliderInstance) {
            document.getElementById("custom-carousel").innerHTML = ""; 
        }
        sliderInstance = new Slider('custom-carousel', getSettings());
    }

    function saveSettings() {
        console.log("Applying new settings...");
        console.log("Updated Slider Settings:", getSettings());

        console.log("Settings saved! The slider has been updated.");

        initializeSlider();
    }

    initializeSlider();

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("change", saveSettings);
    });

    window.saveSettings = saveSettings;
});
