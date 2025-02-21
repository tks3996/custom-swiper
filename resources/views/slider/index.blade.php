<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customizable Image Slider - Fast & Responsive</title>
    <meta name="description"
        content="A highly customizable, lightweight, and performance-optimized image slider built with Vanilla JavaScript.">

    <link rel="stylesheet" href="{{ asset('slider/css/styles.css') }}">

    <link rel="preload" as="image" href="/slider/images/1.webp" type="image/webp">

</head>

<body>
    <div id="custom-carousel"></div>

    <div class="features-list">
        <h2>slide Features Control</h2>
        <div class="features-list-container">
        <div class="col">
            <div class="feature-item">
                <span>Slides Per View <span style="color: #af0000;">(Mobile)</span></span>
                <input type="number" id="slidesPerViewMobile" class="number-input" value="1" min="1">
            </div>

            <div class="feature-item">
                <span>Slides Per View <span style="color: #af0000;">(Tablet)</span></span>
                <input type="number" id="slidesPerViewTablet" class="number-input" value="1" min="1">
            </div>

            <div class="feature-item">
                <span>Slides Per View <span style="color: #af0000;">(Desktop)</span></span>
                <input type="number" id="slidesPerViewDesktop" class="number-input" value="2" min="1">
            </div>

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
                <span>Auto Slide Interval <span style="color: #af0000;">(ms)</span></span>
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
                <span>Transition Speed <span style="color: #af0000;">(ms)</span></span>
                <input type="number" id="transitionSpeed" class="number-input" value="700">
            </div>

            <div class="feature-item">
                <span>Initial Slide</span>
                <input type="number" id="initialSlide" class="number-input" value="0">
            </div>
        </div>

        <div class="col">
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
                <span>Slide Spacing <span style="color: #af0000;">(px)</span></span>
                <input type="number" id="spaceBetween" class="number-input" value="0">
            </div>
            <div class="feature-item">
                <span>Center View</span>
                <label class="switch">
                    <input type="checkbox" id="centeredView">
                    <span class="slide-bar"></span>
                </label>
            </div>
            <div class="feature-item">
                <span>slide-bar Width <span style="color: #af0000;">(css value)</span></span>
                <input type="text" id="width" class="number-input" value="100%">
            </div>

            <div class="feature-item">
                <span>slide-bar Height <span style="color: #af0000;">(css value)</span></span>
                <input type="text" id="height" class="number-input" value="auto">
            </div>
        </div>
    </div>
        <button onclick="saveSettings()" class="pushable">
            <span class="front">
                Save Settings
            </span>
          </button>
    </div>
    <script type="module" src="{{ asset('slider/js/main.js') }}"></script>

</body>

</html>
