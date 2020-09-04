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

// let skillsItemsPercents = document.querySelectorAll('.skills-percents');

// function defineSkillsBeforeWidth() {
//     for (let item of skillsItemsPercents) {
//         let parent = item.closest('.skills-item');

//         (item) => alert(1);
//     }
// }

// defineSkillsBeforeWidth();