'use strict';
//스크롤 반응하는 네비게이션 만들기
const navbar = document.querySelector('#navbar');
const navbarHeight =navbar.getBoundingClientRect().height;
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',() =>{
   home.style.opacity = 1 - window.scrollY / homeHeight;
if(window.scrollY > navbarHeight){
  navbar.classList.add('navbar--dark')
}
else{
  navbar.classList.remove('navbar--dark')
}
});
// const messages = {
//   FeaturesTitle1: 'Pipeline creation',
//   FeaturesDescription1: 'In Link, you can specify the relationship between cells as well as the execution sequence. You can create a pipeline on the same screen as the code to improve readability. ',
//   FeaturesTitle2: 'Caching management',
//   FeaturesDescription2: `Link manages the result values of the cells that have already been executed separately from those that haven't. It also prevents work duplication and work-efficiency loss through caching. `,
//   FeaturesTitle3:'Easily collaboration',
//   FeaturesDescription3:'You can save and share your outputs that are pipelines, components, caches, python codes. You can collaborate more comfortable  with Link',
// }

// function putMessages() {
//   // const PIPELINE_DESC = 'In Link, you can specify the relationship between cells as well as the execution sequence. You can create a pipeline on the same screen as the code to improve readability. ';
//   document.querySelector('#features-title1').innerHTML = messages.FeaturesTitle1;
//   document.querySelector('#features-desc1').innerHTML = messages.FeaturesDescription1;
//   document.querySelector('#features-title2').innerHTML = messages.FeaturesTitle2;
//   document.querySelector('#features-desc2').innerHTML = messages.FeaturesDescription2;
//   document.querySelector('#features-title3').innerHTML = messages.FeaturesTitle3;
//   document.querySelector('#features-desc3').innerHTML = messages.FeaturesDescription3;
// }
// putMessages();

// 핸들 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuItem = Array.from(navbarMenu.querySelectorAll('li'));
navbarMenu.addEventListener('click',(event) =>{;
  const target = event.target;
  const link = target.dataset.link;
  navbarMenuItem.forEach((item) => item.classList.remove('active'));
  target.classList.add('active');
  if(link == null){
    return;
  }
});


const toggleBtn = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".navbar__menu");
const close = document.getElementsByClassName("close");

toggleBtn.addEventListener('click',() =>{
  menu.classList.toggle('active');
  document.body.classList.toggle('hambuger_overflow')
  toggleBtn.classList.toggle('open'); 
});











const swiperTabsNav = new Swiper('.swiper-tabs-nav', {
  spaceBetween: 0,
  slidesPerView: 3,
  loop: false,
  loopedSlides: 5,
  autoHeight: false,
  resistanceRatio: 0,
  watchOverflow: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

// Swiper Content
const swiperTabsContent = new Swiper('.swiper-tabs-content', {
  spaceBetween: 0,
  loop:false,
  autoHeight: true,
  longSwipes: true,
  resistanceRatio: 0, // Disable First and Last Swiper
  watchOverflow: true,
  loopedSlides: 5,
  thumbs: {
    swiper: swiperTabsNav,
  },
});