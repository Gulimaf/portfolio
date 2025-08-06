document.addEventListener('DOMContentLoaded', function() {
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
        
    });
const sky = document.getElementById('inicio'); 
const totalStars = 35; 

for(let i = 0; i < totalStars; i++){
  const star = document.createElement('span');
  const randomX = Math.random() * window.innerWidth;
  star.style.left = `${randomX}px`;
  const randomY = Math.random() * window.innerHeight;
  star.style.top = `${randomY}px`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  star.style.animationDuration = `${Math.random() * 2 + 3}s`;
  sky.appendChild(star);
}

 const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("ativo", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.3
});

sections.forEach(section => observer.observe(section));

class MobileNavBar {
    constructor(barra, navList, navLink) {
        this.barra = document.querySelector(barra);
        this.navList = document.querySelector(navList);
        this.navLink = document.querySelectorAll(navLink);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.barra.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.barra.addEventListener("click", this.handleClick);
        this.navLink.forEach(link =>
            link.addEventListener("click", () => {
                this.navList.classList.remove(this.activeClass);
                this.barra.classList.remove(this.activeClass);
            })
        );
    }

    init() {
        if (this.barra) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavBar = new MobileNavBar(
    ".barra",
    ".nav-list",
    ".nav-list li"
);

document.addEventListener('DOMContentLoaded', function() {
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
        mobileNavBar.init();
    });
const cards = document.querySelectorAll('.card')
cards.forEach(card =>{
    card.addEventListener('mouseenter', (event)=>{
        const cardhover = event.currentTarget
        cardhover.querySelectorAll('.icon').forEach(el =>{
        const color = getComputedStyle(el).color
        el.style.textShadow = `0 1px 2px ${color}`
    })
    })
    card.addEventListener('mouseleave',(event)=>{
        const cardhover = event.currentTarget
        cardhover.querySelectorAll('.icon').forEach(el =>{
            el.style.textShadow = 'none'
    })
})
})

