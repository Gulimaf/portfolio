document.addEventListener("DOMContentLoaded", () => {
if (typeof gsap === "undefined") {
return;
}

if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

const cards = $$(".card");
const sections = $$("section");
const navLinks = $$("nav ul li a");

const sky = $("#inicio");
const nameElement = $(".name");
const mouseGlow = $(".mouse-glow");
const currentYear = $("#current-year");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}

let stars = [];
let starAnimations = [];
let starsResizeTimer = null;

const createStars = () => {
    if (!sky || reducedMotion) {
        return;
    }

    starAnimations.forEach(animation => {
        if (animation) {
            animation.kill();
        }
    });

    starAnimations = [];

    stars.forEach(star => {
        if (star && star.parentNode) {
            star.remove();
        }
    });

    stars = [];

    const totalStars = 35;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const distance =
        Math.max(width, height) * 1.5;

    const duration = 7;

    for (let i = 0; i < totalStars; i++) {
        const star =
            document.createElement("span");

        star.className = "star";

        const startX =
            Math.random() * width;

        const startY =
            Math.random() * height;

        star.style.position = "absolute";
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        star.style.width = "2px";
        star.style.height = "2px";

        star.style.borderRadius = "50%";
        star.style.background = "#fff";
        star.style.opacity = "1";

        star.style.boxShadow =
            "0 0 6px rgba(255,255,255,0.9)";

        star.style.pointerEvents = "none";
        star.style.zIndex = "0";
        star.style.willChange = "transform";

        sky.appendChild(star);
        stars.push(star);

        const initialProgress =
            Math.random();

        const initialX =
            distance -
            initialProgress * distance * 2;

        const initialY =
            -distance * 0.7 +
            initialProgress *
                distance * 1.4;

        gsap.set(star, {
            x: initialX,
            y: initialY
        });

        const animation =
            gsap.to(star, {
                x: -distance,
                y: distance * 0.7,
                duration:
                    duration *
                    (1 - initialProgress),
                ease: "none",
                onComplete: () => {
                    gsap.set(star, {
                        x: distance,
                        y: -distance * 0.7
                    });

                    gsap.to(star, {
                        x: -distance,
                        y: distance * 0.7,
                        duration,
                        ease: "none",
                        repeat: -1
                    });
                }
            });

        starAnimations.push(animation);
    }
};


const resizeStars = () => {
    clearTimeout(starsResizeTimer);

    starsResizeTimer = setTimeout(() => {
        createStars();
    }, 200);
};

if (!reducedMotion) {
    createStars();

    window.addEventListener(
        "resize",
        resizeStars,
        {
            passive: true
        }
    );
}

const createAnimatedName = () => {
    if (!nameElement || reducedMotion) {
        return;
    }

    if (nameElement.dataset.outlineCreated === "true") {
        return;
    }

    nameElement.dataset.outlineCreated = "true";

    const text =
        nameElement.textContent.trim();

    if (!text) {
        return;
    }

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.classList.add(
        "name-outline-animation"
    );

    svg.setAttribute(
        "aria-hidden",
        "true"
    );

    const svgText =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

    svgText.textContent = text;

    svg.appendChild(svgText);
    nameElement.appendChild(svg);

    const updateName = (
        animate = false
    ) => {
        const computed =
            window.getComputedStyle(
                nameElement
            );

        const width =
            nameElement.clientWidth;

        const height =
            nameElement.clientHeight;

        const fontSize =
            parseFloat(
                computed.fontSize
            ) || 56;

        const fontFamily =
            computed.fontFamily ||
            "Poppins, sans-serif";

        const fontWeight =
            computed.fontWeight ||
            "700";

        const letterSpacing =
            parseFloat(
                computed.letterSpacing
            ) || 0;

        const lineHeight =
            parseFloat(
                computed.lineHeight
            ) || fontSize * 1.2;

        svg.setAttribute(
            "viewBox",
            `0 0 ${width} ${height}`
        );

        svg.setAttribute(
            "width",
            width
        );

        svg.setAttribute(
            "height",
            height
        );

        svgText.setAttribute(
            "x",
            width / 2
        );

        svgText.setAttribute(
            "text-anchor",
            "middle"
        );

        svgText.setAttribute(
            "y",
            (
                (height - lineHeight) / 2 +
                fontSize * 0.82
            )
        );

        svgText.setAttribute(
            "font-family",
            fontFamily
        );

        svgText.setAttribute(
            "font-size",
            `${fontSize}px`
        );

        svgText.setAttribute(
            "font-weight",
            fontWeight
        );

        svgText.setAttribute(
            "letter-spacing",
            `${letterSpacing}px`
        );

        svgText.setAttribute(
            "fill",
            "transparent"
        );

        svgText.setAttribute(
            "stroke",
            "white"
        );

        svgText.setAttribute(
            "stroke-width",
            "1"
        );

        svgText.setAttribute(
            "stroke-linecap",
            "round"
        );

        svgText.setAttribute(
            "stroke-linejoin",
            "round"
        );

        svgText.setAttribute(
            "paint-order",
            "stroke"
        );

        const textWidth =
            svgText.getComputedTextLength();

        const drawLength =
            Math.max(
                textWidth * 12,
                500
            );

        if (!animate) {
            svgText.style.strokeDasharray =
                drawLength;

            svgText.style.strokeDashoffset =
                0;

            return;
        }

        svgText.style.strokeDasharray =
            drawLength;

        svgText.style.strokeDashoffset =
            drawLength;

        gsap.fromTo(
            svgText,
            {
                strokeDashoffset:
                    drawLength
            },
            {
                strokeDashoffset: 0,
                duration: 5.5,
                delay: 0.2,
                ease: "expo.inOut",
                overwrite: true
            }
        );
    };

    requestAnimationFrame(() => {
        updateName(true);
    });

    const resizeObserver =
        new ResizeObserver(() => {
            updateName(false);
        });

    resizeObserver.observe(
        nameElement
    );

    window.addEventListener(
        "resize",
        () => {
            updateName(false);
        }
    );
};

if (reducedMotion) {
    gsap.set(
        [
            ".navbar",
            ".saudacao",
            ".name",
            ".icones a",
            ".down",
            ".title",
            ".foto",
            ".sobre-mim p",
            ".card",
            ".projeto",
            ".projeto img",
            ".skills li"
        ],
        {
            clearProps: "all"
        }
    );
} else {
    if ($(".navbar")) {
        gsap.from(".navbar", {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    const heroTimeline =
        gsap.timeline({
            defaults: {
                ease: "power4.out"
            }
        });

    if ($(".saudacao")) {
        heroTimeline.from(
            ".saudacao",
            {
                y: 80,
                opacity: 0,
                filter: "blur(12px)",
                duration: 1.1
            }
        );
    }

    if (nameElement) {
        heroTimeline.from(
            ".name",
            {
                y: 100,
                opacity: 0,
                scale: 0.85,
                filter: "blur(15px)",
                duration: 1.2
            },
            "-=0.65"
        );
    }

    if ($(".icones a")) {
        heroTimeline.from(
            ".icones a",
            {
                y: 30,
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                stagger: 0.12,
                ease: "back.out(1.7)"
            },
            "-=0.4"
        );
    }

    if ($(".down")) {
        heroTimeline.from(
            ".down",
            {
                opacity: 0,
                y: -20,
                duration: 0.6
            },
            "-=0.2"
        );
    }

    if (nameElement) {
        createAnimatedName();
    }

    if (
        typeof ScrollTrigger !==
        "undefined"
    ) {
        if ($(".container-nome")) {
            gsap.to(
                ".container-nome",
                {
                    y: -100,
                    opacity: 0.3,
                    scrollTrigger: {
                        trigger: "#inicio",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh:
                            true
                    }
                }
            );
        }

        if ($("#inicio .icones")) {
            gsap.to(
                "#inicio .icones",
                {
                    y: -50,
                    scrollTrigger: {
                        trigger: "#inicio",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh:
                            true
                    }
                }
            );
        }

        $$(".title").forEach(
            title => {
                gsap.from(title, {
                    y: 60,
                    opacity: 0,
                    filter:
                        "blur(8px)",
                    duration: 0.8,
                    ease:
                        "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start:
                            "top 85%",
                        toggleActions:
                            "play none none reverse"
                    }
                });
            }
        );

        if (
            $("#sobre") &&
            $(".foto")
        ) {
            gsap.from(
                ".foto",
                {
                    x: -100,
                    opacity: 0,
                    filter:
                        "blur(8px)",
                    duration: 1,
                    ease:
                        "power3.out",
                    scrollTrigger: {
                        trigger: "#sobre",
                        start:
                            "top 70%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }

        if ($(".sobre-mim")) {
            gsap.from(
                ".sobre-mim p",
                {
                    x: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease:
                        "power3.out",
                    scrollTrigger: {
                        trigger:
                            ".sobre-mim",
                        start:
                            "top 75%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }

        if ($(".foto img")) {
            gsap.to(
                ".foto img",
                {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease:
                        "sine.inOut"
                }
            );
        }

        if (cards.length) {
            gsap.from(
                ".card",
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.85,
                    duration: 0.8,
                    stagger: 0.12,
                    ease:
                        "back.out(1.4)",
                    scrollTrigger: {
                        trigger:
                            "#competencias",
                        start:
                            "top 70%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }

        if ($(".projeto")) {
            gsap.from(
                ".projeto",
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.95,
                    rotateX: 8,
                    duration: 1,
                    ease:
                        "power3.out",
                    scrollTrigger: {
                        trigger:
                            "#projetos",
                        start:
                            "top 75%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }

        if (
            $(".projeto img")
        ) {
            gsap.from(
                ".projeto img",
                {
                    scale: 0.7,
                    opacity: 0,
                    duration: 1,
                    ease:
                        "power3.out",
                    scrollTrigger: {
                        trigger:
                            ".projeto",
                        start:
                            "top 75%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }

        if ($(".skills")) {
            gsap.from(
                ".skills li",
                {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease:
                        "power2.out",
                    scrollTrigger: {
                        trigger:
                            ".skills",
                        start:
                            "top 80%",
                        toggleActions:
                            "play none none reverse"
                    }
                }
            );
        }
    }
}

cards.forEach(card => {
    const icon =
        $(".icon", card);

    card.addEventListener(
        "mousemove",
        event => {
            if (reducedMotion) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            gsap.to(card, {
                rotateX:
                    ((y - centerY) /
                        centerY) *
                    -7,

                rotateY:
                    ((x - centerX) /
                        centerX) *
                    7,

                scale: 1.03,
                duration: 0.3,
                ease:
                    "power2.out",
                overwrite: "auto"
            });

            if (icon) {
                gsap.to(
                    icon,
                    {
                        x:
                            (x -
                                centerX) *
                            0.08,

                        y:
                            (y -
                                centerY) *
                            0.08,

                        duration:
                            0.3,

                        ease:
                            "power2.out",

                        overwrite:
                            "auto"
                    }
                );
            }
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {
            if (reducedMotion) {
                return;
            }

            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease:
                    "elastic.out(1, 0.5)",
                overwrite: "auto"
            });

            if (icon) {
                gsap.to(
                    icon,
                    {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease:
                            "power2.out",
                        overwrite:
                            "auto"
                    }
                );
            }
        }
    );
});

$$(".links a").forEach(
    link => {
        link.addEventListener(
            "mouseenter",
            () => {
                if (
                    reducedMotion
                ) {
                    return;
                }

                gsap.to(link, {
                    y: -3,
                    scale: 1.04,
                    duration: 0.2,
                    ease:
                        "power2.out",
                    overwrite:
                        "auto"
                });
            }
        );

        link.addEventListener(
            "mouseleave",
            () => {
                if (
                    reducedMotion
                ) {
                    return;
                }

                gsap.to(link, {
                    y: 0,
                    scale: 1,
                    duration: 0.2,
                    overwrite:
                        "auto"
                });
            }
        );
    }
);

$$(".icones a").forEach(
    link => {
        link.addEventListener(
            "mouseenter",
            () => {
                if (
                    reducedMotion
                ) {
                    return;
                }

                gsap.to(link, {
                    y: -6,
                    scale: 1.15,
                    duration: 0.25,
                    ease:
                        "back.out(2)",
                    overwrite:
                        "auto"
                });
            }
        );

        link.addEventListener(
            "mouseleave",
            () => {
                if (
                    reducedMotion
                ) {
                    return;
                }

                gsap.to(link, {
                    y: 0,
                    scale: 1,
                    duration: 0.25,
                    ease:
                        "back.out(2)",
                    overwrite:
                        "auto"
                });
            }
        );
    }
);

if (
    sections.length &&
    navLinks.length
) {
    const observer =
        new IntersectionObserver(
            entries => {
                const visible =
                    entries
                        .filter(
                            entry =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );

                if (!visible.length) {
                    return;
                }

                const id =
                    visible[0]
                        .target
                        .getAttribute(
                            "id"
                        );

                if (!id) {
                    return;
                }

                navLinks.forEach(
                    link => {
                        link.classList.toggle(
                            "ativo",
                            link.getAttribute(
                                "href"
                            ) ===
                                `#${id}`
                        );
                    }
                );
            },
            {
                threshold: [
                    0.2,
                    0.3,
                    0.5,
                    0.7
                ],
                rootMargin:
                    "-10% 0px -35% 0px"
            }
        );

    sections.forEach(
        section => {
            observer.observe(
                section
            );
        }
    );
}

class MobileNavBar {
    constructor() {
        this.barra =
            $(".barra");

        this.navList =
            $(".nav-list");

        this.navLinks =
            $$(".nav-list li a");

        this.activeClass =
            "active";

        this.handleClick =
            this.handleClick.bind(
                this
            );
    }

    handleClick() {
        if (
            !this.barra ||
            !this.navList
        ) {
            return;
        }

        this.barra.classList.toggle(
            this.activeClass
        );

        this.navList.classList.toggle(
            this.activeClass
        );
    }

    close() {
        if (
            !this.barra ||
            !this.navList
        ) {
            return;
        }

        this.barra.classList.remove(
            this.activeClass
        );

        this.navList.classList.remove(
            this.activeClass
        );
    }

    init() {
        if (!this.barra) {
            return;
        }

        this.barra.addEventListener(
            "click",
            this.handleClick
        );

        this.navLinks.forEach(
            link => {
                link.addEventListener(
                    "click",
                    () => {
                        this.close();
                    }
                );
            }
        );
    }
}

new MobileNavBar().init();

if (
    mouseGlow &&
    !reducedMotion
) {
    window.addEventListener(
        "mousemove",
        event => {
            gsap.to(
                mouseGlow,
                {
                    x: event.clientX,
                    y: event.clientY,
                    duration: 0.5,
                    ease:
                        "power2.out",
                    overwrite:
                        "auto"
                }
            );
        },
        {
            passive: true
        }
    );
}

if (
    typeof ScrollTrigger !==
    "undefined"
) {
    requestAnimationFrame(
        () => {
            ScrollTrigger.refresh();
        }
    );
}
const cvButton =
    document.querySelector(".nav-list .cv a");

if (cvButton) {
    cvButton.addEventListener(
        "mouseenter",
        () => {
            gsap.fromTo(
                cvButton,
                {
                    y: 0
                },
                {
                    y: -2,
                    duration: 0.25,
                    ease: "power2.out"
                }
            );
        }
    );

    cvButton.addEventListener(
        "mouseleave",
        () => {
            gsap.to(cvButton, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    );
}


});