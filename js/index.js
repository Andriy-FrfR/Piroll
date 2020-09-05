'use strict';

let toggle = document.querySelector('.toggle'),
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

function defineBlueBarWidth() {
    let skillsItems = document.querySelectorAll('.skills-item');

    for (let item of skillsItems) {
        let blueBar = item.querySelector('.percents-blue-bar'),
            greyBar = item.querySelector('.percents-grey-bar'),
            percents = +item.querySelector('.skills-percents').innerHTML;

        blueBar.style.width = greyBar.offsetWidth / 100 * percents + 'px';
    }
}

defineBlueBarWidth();