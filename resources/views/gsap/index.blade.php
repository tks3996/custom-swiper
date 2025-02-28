<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/gsap/gsap.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>

<body>


    <div class="anim-section">
        <div class="container">
            <div class="circle-container">

                <div class="circle-container-box">
                    <div class="bg_rotate"></div>
                    <div class="circle"></div>
                </div>


                <div class="contents anim-content-1">Contents 1, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                <div class="contents anim-content-2">Contents 2, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                <div class="contents anim-content-3">Contents 3, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>

                <div class="img-group first">
                    <img class="img img-1 img-anim-1" src="{{asset('/gsap/img/refer-reward.svg')}}" alt="">
                    <img class="img img-2 img-anim-1" src="{{asset('/gsap/img/B2C.svg')}}" alt="">
                    <img class="img img-3 img-anim-1" src="{{asset('/gsap/img/place-holder.svg') }}" alt="">
                </div>
                <div class="img-group second">
                    <img class="img img-4 img-anim-2" src="{{asset('/gsap/img/refer-reward.svg') }}" alt="">
                    <img class="img img-5 img-anim-2" src="{{asset('/gsap/img/B2C.svg')}}" alt="">
                    <img class="img img-6 img-anim-2" src="{{asset('/gsap/img/place-holder.svg')}}" alt="">
                </div>

            </div>
        </div>
    </div>

    <script src="/gsap/gsap.js"></script>
</body>

</html>




{{-- rotary carousel gallery --}}
{{-- 
<!DOCTYPE html>
<html>
<head>
    <style>
        .progress-container {
            width: 90vw;
            max-width: 1200px;
            height: 60vh;
            display: flex;
            margin: 50px auto;
            gap: 20px;
            align-items: center;
        }

        .progress-bar-container {
            width: 50px;
            height: 100%;
            position: relative;
        }

        .progress-bar {
            width: 10px;
            height: 100%;
            background: #e0e0e0;
            border-radius: 5px;
            position: relative;
            margin: 0 auto;
        }

        .progress-fill {
            width: 100%;
            background: #4CAF50;
            border-radius: 5px;
            transition: height 0.5s ease;
            position: absolute;
            top: 0;
            height: 0%;
        }

        .slider-item {
            position: absolute;
            width: 30px;
            height: 30px;
            background: #fff;
            border-radius: 50%;
            border: 2px solid #4CAF50;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .slider-item.active {
            background: #4CAF50;
            color: white;
            transform: translateX(-50%) scale(1.2);
        }

        .image-orbit-container {
            width: 50vw;
            max-width: 600px;
            height: 50vw;
            max-height: 600px;
            position: relative;
            margin: auto;
        }

        .orbit-image {
            position: absolute;
            width: 400px;
            height: auto;
            object-fit: cover;
            transition: all 1s ease;
            opacity: 0;
            transform-origin: center center;
        }

        .orbit-image.active {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }

        .half-circle {
            position: absolute;
            width: 80%;
            height: 80%;
            border: 10px solid transparent;
            border-top-color: #4CAF50;
            border-right-color: #4CAF50;
            border-radius: 50%;
            top: 10%;
            left: 10%;
            transition: transform 1s ease;
            transform: rotate(0deg);
        }

        @media (max-width: 768px) {
            .progress-container {
                width: 90vw;
                height: 50vh;
                flex-direction: column;
                gap: 10px;
            }

            .image-orbit-container {
                width: 70vw;
                height: 70vw;
                max-width: 400px;
                max-height: 400px;
            }

            .orbit-image {
                width: 200px;
            }

            .half-circle {
                width: 80%;
                height: 80%;
                top: 10%;
                left: 10%;
                border-width: 8px;
            }

            .progress-bar-container {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
            }

            .progress-bar {
                width: 100%;
                height: 10px;
            }

            .progress-fill {
                height: 100%;
                width: 0%;
                transition: width 0.5s ease;
            }

            .slider-item {
                top: 50%;
                transform: translateY(-50%);
                left: auto;
            }
        }
    </style>
</head>

<body>
    <div class="progress-container">
        <div class="progress-bar-container">
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
        <div class="image-orbit-container" id="imageContainer">
            <div class="half-circle" id="halfCircle"></div>
        </div>
    </div>

    <script>
        class OrbitProgressSlider {
            constructor() {
                this.container = document.querySelector('.progress-container');
                this.progressFill = document.getElementById('progressFill');
                this.imageContainer = document.getElementById('imageContainer');
                this.halfCircle = document.getElementById('halfCircle');
                this.steps = 4;
                this.currentStep = -1;
                this.images = [
                    'https://picsum.photos/400/200?random=1',
                    'https://picsum.photos/400/200?random=2',
                    'https://picsum.photos/400/200?random=3',
                    'https://picsum.photos/400/200?random=4'
                ];
                this.isResetting = false;
                this.progressBar = null;
                this.initializeSlider();
                this.startRotation();
                window.addEventListener('resize', () => this.updateProgress());
            }

            initializeSlider() {
                this.progressBar = this.container.querySelector('.progress-bar');
                const barHeight = this.progressBar.offsetHeight || 0;

                for (let i = 0; i < this.steps; i++) {
                    const slider = document.createElement('div');
                    slider.className = 'slider-item';
                    slider.innerText = i + 1;
                    slider.style.top = `${(i / (this.steps - 1)) * (barHeight - 30)}px`;
                    slider.addEventListener('click', () => this.setProgress(i));
                    this.progressBar.appendChild(slider);
                }

                this.images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'orbit-image';
                    img.dataset.index = index;
                    if (index === 0) {
                        img.style.transform = 'scale(0) rotate(-90deg)';
                    }
                    this.imageContainer.appendChild(img);
                });

                this.updateProgress();
                setTimeout(() => {
                    this.currentStep = 0;
                    this.updateProgress();
                }, 100);
            }

            updateImagePositions() {
                const images = this.imageContainer.getElementsByClassName('orbit-image');
                const containerWidth = this.imageContainer.offsetWidth || 600;
                const radius = containerWidth * 0.8 / 2;
                const centerX = containerWidth / 2;
                const centerY = this.imageContainer.offsetHeight / 2 || containerWidth / 2;
                const totalAngle = 2 * Math.PI;
                const angleStep = totalAngle / this.steps;

                Array.from(images).forEach((img, index) => {
                    let positionOffset = (this.currentStep - index + this.steps) % this.steps;
                    let angle = Math.PI + positionOffset * angleStep;
                    let isActive = index === this.currentStep && this.currentStep >= 0 && !this.isResetting;

                    if (this.isResetting && index === this.steps - 1) {
                        angle = Math.PI - angleStep; 
                        isActive = false;
                    }

                    const x = centerX + radius * Math.cos(angle) - (img.offsetWidth || 400) / 2;
                    const y = centerY + radius * Math.sin(angle) - (img.offsetHeight || 200) / 2;

                    img.style.transition = 'all 1s ease';
                    img.style.left = `${x}px`;
                    img.style.top = `${y}px`;

                    let rotationAngle;
                    if (isActive) {
                        rotationAngle = 0; 
                    } else if (this.isResetting && index === this.steps - 1) {
                        rotationAngle = -90; 
                    } else {
                        const relativePosition = (index - this.currentStep + this.steps) % this.steps;
                        if (relativePosition === 1 || (this.currentStep === -1 && index === 0)) {
                            rotationAngle = -90;
                        } else {
                            rotationAngle = 90; 
                        }
                    }

                    img.style.transform = `scale(${isActive ? 1 : 0.7}) rotate(${rotationAngle}deg)`;

                    if (isActive) {
                        img.style.opacity = '1';
                        img.style.zIndex = '10';
                        img.classList.add('active');
                    } else {
                        img.style.opacity = '0';
                        img.style.zIndex = '1';
                        img.classList.remove('active');
                    }
                });
            }

            updateHalfCircle() {
                let rotationAngle;
                if (this.isResetting) {
                    rotationAngle = -90;
                } else {
                    rotationAngle = this.currentStep * 90;
                }
                this.halfCircle.style.transform = `rotate(${rotationAngle}deg)`;
            }

            setProgress(step) {
                this.currentStep = step;
                this.isResetting = false;
                this.updateProgress();
            }

            updateProgress() {
                if (!this.progressBar) {
                    this.progressBar = this.container.querySelector('.progress-bar');
                }
                const percentage = this.currentStep >= 0 ? ((this.currentStep / (this.steps - 1)) * 100) : 0;
                if (window.innerWidth <= 768) {
                    this.progressFill.style.width = `${percentage}%`;
                    this.progressFill.style.height = '100%';
                    const sliders = this.progressBar.getElementsByClassName('slider-item');
                    Array.from(sliders).forEach((slider, index) => {
                        slider.style.left = `${(index / (this.steps - 1)) * (this.progressBar.offsetWidth - 30)}px`;
                        slider.style.top = '50%';
                        slider.classList.toggle('active', index === this.currentStep);
                    });
                } else {
                    this.progressFill.style.height = `${percentage}%`;
                    this.progressFill.style.width = '100%';
                    const sliders = this.progressBar.getElementsByClassName('slider-item');
                    Array.from(sliders).forEach((slider, index) => {
                        slider.style.top = `${(index / (this.steps - 1)) * (this.progressBar.offsetHeight - 30)}px`;
                        slider.style.left = '50%';
                        slider.classList.toggle('active', index === this.currentStep);
                    });
                }
                this.updateImagePositions();
                this.updateHalfCircle();
            }

            startRotation() {
                setInterval(() => {
                    if (this.currentStep === this.steps - 1) {
                        this.isResetting = true;
                        this.updateProgress();
                        setTimeout(() => {
                            this.currentStep = 0;
                            this.isResetting = false;
                            this.updateProgress();
                        }, 1000);
                    } else {
                        this.currentStep = (this.currentStep + 1) % this.steps;
                        this.isResetting = false;
                        this.updateProgress();
                    }
                }, 2000);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const slider = new OrbitProgressSlider();
        });
    </script>
</body>
</html> --}}




{{-- in gsap --}}

{{-- 
<!DOCTYPE html>
<html>
<head>
    <style>
        .progress-container {
            width: 90vw;
            max-width: 1200px;
            height: 60vh;
            display: flex;
            margin: 50px auto;
            gap: 20px;
            align-items: center;
        }

        .progress-bar-container {
            width: 50px;
            height: 100%;
            position: relative;
        }

        .progress-bar {
            width: 10px;
            height: 100%;
            background: #e0e0e0;
            border-radius: 5px;
            position: relative;
            margin: 0 auto;
        }

        .progress-fill {
            width: 100%;
            background: #4CAF50;
            border-radius: 5px;
            position: absolute;
            top: 0;
            height: 0%;
        }

        .slider-item {
            position: absolute;
            width: 30px;
            height: 30px;
            background: #fff;
            border-radius: 50%;
            border: 2px solid #4CAF50;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .slider-item.active {
            background: #4CAF50;
            color: white;
            transform: translateX(-50%) scale(1.2);
        }

        .image-orbit-container {
            width: 50vw;
            max-width: 600px;
            height: 50vw;
            max-height: 600px;
            position: relative;
            margin: auto;
        }

        .orbit-image {
            position: absolute;
            width: 400px;
            height: auto;
            object-fit: cover;
            opacity: 0;
            transform-origin: center center;
        }

        .half-circle {
            position: absolute;
            width: 80%;
            height: 80%;
            border: 10px solid transparent;
            border-top-color: #4CAF50;
            border-right-color: #4CAF50;
            border-radius: 50%;
            top: 10%;
            left: 10%;
            transform: rotate(0deg);
        }

        @media (max-width: 768px) {
            .progress-container {
                width: 90vw;
                height: 50vh;
                flex-direction: column;
                gap: 10px;
            }

            .image-orbit-container {
                width: 70vw;
                height: 70vw;
                max-width: 400px;
                max-height: 400px;
            }

            .orbit-image {
                width: 200px;
            }

            .half-circle {
                width: 80%;
                height: 80%;
                top: 10%;
                left: 10%;
                border-width: 8px;
            }

            .progress-bar-container {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
            }

            .progress-bar {
                width: 100%;
                height: 10px;
            }

            .progress-fill {
                height: 100%;
                width: 0%;
            }

            .slider-item {
                top: 50%;
                transform: translateY(-50%);
                left: auto;
            }
        }
    </style>
</head>

<body>
    <div class="progress-container">
        <div class="progress-bar-container">
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
        <div class="image-orbit-container" id="imageContainer">
            <div class="half-circle" id="halfCircle"></div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        class OrbitProgressSlider {
            constructor() {
                this.container = document.querySelector('.progress-container');
                this.progressFill = document.getElementById('progressFill');
                this.imageContainer = document.getElementById('imageContainer');
                this.halfCircle = document.getElementById('halfCircle');
                this.images = [
                    'https://picsum.photos/400/200?random=1',
                    'https://picsum.photos/400/200?random=2',
                    'https://picsum.photos/400/200?random=3',
                    'https://picsum.photos/400/200?random=4'
                ];
                this.steps = this.images.length; 
                this.currentStep = -1;
                this.isResetting = false;
                this.progressBar = null;
                this.imageElements = [];
                this.baseInterval = 2000; 
                this.initializeSlider();
                this.startRotation();
                window.addEventListener('resize', () => this.updateProgress());
            }

            initializeSlider() {
                this.progressBar = this.container.querySelector('.progress-bar');
                const barHeight = this.progressBar.offsetHeight || 0;

                for (let i = 0; i < this.steps; i++) {
                    const slider = document.createElement('div');
                    slider.className = 'slider-item';
                    slider.innerText = i + 1;
                    slider.style.top = `${(i / (this.steps - 1)) * (barHeight - 30)}px`;
                    slider.addEventListener('click', () => this.setProgress(i));
                    this.progressBar.appendChild(slider);
                }

                this.images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'orbit-image';
                    img.dataset.index = index;
                    this.imageContainer.appendChild(img);
                    this.imageElements.push(img);
                });

                this.updateProgress();
                gsap.to(this, {
                    currentStep: 0,
                    duration: 0.1,
                    onUpdate: () => this.updateProgress(),
                    delay: 0.1
                });
            }

            updateImagePositions() {
                const containerWidth = this.imageContainer.offsetWidth || 600;
                const radius = containerWidth * 0.8 / 2;
                const centerX = containerWidth / 2;
                const centerY = this.imageContainer.offsetHeight / 2 || containerWidth / 2;
                const totalAngle = 2 * Math.PI;
                const angleStep = totalAngle / this.steps;

                this.imageElements.forEach((img, index) => {
                    let positionOffset = (this.currentStep - index + this.steps) % this.steps;
                    let angle = Math.PI + positionOffset * angleStep;
                    let isActive = index === this.currentStep && this.currentStep >= 0 && !this.isResetting;

                    if (this.isResetting && index === this.steps - 1) {
                        angle = Math.PI - angleStep;
                        isActive = false;
                    }

                    const x = centerX + radius * Math.cos(angle) - (img.offsetWidth || 400) / 2;
                    const y = centerY + radius * Math.sin(angle) - (img.offsetHeight || 200) / 2;

                    let rotationAngle;
                    if (isActive) {
                        rotationAngle = 0;
                    } else if (this.isResetting && index === this.steps - 1) {
                        rotationAngle = -90;
                    } else {
                        const relativePosition = (index - this.currentStep + this.steps) % this.steps;
                        rotationAngle = (relativePosition === 1 || (this.currentStep === -1 && index === 0)) ? -90 : 90;
                    }

                    gsap.to(img, {
                        x: x,
                        y: y,
                        scale: isActive ? 1 : 0.7,
                        rotation: rotationAngle,
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 10 : 1,
                        duration: 1, 
                        ease: "power2.inOut",
                        onComplete: () => {
                            if (isActive) img.classList.add('active');
                            else img.classList.remove('active');
                        }
                    });
                });
            }

            updateHalfCircle() {
                const rotationAngle = this.isResetting ? -90 : this.currentStep * (360 / this.steps);
                gsap.to(this.halfCircle, {
                    rotation: rotationAngle,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }

            setProgress(step) {
                this.currentStep = step;
                this.isResetting = false;
                this.updateProgress();
            }

            updateProgress() {
                if (!this.progressBar) {
                    this.progressBar = this.container.querySelector('.progress-bar');
                }
                const percentage = this.currentStep >= 0 ? ((this.currentStep / (this.steps - 1)) * 100) : 0;
                if (window.innerWidth <= 768) {
                    gsap.to(this.progressFill, {
                        width: `${percentage}%`,
                        height: '100%',
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                    const sliders = this.progressBar.getElementsByClassName('slider-item');
                    Array.from(sliders).forEach((slider, index) => {
                        slider.style.left = `${(index / (this.steps - 1)) * (this.progressBar.offsetWidth - 30)}px`;
                        slider.style.top = '50%';
                        slider.classList.toggle('active', index === this.currentStep);
                    });
                } else {
                    gsap.to(this.progressFill, {
                        height: `${percentage}%`,
                        width: '100%',
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                    const sliders = this.progressBar.getElementsByClassName('slider-item');
                    Array.from(sliders).forEach((slider, index) => {
                        slider.style.top = `${(index / (this.steps - 1)) * (this.progressBar.offsetHeight - 30)}px`;
                        slider.style.left = '50%';
                        slider.classList.toggle('active', index === this.currentStep);
                    });
                }
                this.updateImagePositions();
                this.updateHalfCircle();
            }

            startRotation() {
                const intervalTime = this.baseInterval;
                setInterval(() => {
                    if (this.currentStep === this.steps - 1) {
                        this.isResetting = true;
                        this.updateProgress();
                        setTimeout(() => {
                            this.currentStep = 0;
                            this.isResetting = false;
                            this.updateProgress();
                        }, 1000);
                    } else {
                        this.currentStep = (this.currentStep + 1) % this.steps;
                        this.isResetting = false;
                        this.updateProgress();
                    }
                }, intervalTime);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const slider = new OrbitProgressSlider();
        });
    </script>
</body>
</html>  --}}