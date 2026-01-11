document.addEventListener('DOMContentLoaded', () => {
  // Global GSAP optimizations for smoothness (safer defaults)
  try {
    gsap.ticker.lagSmoothing(600); // moderate smoothing
    gsap.ticker.fps(0); // let browser decide FPS (0 = uncapped)
  } catch (e) { /* if gsap not available yet */ }

  const logo = document.querySelector('.firstscreen__logo');
  const layers = logo ? Array.from(logo.querySelectorAll('.firstscreen__logo-text')) : [];
  const beg = document.querySelector('.firstscreen > .beg');

  if (!logo || layers.length === 0 || !beg) {
    console.warn('Parallax: required elements not found (.firstscreen__logo / .firstscreen__logo-text / .beg)');
    return;
  }

  let mouseX = 0, mouseY = 0;
  let rafPending = false;

  const funcEvent = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        updateParallax();
        rafPending = false;
      });
    }
  }

  function updateParallax() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (mouseX - cx) / cx;
    const dy = (mouseY - cy) / cy;

    layers.forEach((layer, i) => {
      const speedFactor = (layers.length - i);
      const xOffset = dx * speedFactor * 15;
      const yOffset = dy * speedFactor * 15;
      layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
    });

    if (beg) beg.style.transform = `translate3d(${dx * 15 * 1.5}px, ${dy * 15 * 1.5}px, 0)`;
  }

  function onScrollParallax() {
    const cy = window.scrollY / 2;
    layers.forEach((layer, i) => {
      const speedFactor = (layers.length - i);
      const yOffset = cy * speedFactor / 6;
      layer.style.transform = `translateY(${-yOffset}px)`;
    });
    if (beg) beg.style.transform = `translateY(${-cy * 1.5}px)`;
  }

  // Debounced resize to rebind correct listeners
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.removeEventListener('mousemove', funcEvent);
      window.removeEventListener('scroll', onScrollParallax);
      if (window.innerWidth < 1100) {
        window.addEventListener('scroll', onScrollParallax);
      } else {
        window.addEventListener('mousemove', funcEvent);
      }
    }, 200);
  });

  if (window.innerWidth < 1100) {
    window.addEventListener('scroll', onScrollParallax);
  } else {
    window.addEventListener('mousemove', funcEvent);
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

    // а) появляется чёрный логотип (без смещения)
    tl.to(".firstscreen__logo-text.text-black", {
        opacity: 1,
        duration: 0.6
    });

    // б) из-за экрана сверху-слева «прилетают» цветные слои на свои места
    tl.to(".firstscreen__logo-text:not(.text-black)", {
        opacity: 1,
        stagger: 0.1,
        duration: 0.8
    }, "-=0.2");

    // в) фон панели firstscreen проявляется
    tl.to(".firstscreen", {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderWidth: "var(--offset)",
        duration: 1,
    }, "-=0.6");

    // 
// Весь задний фон внутри




    // г) заезжает бегущая строка
    tl.to(".marquee", {
        x: 0,
        duration: 1
    }, "-=0.3");
    // г) заезжает бегущая строка
    tl.to(".marquee", {
        rotateZ: "4deg",
        duration: 1
    }, "-=0.3");
    // д) рисуем бордюры
    tl.to(".firstscreen", {
        borderLeftWidth: "var(--offset)",
        borderRightWidth: "var(--offset)",
        
        duration: 0.5
    }, "-=0.8");
    tl.to(".beg", { opacity: 1, duration: 0.3 })

    // е) появляется текст снизу
    tl.to(".firstscreen__text .firstscreen__title", {
        opacity: 1,
        y: 0,
        duration: 0.6
    });
    tl.to(".firstscreen__side", { backgroundColor: "rgba(255, 255, 255, 0.85)", duration: 0.6 })
    // ж) появляется сабтайтл
    tl.to(".firstscreen__text .firstscreen__subtitle", {
        opacity: 1,
        y: 0,
        
        duration: 0.6
        
    }, "-=0.4");
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

// Global debounce for ScrollTrigger refresh on scroll to reduce jank
let refreshDebounce;
window.addEventListener('scroll', () => {
  clearTimeout(refreshDebounce);
  refreshDebounce = setTimeout(() => ScrollTrigger.refresh(), 100);
}, { passive: true });

// === HORIZONTAL SCROLL: alternating stair + 3D scale ===
// === HORIZONTAL SCROLL: alternating stair + 3D scale ===
(function() {
  const section = document.querySelector('.horizontal-scroll');
  if (!section) return;

  const wrapper = section.querySelector('.horizontal-scroll__wrapper');
  const panels = gsap.utils.toArray('.horizontal-scroll .panel');
  if (!wrapper || panels.length === 0) {
    console.error('horizontal-scroll: wrapper or panels not found');
    return;
  }

  // убиваем старые триггеры для этой секции
  ScrollTrigger.getAll().forEach(t => {
    try { if (t.trigger === section) t.kill(); } catch(e){ }
  });

  let mainTL;

  function initHorizontalScroll() {
    // очистка предыдущего
    if (mainTL) { try { mainTL.kill(); } catch(e){} }
    ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });

    // пересчёт размеров
    const totalWidth = wrapper.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.max(0, totalWidth - viewportWidth);

    // фолбэк: если контент помещается — показываем вертикально
    if (scrollDistance <= 0) {
      wrapper.style.display = 'block';
      panels.forEach(p => p.style.minWidth = '100%');
      return;
    } else {
      wrapper.style.display = 'flex';
      panels.forEach(p => p.style.minWidth = '100vw');
    }

    // величина шага для "лесенки"
    const step = Math.round(window.innerHeight * 0.7);

    // ------------------------- 
    // ПАРАМЕТР: задаём контролируемую вертикальную длину (px) -> теперь end относительно scrollDistance
    // -------------------------
    const desiredTotalSpace = scrollDistance * 0.3; // Adjust multiplier for speed (0.5 = half viewport height per unit scroll)

    // Создаём Timeline с pinSpacing: true — GSAP сам добавит padding-bottom
    mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: "main", // или убери если не нужен
        start: "top top",
        // Скролл-энд теперь относительно (GSAP рассчитает пространство автоматически)
        end: `+=${desiredTotalSpace}`,
        scrub: 4, // Unified to 2 for smoothness
        pin: true,
        pinSpacing: false, // КЛЮЧЕВОЕ: GSAP управляет padding-bottom автоматически
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastAndSlowScroll: true, // Better fast scroll handling
        // markers: true, // включи для отладки
      }
    });

    // 1) горизонтальный сдвиг wrapper (основное движение) — полная реальная дистанция
    mainTL.to(wrapper, { x: `-${scrollDistance}px`, ease: "none" }, 0);

    // 2) "лесенка"
    mainTL.to(panels, {
      y: (i) => `-${i * step}px`,
      duration: 1,
      ease: "power1.out",
      stagger: { each: 0.12 }
    }, 0);

    mainTL.fromTo(panels, { autoAlpha: 0.7 }, { autoAlpha: 1, duration: 0.2, stagger: 0.2 }, 0);

    // Обновим ScrollTrigger
    ScrollTrigger.refresh();

    return mainTL;
  }

  // инициализация
  initHorizontalScroll();

  // пересчитать на ресайзе
  let _hsResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_hsResizeTimer);
    _hsResizeTimer = setTimeout(() => {
      // очищаем
      if (mainTL) { try { mainTL.kill(); } catch(e){} }
      ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });
      ScrollTrigger.refresh();
      initHorizontalScroll();
    }, 200); // Increased debounce
  });

  // при размонтировании / навигации можно вызвать cleanup
})();

function adjustNextSection() {
  const section = document.querySelector('.horizontal-scroll');
  const next = section?.nextElementSibling;
  if (!section || !next) return;

  const pinSpacer = section.closest('.pin-spacer');
  if (!pinSpacer) return;

  // текущее "лишнее" место
  const pb = parseFloat(getComputedStyle(pinSpacer).paddingBottom || '0');

  // сколько хочешь реально оставить (зазор между блоками)
  const desiredGap = 100; // пикселей, можно менять под вкус
  const shift = pb - desiredGap;

  if (shift > 0) {
    next.style.marginTop = `-${shift}px`;
    next.style.position = 'relative';
    next.style.zIndex = 2;
  }
}

adjustNextSection();
window.addEventListener('resize', adjustNextSection);


// === PROTOCOLS: fixed-pin + horizontal scroll + protocols--card fly-in (исправленная версия) ===

// === PROTOCOLS: fixed-pin + horizontal scroll + card fly-in ===
(function() {
  const section = document.querySelector('.protocols-main__cards');
  if (!section) return;

  const wrapper = section.querySelector('.protocols-scroll__wrapper');
  const cards = gsap.utils.toArray('.protocols--card');
  if (!wrapper || cards.length === 0) {
    console.error('protocols: wrapper or cards not found');
    return;
  }

  // Убиваем старые триггеры для этой секции
  ScrollTrigger.getAll().forEach(t => {
    try { if (t.trigger === section) t.kill(); } catch(e){ }
  });

  let mainTL;

 function initProtocolsScroll() {
    // Очистка предыдущего
    if (mainTL) { try { mainTL.kill(); } catch(e){} }
    ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });

    // Пересчёт размеров
    const totalWidth = wrapper.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.max(0, totalWidth - viewportWidth);

    const isMobile = window.innerWidth <= 420;

    if (isMobile) {
        // Mobile: vertical stack, no horizontal scroll
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center'; // Center cards if desired
        wrapper.style.gap = '20px'; // Add space between stacked cards
        cards.forEach(c => {
            c.style.minWidth = 'unset';
            c.style.width = '90%'; // Or '100%' for full width
        });
    } else {
        // Desktop: horizontal flex
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        cards.forEach(c => c.style.minWidth = '320px');
    }

    // ПАРАМЕТР: желаемая вертикальная длина пиннинга -> теперь end относительно
    const desiredTotalSpace = isMobile ? 0 : scrollDistance * 0.01; // No extra space on mobile

    // Статический сдвиг карточек левее (only on desktop)
    if (!isMobile) {
        gsap.set(cards, { x: -20 });
    }

    // Timeline с pinSpacing: true (GSAP управляет padding)
    mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: "main", // Если smooth-scroll, убери или адаптируй
        start: "top 35%",
        end: `+=${desiredTotalSpace}`,
        scrub: 2, // Unified to 2
        pin: !isMobile, // Disable pin on mobile for natural vertical flow
        pinSpacing: !isMobile, // No extra spacing on mobile
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastAndSlowScroll: true, // Added
        markers: false, // Включи для отладки (покажет start/end на странице)
      }
    });

    // 1) Горизонтальный сдвиг wrapper (only on desktop)
    if (!isMobile) {
        mainTL.to(wrapper, { x: `-${scrollDistance}px`, ease: "none" }, 0);
    } else {
        mainTL.to(wrapper, { x: 0 }, 0); // No movement on mobile
    }

    // 2) Анимация вылета карточек снизу вверх (fly-in) с лёгким scale/rotate для заметности
    mainTL.fromTo(cards, 
      { y: 200, opacity: 0, scale: 0.8 }, // Removed rotation for perf
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.3, 
        ease: "power2.out",
        force3D: true // GPU acceleration
      }, 
      0 // Начинается сразу с timeline
    );

    // Обновляем ScrollTrigger
    ScrollTrigger.refresh();

    return mainTL;
}

  // Инициализация
  initProtocolsScroll();

  // Пересчёт на ресайзе
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mainTL) { try { mainTL.kill(); } catch(e){} }
      ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });
      ScrollTrigger.refresh();
      initProtocolsScroll();
    }, 200); // Increased
  });

  // При размонтировании можно вызвать cleanup
})();

// Корректировка следующей секции (если нужно, по аналогии с horizontal-scroll)
function adjustProtocolsNextSection() {
  const section = document.querySelector('.protocols-main__cards');
  const next = section?.nextElementSibling;
  if (!section || !next) return;

  const pinSpacer = section.closest('.pin-spacer');
  if (!pinSpacer) return;

  const pb = parseFloat(getComputedStyle(pinSpacer).paddingBottom || '0');
  const desiredGap = -700; // Зазор между блоками (px)
  const shift = pb - desiredGap;

  if (shift > 0) {
    next.style.marginTop = `-${shift}px`;
    next.style.position = 'relative';
    next.style.zIndex = 2;
  }
}

adjustProtocolsNextSection();
window.addEventListener('resize', adjustProtocolsNextSection);















// Вертикальные тикеры для others__usl (привязка к скроллу с активацией только в viewport)
(function() {
  const section = document.querySelector('.others__usl');
  if (!section) return;

  const tickers = gsap.utils.toArray('.vertical-ticker-container');
  if (tickers.length === 0) return;

  // Убиваем старые триггеры
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger === section) t.kill();
  });

  // Фикс FPS для общей плавности (добавьте это один раз в скрипт)
  gsap.ticker.fps(60);

  tickers.forEach((ticker, index) => {
    const track = ticker.querySelector('.vertical-ticker-track');
    if (!track) return;

    // Клонируем контент для seamless цикла (добавляем больше повторений вертикально)
    const items = track.querySelectorAll('.vertical-ticker-item');
    const clonesCount = 2; // Увеличьте, если нужно больше для цикла
    for (let i = 0; i < clonesCount; i++) {
      items.forEach(item => {
        track.appendChild(item.cloneNode(true));
      });
    }

    // Устанавливаем исходное состояние: y: 0, чтобы первая надпись была видна сверху/в центре
    gsap.set(track, { y: 0 }); // Если хотите центрировать: y: `-${(ticker.offsetHeight - items[0].offsetHeight) / 2}px`

    // Timeline для каждого тикера
    const tl = gsap.timeline({
      paused: true, // Начинаем в паузе, чтобы изначально был статичный текст
      scrollTrigger: {
        trigger: ticker, // Триггер на каждый тикер отдельно
        scroller: "main", // Если у вас smooth-scroll
        start: "top center", // Анимация начинается, когда верх тикера достигает центра viewport
        end: "bottom center", // Заканчивается, когда низ тикера достигает центра viewport
        scrub: 2, // Unified
        invalidateOnRefresh: true,
        fastAndSlowScroll: true, // Added
        onEnter: () => tl.play(), // Активируем анимацию при входе в viewport
        onLeave: () => tl.pause(), // Паузируем при выходе (текст замерзает)
        onEnterBack: () => tl.play(), // Возобновляем при скролле назад
        onLeaveBack: () => tl.pause(),
      }
    });

    tl.to(track, {
      y: "-22%", // Сдвиг вниз (сверху вниз при скролле вниз)
      ease: "power1.inOut", // Добавлено для smoother кривой анимации
      duration: 5, // Увеличено для замедления (экспериментируйте: 3-5)
      scrub: 2, // Unified
      force3D: true, // GPU
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % (track.scrollHeight / 2)) // Seamless loop по y
      }
    });

    // Если хотите обратное направление: y: "50%" и modifiers соответственно
    // Для чередования: y: index % 2 === 0 ? "-50%" : "50%"
  });

  // Обновление на ресайзе (чтобы позиция пересчитывалась)
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    // Переустановка исходной позиции на ресайзе, если нужно
    tickers.forEach(ticker => {
      const track = ticker.querySelector('.vertical-ticker-track');
      gsap.set(track, { y: 0 });
    });
  });
})();
















(function() {
  const section = document.querySelector('.other-services__cards');
  if (!section) return;

  const wrapper = section.querySelector('.other-scroll__wrapper');
  const cards = gsap.utils.toArray('.other--card');
  if (!wrapper || cards.length === 0) {
    console.error('other-services: wrapper or cards not found');
    return;
  }

  // Убиваем старые триггеры для этой секции
  ScrollTrigger.getAll().forEach(t => {
    try { if (t.trigger === section) t.kill(); } catch(e){ }
  });

  let mainTL;

  function initOtherServicesScroll() {
    // Очистка предыдущего
    if (mainTL) { try { mainTL.kill(); } catch(e){} }
    ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });

    // Пересчёт размеров
    const totalWidth = wrapper.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.max(0, totalWidth - viewportWidth);

    // Всегда используем flex для горизонтального вида
    wrapper.style.display = 'flex';
    cards.forEach(c => c.style.minWidth = '320px'); // Исходный размер

    // ПАРАМЕТР: желаемая вертикальная длина пиннинга -> теперь end относительно
    const desiredTotalSpace = scrollDistance * 0.3; // Adjust for speed

    // Статический сдвиг карточек левее (добавлено здесь)
    gsap.set(cards, { x: -20 });

    // Timeline с pinSpacing: true (GSAP управляет padding)
    mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: "main", // Если smooth-scroll, убери или адаптируй
        start: "top 5%",
        end: `+=${desiredTotalSpace}`,
        scrub: 2, // Unified
        pin: true,
        pinSpacing: true, // Автоматическое управление spacing
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastAndSlowScroll: true, // Added
        // markers: true, // Включи для отладки
      }
    });

    // 1) Горизонтальный сдвиг wrapper (справа налево)
    // mainTL.to(wrapper, { x: `-${scrollDistance}px`, ease: "none" }, 0); // Закомментировано как в оригинале, если нужно — раскомментируйте

    // 2) Анимация вылета карточек снизу вверх (fly-in) с лёгким scale/rotate для заметности
    mainTL.fromTo(cards, 
      { x: 400, opacity: 0, scale: 0.8 }, // Removed rotation
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.3, 
        ease: "power2.out",
        force3D: true // GPU
      }, 
      0 // Начинается сразу с timeline
    );

    // Обновляем ScrollTrigger
    ScrollTrigger.refresh();

    return mainTL;
  }

  // Инициализация
  initOtherServicesScroll();

  // Пересчёт на ресайзе
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mainTL) { try { mainTL.kill(); } catch(e){} }
      ScrollTrigger.getAll().forEach(t => { try { if (t.trigger === section) t.kill(); } catch(e){} });
      ScrollTrigger.refresh();
      initOtherServicesScroll();
    }, 200); // Increased
  });

  // При размонтировании можно вызвать cleanup
})();

// Корректировка следующей секции (аналогично оригиналу)
function adjustOtherServicesNextSection() {
  const section = document.querySelector('.other-services__cards');
  const next = section?.nextElementSibling;
  if (!section || !next) return;

  const pinSpacer = section.closest('.pin-spacer');
  if (!pinSpacer) return;

  const pb = parseFloat(getComputedStyle(pinSpacer).paddingBottom || '0');
  const desiredGap = -700; // Зазор между блоками (px)
  const shift = pb - desiredGap;

  if (shift > 0) {
    next.style.marginTop = `-${shift}px`;
    next.style.position = 'relative';
    next.style.zIndex = 2;
  }
}

adjustOtherServicesNextSection();
window.addEventListener('resize', adjustOtherServicesNextSection);



// Добавьте это в script.js, в конец файла (после всех существующих (function() { ... })(); )

// === FOOTER: "Вылазит" из-под .coop при скролле ===
(function() {
  const coopSection = document.querySelector('.coop');
  const footer = document.querySelector('.footer');
  if (!coopSection || !footer) return;

  // Убиваем старые триггеры для этой секции (если были)
  ScrollTrigger.getAll().forEach(t => {
    try { if (t.trigger === coopSection || t.trigger === footer) t.kill(); } catch(e){ }
  });

  let mainTL;

  function initFooterEffect() {
    // Очистка
    if (mainTL) { try { mainTL.kill(); } catch(e){} }
    ScrollTrigger.getAll().forEach(t => { 
      try { if (t.trigger === coopSection || t.trigger === footer) t.kill(); } catch(e){} 
    });

    // Позиционируем футер изначально "под" .coop: сдвинут вниз
    gsap.set(footer, { 
      y: '100%', // Полностью скрыт снизу
      autoAlpha: 0 // Невидим
    });

    // ПАРАМЕТР: желаемая вертикальная длина эффекта (px) — сколько скролла нужно для полного появления футера
    const desiredTotalSpace = 10; // Увеличьте для медленного "вылазания"; подстройте под высоту .coop

    // Timeline: футер "вылазит" снизу вверх по мере скролла .coop
    mainTL = gsap.timeline({
      scrollTrigger: {
        trigger: coopSection,
        scroller: "main", // Если у вас smooth-scroll в main
        start: "top bottom", // Начинаем, когда верх .coop достигает низа viewport
        end: `+=${desiredTotalSpace}`, // Длина эффекта
        scrub: 2, // Unified
        pin: false, // Не пинним .coop, только анимируем футер
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastAndSlowScroll: true, // Added
        // markers: true, // Включи для отладки
      }
    });

    // Анимация: футер поднимается из-под .coop (y от 100% к 0) + fade-in
    mainTL.to(footer, {
      y: '0%', // Поднимается на место
      autoAlpha: 1, // Появляется
      ease: "power2.out",
      duration: 1, // Время анимации (scrub растянет по скроллу)
      force3D: true // GPU
    }, 0);

    // Дополнительно: лёгкий parallax для контента футера (опционально, для живости)
    mainTL.fromTo('.footer__content', 
      { y: 50, scale: 0.95 }, 
      { y: 0, scale: 1, duration: 0.8, ease: "power2.out", force3D: true }, 
      0.2 // Начинается чуть позже
    );

    ScrollTrigger.refresh();
    return mainTL;
  }

  // Инициализация
  initFooterEffect();

  // Пересчёт на ресайзе
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mainTL) { try { mainTL.kill(); } catch(e){} }
      ScrollTrigger.getAll().forEach(t => { 
        try { if (t.trigger === coopSection || t.trigger === footer) t.kill(); } catch(e){} 
      });
      ScrollTrigger.refresh();
      initFooterEffect();
    }, 200); // Increased
  });
})();

// Global menu toggle used by index.html button
function toggleMenu() {
  const body = document.body;
  const icon = document.querySelector('.toggle .fa-solid');
  body.classList.toggle('close__menu');
  if (icon) {
    icon.classList.toggle('fa-bars-staggered');
    icon.classList.toggle('fa-xmark');
  } else {
    const any = document.querySelector('.fa-solid');
    if (any) {
      any.classList.toggle('fa-bars-staggered');
      any.classList.toggle('fa-xmark');
    }
  }
}