'use strict';
//스크롤 반응하는 네비게이션 만들기
const navbar = document.querySelector('#navbar');
const navbarHeight =navbar.getBoundingClientRect().height;
document.addEventListener('scroll',() =>{
if(window.scrollY > navbarHeight){
  navbar.classList.add('navbar--dark')
}
else{
  navbar.classList.remove('navbar--dark')
}
});