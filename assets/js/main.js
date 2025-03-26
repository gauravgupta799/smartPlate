const html = document.querySelector("html");
const body = document.querySelector(".body");


//====== Registerd ScrollTrigger Plugin ==========
gsap.registerPlugin(ScrollTrigger);

function hideLoader(){
  tl.to(".loader-upper",{
      y:"-100%",
      duration:0.8,
      ease: "sine.inOut",
  })
  tl.to(".loader-inner",{
      x:"100%",
      duration:0.8,
      ease: "sine.inOut",
  }, "-=0.15")
}

//========= LENIS START =========
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  infinite: false,
  syncTouch:false, // mimic touch device scroll while allowing scroll sync (can be unstable on iOS<16)
  smoothTouch: false,
});

function raf(time){
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= LENIS END =========

//========= SCROLL & NAVBAR TOGGLE START =========
// const headerTop = document.querySelector(".header-top");
const headerBottom = document.querySelector(".header-bottom");

let prevScrollPos = 0;
const scrollThreshold = 10;  // Prevents accidental small scroll triggers
function checkScroll(){
  let scrollTop = lenis.scroll || document.documentElement.scrollTop;
  if(scrollTop - prevScrollPos > scrollThreshold){
    // headerBottom.classList.remove("hiiden");
    headerBottom.classList.add("sticky");
  }else if(prevScrollPos - scrollTop > scrollThreshold){
    // headerBottom.classList.add("hidden");
    headerBottom.classList.remove("sticky");
  }
  prevScrollPos = Math.max(0, scrollTop); // Update previous scroll position
}

// let lastScrollY = window.scrollY;
// function checkScroll(){
//   let scrollY = window.scrollY;
//   if(scrollY < lastScrollY){
//     // scrolling down
//     headerBottom.classList.add("hidden");
//   }else{
//     // scrolling up
//     headerBottom.classList.remove("hidden");
//   }

//   // show header-top only when at top
//   // if(scrollY === 0){
//   //   headerTop.style.transform = "translateY(0)";
//   // }else{
//   //   headerTop.style.transform = "translateY(-100%)";
//   // }

//   lastScrollY = scrollY;
// }
//========= SCROLL & NAVBAR TOGGLE END =========

//======= LENIS SCROLL CONTROL =========
let isOpened = false;
function stopLenisScroll(){
  isOpened = !isOpened;
  isOpened ?  lenis.stop() : lenis.start() 
}

//======= ACTIVE NAVIGATION LINK START =========
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link =>{
 const navLinkPathname = new URL(link.href, window.location.origin).pathname;
 const isActiveLink = windowPathname === navLinkPathname || (windowPathname === "/index.html" && navLinkPathname === "/")
  link.classList.toggle("active", isActiveLink);
});
//======= ACTIVE NAVIGATION LINK END =========


//======= BANNER CONTENT ANIMATION START =========
function bannerContentsAnimation(){
  const tl = gsap.timeline();
  // Header Animation Start
  tl.from([".header__logo", ".header-btn"], {
    opacity: 0,
    y: 50,
    delay: 0.6,
    duration: 1,
    stagger:0.2,
    ease: Expo.easeInOut,
  });
  tl.from([".navbar__link", "#hamburger-btn"], {
      opacity:0,
      y:40,
      duration:0.8,
      stagger:0.1,
      delay:-1.15,
      ease:"power4.out",
    }
  );
  // Header Animation End


  tl.from(".hero-title", {
    opacity: 0,
    duration: 1,
    // y: 50,
    delay: -1.05,
    stagger:0.1,
    ease: "power4.out",
  });
  const heroSubTitle = document.querySelector(".hero-subTitle");
  heroSubTitle && tl.from(heroSubTitle, {
    opacity: 0,
    duration: 1,
    y: 50,
    delay: -1.10,
    stagger:0.1,
    ease: "power4.out",
  });
  const heroBtns = document.querySelector(".hero-btn");
  heroBtns && tl.from(heroBtns, {
    opacity: 0,
    duration: 1,
    y: 50,
    delay: -1.15,
    stagger:0.1,
    ease: "power4.out",
  });

  tl.from(".accordion-wrapper",{
    opacity:0,
    y:30,
    duration:0.8,
    delay:-1.35,
    stagger:0.1,
    ease:"power4.in"
  })
  tl.from(".hero__contact-banner",{
    opacity:0,
    duration:1,
    delay:-1.85,
    ease:"power4.in"
  })
  tl.from(".cta-link",{
    opacity:0,
    y:30,
    delay:-1.5,
    duration:1,
    stagger:0.2,
    ease:"power4.inOut"
  })

  const bannerImage = document.querySelectorAll(".animate-hero-image");
  bannerImage && tl.from(bannerImage, {
    opacity: 0,
    x: -30,
    duration: 1,
    delay: -2,
    stagger:0.1,
    ease:"power4.in",
  });
}
//======= BANNER CONTENT ANIMATION END =========

//====== TOGGLE MOBILE SUBMENU START ==========
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__item");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);
const hamburgerBtn = document.getElementById("hamburger-btn");

const tl = gsap.timeline();
hamburgerBtn && hamburgerBtn.addEventListener('click', () => {
  gsap.fromTo(".aside-mobile", 
    {
      opacity:0,
      x:"-100%",

    },{
      opacity:1,
      x:0,
      duration:0.8,
      ease:"power3.inOut"
    }
  );
  tl.fromTo(".close-menu-btn", 
    {
     opacity:0,
     duration:0.6,
   },{
     opacity:1,
     delay:0.02,
     ease:"power3.inOut",
   }
  )
  mobileMenuLinksArr.forEach((mobileLink)=>{
      gsap.fromTo(mobileLink,
        {
            opacity:0,
            y:60,
        },{
            opacity:1,
            y:0,
            duration:1.2,
            stagger:0.5,
            ease:"power3.inOut"
        }
      );
  });

  tl.fromTo(".socials__item", 
    {
      opacity:0,
      x:-100,
    },{
      opacity:1,
      x:0,
      stagger:0.02,
      delay:-0.1,
      duration:0.8,
      ease:"power3.inOut",
    }
  )
  stopLenisScroll();
});

// window.addEventListener("resize", function(){
//   if (window.innerWidth >= 992) {
//     $(".aside-mobile").addClass();
//   }
// })

const closeMenuBtn = document.querySelector("#close-menu-btn");
closeMenuBtn && closeMenuBtn.addEventListener("click", function(){
  tl.fromTo(".socials__item", 
    {
      opacity:1,
      x:0,
      stagger:0.02,
      delay:-0.1,
      duration:1,
      ease:"power3.inOut",
    },{
      opacity:0,
      x:-100,
    }
  )
  mobileMenuLinksArr.forEach((mobileLink)=>{
    gsap.fromTo(mobileLink,
      {
          opacity:1,
          y:0,
          duration:1.2,
          stagger:0.5,
          ease:"power3.inOut"
      },{
          opacity:0,
          y:60,
      }
     );
   });
  tl.fromTo(".close-menu-btn", 
    {
     opacity:1,
     duration:0.6,
     delay:0.02,
     ease:"power3.inOut",
    },{
     opacity:0,
    }
  )
  gsap.fromTo(".aside-mobile", 
    {
      opacity:1,
      x:0,
      duration:0.65,
      ease:"power3.inOut"
    },{
      opacity:0,
      x:"-100%",
    }
  );
  stopLenisScroll();  
});

const backMenuBtn = document.getElementById("arrow-back-btn");
const mobileSubmenu = document.getElementById("mobileSubmenu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

// Ensure elements exist before adding event listeners
if(mobileSubmenu && mobileMenuOverlay) {
    mobileSubmenu.addEventListener("click", () => {
        mobileMenuOverlay.classList.add("show");
        gsap.from(".top-title",{
          opacity:0,
          duration:1,
          stagger:0.1,
          ease:"power4.in"
        })
        gsap.from(".mobile-menu-overlay-wrapper .mobile-menu__link",{
          opacity:0,
          y:30,
          duration:1,
          stagger:0.1,
          ease:"power4.inOut"
        });
    });
}

if(backMenuBtn && mobileMenuOverlay) {
  backMenuBtn.addEventListener("click", () => mobileMenuOverlay.classList.remove("show"));
}


// const mobileSubmenus = document.querySelectorAll(".mobile-submenu");
// if(mobileSubmenus.length){
//   mobileSubmenus.forEach((submenu)=>{
//     submenu.addEventListener("click", function(){
//         const menu = submenu.querySelector(".subMenu__list--mobile");
//         submenu.classList.toggle("active");
//         menu.style.maxHeight = menu.style.maxHeight = menu.style.maxHeight ? null : `${menu.scrollHeight}px`;
   
//         mobileSubmenus.forEach((otherSubmenu)=>{
//           if(otherSubmenu !== submenu){
//             otherSubmenu.classList.remove("active");
//             const otherMenu = otherSubmenu.querySelector(".subMenu__list--mobile");
//             if(otherMenu) otherMenu.style.maxHeight = null;
//           }
//         })
//     })
//   })
// }
//====== TOGGLE MOBILE SUBMENU END ==========


//======== ACCORDION TOGGLE START ========
let content;
function toggleAccordion(element){ 
  element.classList.toggle("is-open");
  content = element.nextElementSibling;
  if(content){
    const isOpening = content.style.maxHeight;
    content.style.maxHeight = isOpening ? null : `${content.scrollHeight}px`;
    gsap.fromTo(content.children, 
      { opacity: 0, y:50 },
      { opacity: 1, y:0, duration:0.85, stagger:0.1,ease:"power3.out"}
    );
  }
}

const accordionBtns = document.querySelectorAll(".accordion-title");
accordionBtns && accordionBtns.forEach((accordion) => {
  accordion.addEventListener("click",function (e){
    e.stopPropagation();
    toggleAccordion(accordion);
    accordionBtns.forEach(otherAccordion => {
      if(otherAccordion !== accordion) {
        otherAccordion.classList.remove("is-open");
        otherAccordion.nextElementSibling.style.maxHeight = null;
      }
    });
  });
});
//======== ACCORDION TOGGLE END ========

//======= COUNTER START  ===========
function visible(partial) {
  let $t = partial,
    $w = jQuery(window),
    viewTop = $w.scrollTop(),
    viewBottom = viewTop + $w.height(),
    _top = $t.offset().top,
    _bottom = _top + $t.height(),
    compareTop = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;

  return (
    compareBottom <= viewBottom && compareTop >= viewTop && $t.is(":visible")
  );
}
function updateCounter(){
  const myCounter = document.querySelector('.counter-value');
  if (myCounter && visible($(".counter-value"))){
    if ($(".counter-value").hasClass("counter-loaded")) return;
    $(".counter-value").addClass("counter-loaded");
    $(".counter-value").each(function () {
      if ($(this).html() == Math.floor($(this).html())) {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate(
          { Counter: $this.text() },
          {
            duration: 1500,
            easing: "swing",
            step: function () {
              $this.text(Math.trunc(this.Counter) + 1);
            },
          }
        );
      } else {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate(
          { Counter: $this.text() },
          {
            duration: 1500,
            easing: "swing",
            step: function () {
              $this.text(((this.Counter * 10) / 10).toFixed(1));
            },
          }
        );
      }
    });
  }
}
//======= COUNTER END ==========


//======= FLOATING INPUT LABLE START ======
document.querySelectorAll(".form__control").forEach((input) => {
  input.addEventListener("focus", () => input.nextElementSibling.classList.add("focused"))
  input.addEventListener("blur", () => input.nextElementSibling.classList.toggle("focused", input.value !== ""));
}); 
//======= FLOATING INPUT LABLE END ======


//===== ENABLE/DISABLE SUBMIT BUTTON START =======
// const inputCheckbox = document.getElementById("agree-consent");
// inputCheckbox && inputCheckbox.addEventListener("change", function() {
//   const submitBtn = document.getElementById("submit-btn");
//   this.checked ? submitBtn.classList.remove("disabled") : submitBtn.classList.add("disabled");
// });
//===== ENABLE/DISABLE SUBMIT BUTTON END ======

const readBioBtns = document.querySelectorAll(".read-bio-btn");
const popupContainers = document.querySelectorAll(".team-bio-popup");
const closePopupBtns = document.querySelectorAll(".popup-close-btn");

function togglePopup(index){
  popupContainers[index].classList.toggle("show");
  document.querySelector(".overlay").classList.toggle("show");
  stopLenisScroll();
}


readBioBtns && readBioBtns.forEach((readBtn ,index)=>{
  readBtn.addEventListener("click",()=> togglePopup(index));
  closePopupBtns && closePopupBtns[index].addEventListener("click",()=> togglePopup(index))
});


document.addEventListener("DOMContentLoaded", function () {
  const scrollableContent = document.querySelector(".team-member__details");

  let startY, startScrollTop;
  
  scrollableContent && scrollableContent.addEventListener("touchstart", (e) => {
    startY = e.touches[0].pageY;
    startScrollTop = scrollableContent.scrollTop;
  });

  scrollableContent && scrollableContent.addEventListener("touchmove", (e) => {
    let moveY = e.touches[0].pageY;
    let deltaY = startY - moveY;
    scrollableContent.scrollTop = startScrollTop + deltaY;
  });
});


//====== ANIMATION SCRIPT START =========
const textContainers = gsap.utils.toArray(".fade-up");
textContainers.forEach((textContainer, i) => {
  const anim = gsap.fromTo(
    textContainer,
    { opacity: 0, y: 50 },
    { duration: 1, opacity: 1, y: 0 }
  );
  ScrollTrigger.create({
    trigger: textContainer,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1,
    stagger:0.2,
    ease:"power4.inOut",
  });
});

const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
  const anim = gsap.fromTo(
    mainContent,
    { opacity: 0 },
    { opacity: 1, duration: 1}
  );
  ScrollTrigger.create({
    trigger: mainContent,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1,
    ease: "power4.in",
  });
});
//====== ANIMATION SCRIPT END =========


window.addEventListener("load",()=>{
  hideLoader();
  bannerContentsAnimation();
});

// Lenis scroll event
const onLenisScroll =()=>{
  checkScroll();
  updateCounter();
  ScrollTrigger.update();
}

lenis.on('scroll', onLenisScroll);

// Sync Lenis with GSAP
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing for better performance
gsap.ticker.lagSmoothing(0);
