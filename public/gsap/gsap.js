document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const totalAnimHeight = document.querySelector('.anim-section').getBoundingClientRect().height * 3;
    console.log(totalAnimHeight);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".anim-section",
            start: "top top",
            end: totalAnimHeight,
            scrub: 1.5,
            pin: true,
            markers: true
        }
    });

    tl.to(".bg_rotate", { rotate: 180, duration: 3, ease: "linear" }, 0);

    tl.to(".img-group.first", { rotate: 30, duration: 3, ease: "linear" }, 0);
    tl.fromTo(".contents.anim-content-1", { x: -20, opacity: 0 }, { opacity: 1, duration: 3, x: 0, ease: "linear" }, 0);
    tl.to(".img-group.first .img-anim-1", { opacity: 1, scale: 0.8, rotate: 60, duration: 3, ease: "linear" }, 0);

    tl.to(".img-group.first", { rotate: 60, duration: 3, ease: "linear" }, "+=1");
    tl.to(".img-group.first .img-anim-1", { opacity: 0, scale: 0.3, duration: 2, ease: "linear" }, "-=2");
    tl.to(".contents.anim-content-1", { opacity: 0, duration: 2, ease: "linear" }, "-=2");

    tl.to(".img-group.second", { rotate: 30, duration: 3, ease: "linear" }, "+=1");
    tl.fromTo(".contents.anim-content-2", { x: -20, opacity: 0 }, { opacity: 1, duration: 3, x: 0, ease: "linear" }, "-=3");
    tl.to(".img-group.second .img-anim-2", { opacity: 1, scale: 0.8, rotate: 60, duration: 3, ease: "linear" }, "-=3");

    tl.to(".img-group.second", { rotate: 60, duration: 3, ease: "linear" }, "+=1");
    tl.to(".img-group.second .img-anim-2", { opacity: 0, scale: 0.3, duration: 2, ease: "linear" }, "-=2");
    tl.to(".contents.anim-content-2", { opacity: 0, duration: 2, ease: "linear" }, "-=2");

    tl.to([".img-group.first", ".img-group.second"], { rotate: 60, duration: 3, ease: "linear" }, "+=1");

    tl.fromTo(".contents.anim-content-3", { x: -20, opacity: 0 }, { opacity: 1, duration: 3, x: 0, ease: "linear" }, "-=3");
    tl.to([".img-group.first .img-anim-1", ".img-group.second .img-anim-2"], { opacity: 1, scale: 0.8, rotate: 60, duration: 3, ease: "linear" }, "-=3");

    tl.to([".img-group.first", ".img-group.second"], { rotate: 90, duration: 3, ease: "linear" }, "+=1");
    tl.to([".img-group.first .img-anim-1", ".img-group.second .img-anim-2"], { opacity: 0, scale: 0.3, duration: 2, ease: "linear" }, "-=2");

    tl.to(".contents.anim-content-3", { opacity: 0, duration: 2, ease: "linear" }, "-=2");
});
