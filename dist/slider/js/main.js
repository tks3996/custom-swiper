import Slider from '/slider/js/slider-2.0.3.js';

document.addEventListener("DOMContentLoaded", function () {
    let sliderInstance;

    function getSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("sliderSettings"));
        return savedSettings || {
            media: [
                "./slider/images/1.webp",
                "./slider/images/2.webp",
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
                desktop: 2
            },
            pagination: true,
            navigation: true,
            autoSlide: true,
            autoSlideInterval: 2000,
            lazyLoad: true,
            transitionSpeed: 700,
            initialSlide: 0,
            showThumbnails: true,
            progressBar: true,
            loop: true,
            cloneSlides: true,
            mouseWheelScroll: false,
            spaceBetween: 0,
            centeredView: true,
            width: "100%",
            height: "150px",
        };
    }

    function applySettingsToUI(settings) {
        document.getElementById("pagination").checked = settings.pagination;
        document.getElementById("navigation").checked = settings.navigation;
        document.getElementById("autoSlideInterval").value = settings.autoSlideInterval;
        document.getElementById("lazyLoad").checked = settings.lazyLoad;
        document.getElementById("transitionSpeed").value = settings.transitionSpeed;
        document.getElementById("initialSlide").value = settings.initialSlide;
        document.getElementById("showThumbnails").checked = settings.showThumbnails;
        document.getElementById("progressBar").checked = settings.progressBar;
        document.getElementById("loop").checked = settings.loop;
        document.getElementById("cloneSlides").checked = settings.cloneSlides;
        document.getElementById("mouseWheelScroll").checked = settings.mouseWheelScroll;
        document.getElementById("spaceBetween").value = settings.spaceBetween;
        document.getElementById("centeredView").checked = settings.centeredView;
        document.getElementById("width").value = settings.width;
        document.getElementById("height").value = settings.height;

        document.getElementById("slidesPerViewMobile").value = settings.slidesPerView.mobile;
        document.getElementById("slidesPerViewTablet").value = settings.slidesPerView.tablet;
        document.getElementById("slidesPerViewDesktop").value = settings.slidesPerView.desktop;
    }

    function initializeSlider(settings) {
        if (sliderInstance) {
            document.getElementById("custom-carousel").innerHTML = ""; 
        }
        sliderInstance = new Slider('custom-carousel', settings);
    }

    function saveSettings() {
        const settings = {
            media: getSettings().media, 
            slidesPerView: {
                mobile: parseInt(document.getElementById("slidesPerViewMobile").value) || 1,
                tablet: parseInt(document.getElementById("slidesPerViewTablet").value) || 1,
                desktop: parseInt(document.getElementById("slidesPerViewDesktop").value) || 2,
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
            centeredView: document.getElementById("centeredView").checked,
            width: document.getElementById("width").value || "100%",
            height: document.getElementById("height").value || "150px",
        };

        localStorage.setItem("sliderSettings", JSON.stringify(settings));

        console.log("Settings saved:", settings);
        // console.log("Settings saved! They will persist after refresh.");

        initializeSlider(settings);
    }
    const storedSettings = getSettings();
    applySettingsToUI(storedSettings);
    initializeSlider(storedSettings);

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("change", saveSettings);
    });

    window.saveSettings = saveSettings;
});
