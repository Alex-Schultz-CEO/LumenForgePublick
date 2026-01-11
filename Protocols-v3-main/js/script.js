document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.firstscreen__logo');
    const layers = Array.from(logo.querySelectorAll('.firstscreen__logo-text'));
    const beg = document.querySelector(".firstscreen > .beg")
    let mouseX = 0, mouseY = 0;

    const funcEvent = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function updateParallax() {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        // Нормализуем в диапазон [-1, 1]
        const dx = (mouseX - cx) / cx;
        const dy = (mouseY - cy) / cy;

        layers.forEach((layer, i) => {
            // Скорость: слои, стоящие раньше в DOM, движутся быстрее
            const speedFactor = (layers.length - i);
            // Подберите 10 (px) под ваши нужды
            const xOffset = dx * speedFactor * 15;
            const yOffset = dy * speedFactor * 15;
            layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
            beg.style.transform = `translate3d(${xOffset * 1.5}px, ${yOffset * 1.5}px, 0)`;
        });

        requestAnimationFrame(updateParallax);
    }
    if (window.innerWidth < 1100) {
        window.addEventListener("scroll", e => {
            const cy = window.scrollY / 2;

            layers.forEach((layer, i) => {
                const speedFactor = (layers.length - i);
                const yOffset = cy * speedFactor / 6;
                layer.style.transform = `translateY(${-yOffset}px)`;
                beg.style.transform = `translateY(${-yOffset * 1.5}px)`;
            })
        })
    }
    else {
        window.addEventListener('mousemove', funcEvent);
        updateParallax();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 1) Начальные состояния
    gsap.set(".firstscreen", {
        backgroundColor: "var(--main-color)",
        borderLeftWidth: 0,
        borderRightWidth: 0
    });

    // Чёрный слой лого: только невидим
    gsap.set(".firstscreen__logo-text.text-black", {
        opacity: 0,
        x: 0,
        y: 0
    });


    // marquee выдвинем за правую грань
    gsap.set(".marquee", { x: "100%" });

    // текст и кнопка под лого: спрятать
    gsap.set(".firstscreen__text h1, .firstscreen__text h2, .firstscreen__link", {
        opacity: 0,
        y: 50
    });

    // 2) Собираем Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.ease" } });

    tl.to(
        ".toggle",
        {x: "0 !important", duration: 0.5}
    )
    // з) и в конце — кнопка
    tl.to(".firstscreen__link", {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, "-=0.3");
    setTimeout(() => {
        document.querySelector(".firstscreen__side").classList.add("side__anim")
        document.querySelector(".firstscreen__link").classList.add("link__anim")
    }, 5000)

    gsap.registerPlugin(ScrollTrigger, SplitText)

const split4 = new SplitType(".about__text", { types: "words, chars" });

gsap.from(split4.chars, {
      autoAlpha: 0,
      duration: 0.5,
      yPercent: "random(100, 30)",
      rotation: "random(-30, 30)",
      ease: "back.out",
      stagger: 0.01,
      scrollTrigger: {
          trigger: ".about",
          start: "top top",
          end: "bottom top",
          
        
        scroller: "main",
        }
    }) 


    gsap.from(".block__anim", {
      autoAlpha: 0,
      x: 200,
      y: 400,
      duration: 1,
      ease: "back.out",
      scrollTrigger: {
          trigger: ".about",
          start: "top top",
          end: "bottom top",

          scroller: "main",
        }
    })

});




// ABOUT

