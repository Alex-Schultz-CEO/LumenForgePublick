gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.5,
		effects: true
	})

	gsap.fromTo('.hero-section', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.hero-section',
			start: 'center',
			end: '820',
			scrub: true
		}
	})

	let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0.5, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

}





const card = document.getElementById('card');
const layers = card.querySelectorAll('.layer');

// Функция, вычисляющая смещение от центра
function handleMouseMove(e) {
  const { width, height, left, top } = card.getBoundingClientRect();
  // Нормализуем координаты курсора в диапазон [-0.5, 0.5]
  const xNorm = (e.clientX - left) / width  - 0.5;
  const yNorm = (e.clientY - top)  / height - 0.5;

  layers.forEach(layer => {
    const depth = parseFloat(layer.getAttribute('data-depth'));
    const moveX = -xNorm * depth * 30;  // множитель 30px
    const moveY = -yNorm * depth * 30;
    gsap.to(layer, {
      x: moveX,
      y: moveY,
      ease: 'power3.out',
      duration: 0.5



	  
    })
	gsap.from(".block__anim", {
      autoAlpha: 0,
      x: 200,
      y: 400,
      duration: .5,
      ease: "back.out",
      scrollTrigger: {
          trigger: ".about",
          start: "top top",
          end: "bottom top"
        }
    }) ;
	


  });
}

initMenuAnimation({
  toggle: '.toggle',
  header: '.header',
  menu: '.header__menu',
  logo: '.header__logo',
  cors: '.header__cors',
  bg: '.bg',
  bodyCloseClass: 'close__menu',
  iconSelector: '.fa-solid'
});


// События мыши
card.addEventListener('mousemove', handleMouseMove);
card.addEventListener('mouseleave', () => {
  // При уходе мыши возвращаем всё в центр
  layers.forEach(layer => {
    gsap.to(layer, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
  });
});


gsap.from(".block__anim", {
      autoAlpha: 0,
      x: 200,
      y: 400,
      duration: .5,
      ease: "back.out",
      scrollTrigger: {
          trigger: ".about",
          start: "top top",
          end: "bottom top"
        }
    }) 


// --------------------


