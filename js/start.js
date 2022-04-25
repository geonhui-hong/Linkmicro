
/**
 * 전역 변수
 */
let isEnableSubmit = false;
/**
 * 폼
 */
const submit_button = document.querySelector('#submit');
const form = document.querySelector('#start_form');
if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}
/**
 * 에러 필드 
 */
const fname_error_field = document.querySelector('#fname_error_field');
const lname_error_field = document.querySelector('#lname_error_field');
const email_error_filed = document.querySelector('#email_error_field');
const organization_error_field = document.querySelector('#organization_error_field');

if (submit_button) {
	submit_button.addEventListener('click', () => {
		let isEnable = true;
		if (!form || !isEnableSubmit) return;
		try {
			const formData = new FormData(form);
			if (formData.has('fname') && formData.get('fname').length === 0) {
				fname_error_field.textContent = 'required';
				fname_error_field.style.visibility = 'visible';
				throw new Error('first name has required');
			}
			if (formData.has('fname') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('fname')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('fname')))) {
				fname_error_field.textContent = 'invalid';
				fname_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in first name');
			}

			if (formData.has('lname') && formData.get('lname').length === 0) {
				lname_error_field.textContent = 'required';
				lname_error_field.style.visibility = 'visible'
				throw new Error('last name has required');
			}

			if (formData.has('lname') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('lname')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('lname')))) {
				lname_error_field.textContent = 'invalid';
				lname_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in last name');
			}

			if (formData.has('email') && formData.get('email').length === 0) {
				email_error_filed.textContent = 'required';
				email_error_filed.style.visibility = 'visible';
				throw new Error('last name has required');
			}

			if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email')) || formData.get('email').length < 5) {
				email_error_filed.textContent = 'invalid';
				email_error_filed.style.visibility = 'visible';
				throw new Error('not allowed value in email');
			}

			if (formData.has('organization') && formData.get('organization').length === 0) {
				organization_error_field.textContent = 'required';
				organization_error_field.style.visibility = 'visible'
				throw new Error('organization has required');
			}

			if (formData.has('organization') && /([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('organization'))) {
				organization_error_field.textContent = 'invalid';
				organization_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in organization');
			}
		} catch (e) {
			console.log(e.message)
			isEnable = false;
		} finally {
			if (!isEnable) return;
			try {
				const xhr = new XMLHttpRequest();
				const method = 'POST';
				const url = 'https://homepage.api.admin.link.makinarocks.ai/jhigcbc8t19efxrtizc8wd20q/api/v1/homepage/customer/register';

				xhr.open(method, url);
				xhr.onreadystatechange = (event) => {
					const { target } = event;
					if (target.readyState === XMLHttpRequest.DONE) {
						const { status } = target;
						console.log(status);
						// start2.html
					}
				}
				xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로

				console.log(Object.fromEntries(new FormData(form)))
				// xhr.send(Object.fromEntries(new FormData(form)));
			} catch (e) {
				console.log(e)
			}
		}
	})
}

const privacy_policy_checkbox = document.querySelector('#agreement_private_policy');
if (privacy_policy_checkbox) {
	privacy_policy_checkbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			submit_button.style.opacity = 1;
			isEnableSubmit = true;
		} else {
			submit_button.style.opacity = 0.4;
			isEnableSubmit = false;
		}

	})
}