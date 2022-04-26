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

submit_button.addEventListener('click', () => {
	if (!isEnableSubmit || !form) return;
	let isEnable = true;
	try {
		const formData = new FormData(form)
		if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email'))) {
			email_error_filed.textContent = 'This Email is invalid';
			email_error_filed.style.visibility = 'visible';
			isEnable = false;
			throw new Error('not allowed value in email')
		}
	} catch (e) {
		console.log(e.message)
	} finally {
		if (!isEnable) return;
		try {
			const xhr = new XMLHttpRequest();
			const method = 'POST';
			const url = 'https://dev.homepage.api.admin.link.makina.rocks/b2gfa0infqfv9bkvdkwi7zm3n/api/v1/homepage/member_license/forgot';

			xhr.open(method, url);
			xhr.onreadystatechange = (event) => {
				const { target } = event;
				if (target.readyState === XMLHttpRequest.DONE) {
					const { status } = target;
					if (status === 422) {
						console.log('error : ', target)
					} else if (status === 200) {
						const response = JSON.parse(target.response);
						if (response.ok === true) {
							console.log("success")
						} else {
							if (response.err.code === 'NoSuchEmail') {
								email_error_field.textContent = 'not exist email'
								email_error_field.style.visibility = 'visible';
							}
						}
					} else {
						const message = JSON.parse(target.response).detail
						if (message === 'MemberLicenseKeyMismatch') {
							product_key_error_field.textContent = 'Product key is invalid';
							product_key_error_field.style.visibility = 'visible';
						}
					}
				}
			}
			xhr.addEventListener('error', (event) => {
				console.log(event);
			});
			xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로

			const obj = Object.fromEntries(new FormData(form));
			console.log(obj);
			xhr.send(JSON.stringify({
				member_email: obj.email
			}));
		} catch (e) {
			console.log(e)
		}
	}
})
