'use strict';

//Toggle

const toggle = document.querySelector('.toggle'),
    nav = document.querySelector('.nav');

const toggleMenu = () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
};

toggle.addEventListener('click', toggleMenu);

nav.onmousedown = () => {
    return false;
};

//Nav-item active

let navItemActive;

const navItem = (event) => {
    let target = event.target.closest('.nav-item');

    if (!target) {
        return;
    }

    if (navItemActive) {
        navItemActive.classList.remove('active');
    }

    target.classList.add('active');

    navItemActive = target;
};

nav.addEventListener('click', navItem);

// Slider

const sliderInner = document.querySelector('.slider-inner'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderImages = document.querySelectorAll('.slider-image');

let sliderActiveImage = document.querySelector('.slider-image.active');
    sliderActiveImage.src = 'images/slider/slider-active.png';
    
sliderWrapper.style.marginLeft = (-sliderActiveImage.dataset.order + 1) * sliderInner.offsetWidth + 'px';

const sliderImageClick = (event) => {
    const currentItemOrder = +event.currentTarget.dataset.order;
    let difference = currentItemOrder - +sliderActiveImage.dataset.order;

    sliderWrapper.style.marginLeft = parseFloat(window.getComputedStyle(sliderWrapper).marginLeft) - difference * sliderInner.offsetWidth + 'px';

    sliderActiveImage.src = 'images/slider/slider-passive.png';
    event.currentTarget.src = 'images/slider/slider-active.png';

    sliderActiveImage = event.currentTarget;
};

for (let img of sliderImages) {
    img.addEventListener('click', sliderImageClick);
}

//Animations

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {

      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
          timeFraction = 1;
      }
  
      let progress = timing(timeFraction); // Getting progress (From 0 to 1) based on a timing-function
  
      draw(progress); // Rendering animation based on progress
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
}

const skillsItems = document.querySelectorAll('.skills-item'),
    skillsItemsWrapper = document.querySelector('.skills-items-wrapper');

const skillsAnimate = () => {

    // Define blue bar's width

    if (skillsItemsWrapper.classList.contains('animate') && !skillsItemsWrapper.classList.contains('animated')) {
        animate({
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                for(let elem of skillsItems) {
                    const blueBar = elem.querySelector('.percents-blue-bar'),
                        greyBar = elem.querySelector('.percents-grey-bar'),
                        percents = +elem.querySelector('.skills-percents').dataset.target;
    
                    blueBar.style.width = greyBar.offsetWidth / 100 * percents * progress + 'px';
                }
    
                skillsItemsWrapper.classList.add('animated');
            },
            duration: 600,
        });
    }

    // Animation of percents

    const percents = document.querySelectorAll('.skills-percents');

    percents.forEach((element) => {
        const updateCount = () => {
            const target = +element.dataset.target;
            const percents = +element.innerHTML;

            const inc = 1;

            if (percents < target) {
                element.innerHTML = Math.ceil(percents + inc);
                setTimeout(updateCount, 20);
            } else {
                element.innerHTML = target;
            }
        };

        updateCount();
    });
};


const animItems = document.querySelectorAll('.anim-items');

// Animations on scroll

if (animItems.length > 0) {
    const animOnScroll = () => {
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
                    skillsAnimate();
                }, animItem.dataset.animDelay);
            } else {
                if (animItem.classList.contains('unanimate')) {
                    animItem.classList.remove('animate');
                }
            }
        }
    };

    const topOffset = (elem) => {
        const elemRect = elem.getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return { offset: elemRect.top + scrollTop, };
    };

    animOnScroll();
    window.addEventListener('scroll', animOnScroll);
}