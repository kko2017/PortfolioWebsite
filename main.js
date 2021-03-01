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
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});


// Make home slowly fade out as the window scrolls down 
const homeContainer = document.querySelector('.home__container');
const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - (window.scrollY / homeContainerHeight);
});

// Show arrow-up when scrolling down
const arrowUpBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeContainerHeight / 2) {
        arrowUpBtn.classList.add('visible');
    } else {
        arrowUpBtn.classList.remove('visible');
    }
});

// Arrow-up button event handler
arrowUpBtn.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnsContainer = document.querySelector('.work__categories');
const projectsContainer = document.querySelector('.work__projects');
const allProjects = document.querySelectorAll(".project");

workBtnsContainer.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'work__categories') {
        return;
    }
    
    let filter = null;
    const active = workBtnsContainer.querySelector('.active');
    active.classList.remove('active');

    if (e.target.dataset.filter) {
        e.target.classList.add('active');
        filter = e.target.dataset.filter;
    } else {
        e.target.parentNode.classList.add('active');
        filter = e.target.parentNode.dataset.filter;
    }

    if (filter == null) {
      return;
    }
    projectsContainer.classList.add('animation-out');
    setTimeout(() => {
        allProjects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
            project.classList.remove('invisible');
            } else {
            project.classList.add('invisible');
            }
        });
        projectsContainer.classList.remove('animation-out');
    }, 300);
});