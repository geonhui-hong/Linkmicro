/** 
 * 
 */
const navbar = document.querySelector('#navbar');
const home = document.querySelector('#home');
const start = document.querySelector('.start_for_free');
/**
 * 스크롤 할 때 nav가 투명해지거나 불투명해지거나 조절함
 */
if (home && navbar) {
	const homeHeight = home.getBoundingClientRect().height;
	const navbarHeight = navbar.getBoundingClientRect().height;
	document.addEventListener('scroll', () => {
		home.style.opacity = 1 - window.scrollY / homeHeight;
		if (window.scrollY > navbarHeight) {
			navbar.classList.add('navbar--dark')
		}
		else {
			navbar.classList.remove('navbar--dark')
		}
	});
}

/**
 * nav click handler
 */
const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuItem = Array.from(navbarMenu.querySelectorAll('li'));
navbarMenu.addEventListener('click', (event) => {
	const target = event.target;

	// navbarMenuItem.forEach((item) => item.classList.remove('active'));
	// target.classList.add('active');

	if (target.dataset.target) {
		if (target.dataset.target === 'feature') {
			const scrollTo = document.querySelector('#feature');
			if (scrollTo) {
				scrollTo.scrollIntoView({
					behavior: 'smooth'
				});
				menu.classList.toggle('active');
				// document.body.classList.toggle('hambuger_overflow')
				toggleBtn.classList.toggle('open');
			} else {
				window.location.href = './index.html'
			}
		} else if (target.dataset.target === 'download') {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				window.location.href = `./mobile.html`;
			} else {
				window.location.href = `./${target.dataset.target}.html`;
			}
		}
		else if (target.dataset.target === 'documentation') {
			window.open('https://makinarocks.gitbook.io/link/', '_blank');

			if (window.MRXAnalytics) MRXAnalytics.sendEvent("linkDoc");
		} else if (target.dataset.target === 'pricing') {
			window.location.href = `./pricing.html`;
		} else if (target.dataset.target === 'support') {
			window.location.href = `./support.html`;
		}
	}
});
navbarMenu.querySelector('.get_button').addEventListener('click', () => {
	window.location.href = './start.html'
})

/**
 * narrow width에서 nav 아이콘 토글
 */
const toggleBtn = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".navbar__menu");
const close = document.getElementsByClassName("close");

toggleBtn.addEventListener('click', () => {
	menu.classList.toggle('active');
	// document.body.classList.toggle('hambuger_overflow')
	toggleBtn.classList.toggle('open');
});