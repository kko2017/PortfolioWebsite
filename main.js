'use strict'

// When clicking a button, scrolling into the view
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// Navbar is transparent when it is on top.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    const activeMenu = navbarMenu.querySelector('.active');
    if (activeMenu != null) {
        activeMenu.classList.remove('active');
    }

    target.classList.add('active');
    scrollIntoView(link);
});

// Handle click on 'Contact me' button on Home 
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
    scrollIntoView('#contact');
});