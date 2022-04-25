const form = document.querySelector('#forgot-form');
const email_error_field = document.querySelector('#email_error_field');

if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}
const submit_button = document.querySelector('#submit');
if (submit_button) submit_button.style.opacity = 1;

submit_button.addEventListener('click', () => {
	const formData = new FormData(form);
	if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email')) || formData.get('email').length < 5) {
		email_error_field.textContent = 'invalid';
		email_error_field.style.visibility = 'visible';
	}
})


