'use strict';

//Toggle

const toggle = document.querySelector('.toggle'),
    nav = document.querySelector('.nav');

toggle.addEventListener('click', toggleMenu);

function toggleMenu() {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
}

let navItemActive;

nav.onmousedown = function() {
    return false;
};

//Nav-item active

nav.addEventListener('click', navItem);

function navItem(event) {
    let target = event.target.closest('.nav-item');

    if (!target) {
        return;
    }

    if (navItemActive) {
        navItemActive.classList.remove('active');
    }

    target.classList.add('active');

    navItemActive = target;
}

// Slider

const sliderInner = document.querySelector('.slider-inner'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderImages = document.querySelectorAll('.slider-image');

let sliderActiveImage = document.querySelector('.slider-image.active');
    sliderActiveImage.src = 'images/slider/slider-active.png';
    
sliderWrapper.style.marginLeft = (-sliderActiveImage.dataset.order + 1) * sliderInner.offsetWidth + 'px';

for (let img of sliderImages) {
    img.addEventListener('click', sliderImageClick);
}

function sliderImageClick() {
    const currentItemOrder = +this.dataset.order;
    let difference = currentItemOrder - +sliderActiveImage.dataset.order;

    sliderWrapper.style.marginLeft = parseFloat(window.getComputedStyle(sliderWrapper).marginLeft) - difference * sliderInner.offsetWidth + 'px';

    sliderActiveImage.src = 'images/slider/slider-passive.png';
    this.src = 'images/slider/slider-active.png';

    sliderActiveImage = this;
}

//Animations

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = topOffset(animItem).offset;

            let animPersOffset = animItemHeight / 100 * animItem.dataset.animPersOffset || 0,
                animPixOffset = animItem.dataset.animPixOffset || 0;

            let animItemPoint = window.innerHeight - (+animPersOffset + +animPixOffset);

            if ((window.pageYOffset > animItemOffset - animItemPoint) && (window.pageYOffset < animItemOffset + animItemHeight)) {
                setTimeout(() => {
                    animItem.classList.add('animate');
                }, animItem.dataset.animDelay);
            } else {
                if (animItem.classList.contains('unanimate')) {
                    animItem.classList.remove('animate');
                }
            }
        }
    }

    const topOffset = (elem) => {
        const elemRect = elem.getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return { offset: elemRect.top + scrollTop, };
    };

    animOnScroll();
    window.addEventListener('scroll', animOnScroll);
}

// Skills-bars animation

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
          timeFraction = 1;
      }
  
      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);
  
      draw(progress); // отрисовать её
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
}

const skillsItems = document.querySelectorAll('.skills-item'),
    skillsItemsWrapper = document.querySelector('.skills-items-wrapper');

window.addEventListener('scroll', () => {
    if (skillsItemsWrapper.classList.contains('animate') && !skillsItemsWrapper.classList.contains('animated')) {
        animate({
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                for(let elem of skillsItems) {
                    const blueBar = elem.querySelector('.percents-blue-bar'),
                        greyBar = elem.querySelector('.percents-grey-bar'),
                        percents = +elem.querySelector('.skills-percents').innerHTML;

                    blueBar.style.width = greyBar.offsetWidth / 100 * percents * progress + 'px';
                }

                skillsItemsWrapper.classList.add('animated')
            },
            duration: 300,
        });
    }
});