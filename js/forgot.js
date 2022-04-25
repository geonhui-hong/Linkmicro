/**
 * 전역 변수
 */
let isEnableSubmit = false;

const form = document.querySelector('#forgot-form');
const email_error_field = document.querySelector('#email_error_field');

if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}
const submit_button = document.querySelector('#submit');

submit_button.addEventListener('click', () => {
	if (!isEnableSubmit) return;
	const formData = new FormData(form);
	if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email')) || formData.get('email').length < 5) {
		email_error_field.textContent = 'invalid';
		email_error_field.style.visibility = 'visible';
	}
})


let emailDebouncingID = 0;
const emailInputTag = document.querySelector('#email');
emailInputTag.addEventListener('keydown', (event) => {
	if (emailDebouncingID) clearTimeout(emailDebouncingID);
	emailDebouncingID = setTimeout(() => {
		emailDebouncingID = null;
		checkIsEnableSubmit();
	}, 300)
})

const checkIsEnableSubmit = () => {
	if (emailInputTag.value.length > 0) {
		submit_button.style.opacity = 1;
		isEnableSubmit = true;
	} else {
		submit_button.style.opacity = 0.4;
		isEnableSubmit = false;
	}
}