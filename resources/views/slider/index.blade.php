<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customizable Image Slider - Fast & Responsive</title>
    <meta name="description" content="A highly customizable, lightweight, and performance-optimized image slider built with Vanilla JavaScript.">

    <link rel="stylesheet" href="{{asset('slider/css/styles.css')}}">

    <link rel="preload" as="image" href="/slider/images/1.webp" type="image/webp">

</head>
<body>
    <div id="custom-carousel"></div>

    
    
    
    
    
    <div class="features-list" >
        <h2>slide Features Control</h2>
        
        <div class="feature-item">
            <span>Pagination</span>
            <label class="switch">
                <input type="checkbox" id="pagination" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Navigation Buttons</span>
            <label class="switch">
                <input type="checkbox" id="navigation" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Auto Slide Interval (ms)</span>
            <input type="number" id="autoSlideInterval" class="number-input" value="2000">
        </div>
        
        <div class="feature-item">
            <span>Lazy Load</span>
            <label class="switch">
                <input type="checkbox" id="lazyLoad" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
    
        <div class="feature-item">
            <span>Transition Speed (ms)</span>
            <input type="number" id="transitionSpeed" class="number-input" value="700">
        </div>
        
        <div class="feature-item">
            <span>Initial Slide</span>
            <input type="number" id="initialSlide" class="number-input" value="5">
        </div>
        
        <div class="feature-item">
            <span>Thumbnails</span>
            <label class="switch">
                <input type="checkbox" id="showThumbnails" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Progress Bar</span>
            <label class="switch">
                <input type="checkbox" id="progressBar" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Loop Mode</span>
            <label class="switch">
                <input type="checkbox" id="loop" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Clone Slides</span>
            <label class="switch">
                <input type="checkbox" id="cloneSlides" checked>
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Mouse Wheel Scroll</span>
            <label class="switch">
                <input type="checkbox" id="mouseWheelScroll">
                <span class="slide-bar"></span>
            </label>
        </div>
        
        <div class="feature-item">
            <span>Slide Spacing (px)</span>
            <input type="number" id="spaceBetween" class="number-input" value="0">
        </div>
        
        <div class="feature-item">
            <span>slide-bar Width</span>
            <input type="text" id="width" class="number-input" value="100%">
        </div>
        
        <div class="feature-item">
            <span>slide-bar Height</span>
            <input type="text" id="height" class="number-input" value="150px">
        </div>
    
        <button onclick="saveSettings()">Save Settings</button>
    </div>
    <script type="module" src="{{asset('slider/js/main.js')}}"></script>
    
    <script>
        // function saveSettings() {
            //     const settings = {
                //         pagination: document.getElementById("pagination").checked,
                //         navigation: document.getElementById("navigation").checked,
                //         autoSlideInterval: parseInt(document.getElementById("autoSlideInterval").value),
        //         lazyLoad: document.getElementById("lazyLoad").checked,
        //         transitionSpeed: parseInt(document.getElementById("transitionSpeed").value),
        //         initialSlide: parseInt(document.getElementById("initialSlide").value),
        //         showThumbnails: document.getElementById("showThumbnails").checked,
        //         progressBar: document.getElementById("progressBar").checked,
        //         loop: document.getElementById("loop").checked,
        //         cloneSlides: document.getElementById("cloneSlides").checked,
        //         mouseWheelScroll: document.getElementById("mouseWheelScroll").checked,
        //         spaceBetween: parseInt(document.getElementById("spaceBetween").value),
        //         width: document.getElementById("width").value,
        //         height: document.getElementById("height").value,
        //     };
    
        //     console.log("Updated Slider Settings:", settings);
        //     alert("Settings saved! Check the console for updated values.");
        // }
    </script>
</body>
</html>
