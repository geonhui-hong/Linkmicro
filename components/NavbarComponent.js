class NavBar extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.render();
		this.attachShadow({ mode: 'open' });
	}
	render() {
		this.shadowRoot.innerHTML =
			`
			<style>*{all:initial}</style>
			<nav id="navbar">
				<div class="navbar_container">
					<div class="wrap">
						<div class="navbar__logo">
								<a href="index.html"><img src="images/logo.svg" alt=""></a>
						</div>
						<ul class="navbar__menu">
								<li class="navbar__menu__item active">
										<a href="index.html">Features</a>
								</li>
								<li class="navbar__menu__item">
										<a href="download.html">Download</a>
								</li>								
								<li class="navbar__menu__item" ><a href="https://makinarocks.gitbook.io/link/" target="blank">Documentation</a></li>								
								<button onclick="window.location.href='start.html'" class="get_button">Get started for Free</button>						  
						</ul>
					</div>
					<a href="javascript:click()" class="navbar__toggle">
							<span>메뉴</span>
					</a>
				</div>
			</nav>		
		`
	}
}