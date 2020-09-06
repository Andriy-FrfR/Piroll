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
}

//Nav-item active

nav.addEventListener('click', navItem);

function navItem(event) {
    let target = event.target.closest('.nav-item');

    if (!target) return;

    if (navItemActive) {
        navItemActive.classList.remove('active');
    }

    target.classList.add('active');

    navItemActive = target;
}

// Skills

function defineBlueBarWidth() {
    const skillsItems = document.querySelectorAll('.skills-item');

    for (let item of skillsItems) {
        const blueBar = item.querySelector('.percents-blue-bar'),
            greyBar = item.querySelector('.percents-grey-bar'),
            percents = +item.querySelector('.skills-percents').innerHTML;

        blueBar.style.width = greyBar.offsetWidth / 100 * percents + 'px';
    }
}

defineBlueBarWidth();

// Slider

const sliderInner = document.querySelector('.slider-inner'),
    sliderWrapper = document.querySelector('.slider-wrapper'),
    sliderImages = document.querySelectorAll('.slider-image');

let sliderActiveImage = document.querySelector('.slider-image.active');
    sliderActiveImage.src = '../images/slider/slider-active.png'
    
sliderWrapper.style.marginLeft = (-sliderActiveImage.dataset.order + 1) * sliderInner.offsetWidth + 'px';

for (let img of sliderImages) {
    img.addEventListener('click', sliderImageClick);
}

function sliderImageClick() {
    const currentItemOrder = +this.dataset.order;
    let difference = currentItemOrder - +sliderActiveImage.dataset.order;

    sliderWrapper.style.marginLeft = parseFloat(window.getComputedStyle(sliderWrapper).marginLeft) -difference * sliderInner.offsetWidth + 'px';

    sliderActiveImage.src = '../images/slider/slider-passive.png';
    this.src = '../images/slider/slider-active.png';

    sliderActiveImage = this;
}   