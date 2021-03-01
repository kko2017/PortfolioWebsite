'use strict'

// Lectangle moves to the targeted navbar when scrolling the bar. 
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
     });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});

// Global function: scrolling into the view when clicking a button
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);
});

// Navbar is transparent when it is on top.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    navbarMenu.classList.remove('open');
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Activate navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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