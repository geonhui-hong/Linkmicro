const url = window.location.href;
let apiPrefix = '';
if (url.includes('pqxzhparpcft-help-web-dev.link.makinarocks.ai') || url.includes('localhost') || url.includes('127.0.0.1')) {
	apiPrefix = 'https://dev.homepage.api.admin.link.makina.rocks/b2gfa0infqfv9bkvdkwi7zm3n';
} else {
	apiPrefix = 'https://homepage.api.admin.link.makinarocks.ai/jhigcbc8t19efxrtizc8wd20q'
}
/**
 * 에러 필드 
 */
const fname_error_field = document.querySelector('#fname_error_field');
const lname_error_field = document.querySelector('#lname_error_field');
const email_error_field = document.querySelector('#email_error_field');
const phone_number_error_field = document.querySelector('#phone_number_error_field');
const company_error_field = document.querySelector('#company_error_field');
const business_error_field = document.querySelector('#business_error_field');
const message_error_field = document.querySelector('#message_error_field');
/**
 * 폼
 */
const submit_button = document.querySelector('#submit');
if (submit_button) {
	submit_button.style.backgroundColor = '#e0e0e0';
}
const form = document.querySelector('#talk_to_business_form');
if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}


let formDebouncingID = 0;
form.addEventListener('keydown', (evt) => {
	if (formDebouncingID) clearTimeout(formDebouncingID);
	setTimeout(() => {
		const value = evt.target.value;
		if (evt.target.id === 'fname') {
			if (value.length === 0) {
				fname_error_field.textContent = 'Required';
				fname_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else if (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(value)) {
				fname_error_field.textContent = 'Invalid';
				fname_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			}
			else {
				fname_error_field.style.visibility = 'hidden';
			}
		}
		if (evt.target.id === 'lname') {
			if (value.length === 0) {
				lname_error_field.textContent = 'Required';
				lname_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else if (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(value)) {
				lname_error_field.textContent = 'Invalid';
				lname_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			}
			else {
				lname_error_field.style.visibility = 'hidden';
			}
		}
		if (evt.target.id === 'email') {
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || (value.length < 5 && value.length > 0)) {
				email_error_field.textContent = 'Invalid';
				email_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else if (value.length === 0) {
				email_error_field.textContent = 'Required';
				email_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else {
				email_error_field.style.visibility = 'hidden';
			}
		}

		if (evt.target.id === 'company') {
			if (value.length === 0) {
				company_error_field.textContent = 'Required';
				company_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else if ((/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(value) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(value))) {
				company_error_field.textContent = 'Invalid';
				company_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else {
				company_error_field.style.visibility = 'hidden';
			}
		}

		if (evt.target.id === 'message') {
			if (value.length === 0) {
				message_error_field.textContent = 'Required';
				message_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else {
				message_error_field.style.visibility = 'hidden'
			}
		}
		formDebouncingID = null;
		isEnableSubmit = true;
	}, 200)
})


if (submit_button) {
	submit_button.addEventListener('click', async () => {
		let isEnable = true;
		if (!form || !isEnableSubmit || grecaptcha.getResponse().length === 0) return;
		try {
			fname_error_field.style.visibility = 'hidden';
			lname_error_field.style.visibility = 'hidden';
			email_error_field.style.visibility = 'hidden';
			phone_number_error_field.style.visibility = 'hidden';
			company_error_field.style.visibility = 'hidden';
			business_error_field.style.visibility = 'hidden';
			message_error_field.style.visibility = 'hidden';

			const formData = new FormData(form);
			if (formData.has('fname') && formData.get('fname').length === 0) {
				fname_error_field.textContent = 'Required';
				fname_error_field.style.visibility = 'visible';
				isEnable = false;
			}
			if (formData.has('fname') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('fname')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('fname')))) {
				fname_error_field.textContent = 'Invalid';
				fname_error_field.style.visibility = 'visible';
				isEnable = false;
			}

			if (formData.has('lname') && formData.get('lname').length === 0) {
				lname_error_field.textContent = 'required';
				lname_error_field.style.visibility = 'visible'
				isEnable = false;
			}

			if (formData.has('lname') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('lname')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('lname')))) {
				lname_error_field.textContent = 'Invalid';
				lname_error_field.style.visibility = 'visible';
				isEnable = false;
			}

			if (formData.has('email') && formData.get('email').length === 0) {
				email_error_field.textContent = 'Required';
				email_error_field.style.visibility = 'visible';
				isEnable = false;
			}

			if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email')) || formData.get('email').length < 5) {
				email_error_field.textContent = 'Invalid';
				email_error_field.style.visibility = 'visible';
				isEnable = false;
			}

			if (formData.has('company') && formData.get('company').length === 0) {
				company_error_field.textContent = 'Required';
				company_error_field.style.visibility = 'visible';
				isEnable = false;
			}
			if (formData.has('company') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('company')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('company')))) {
				company_error_field.textContent = 'Invalid';
				company_error_field.style.visibility = 'visible';
				isEnable = false;
			}
			if (formData.has('message') && formData.get('message').length === 0) {
				message_error_field.textContent = 'Required';
				message_error_field.style.visibility = 'visible'
				isEnable = false;
			}
		} catch (e) {
			console.log(e.message)
			isEnable = false;
			grecaptcha.reset();

		} finally {
			if (!isEnable) return;
			try {
				const obj = Object.fromEntries(new FormData(form));
				const result = await axios.post(apiPrefix + '/api/v1/homepage/support/sales', {
					first_name: obj.fname.trim(),
					last_name: obj.lname.trim(),
					email: obj.email.trim(),
					phone_number: obj.phone_number.trim(),
					company: obj.company.trim(),
					business: obj.business.trim(),
					message: obj.message.trim(),
					grecaptcha: grecaptcha.getResponse(),
					private_policy: obj.agreement_private_policy === 'on' ? true : false,
				});
				console.log(result);
				if (result && result.data && result.data.ok) {
					window.location.href = './send_email_success.html'
				} else {
					grecaptcha.reset();
					submit_button.style.backgroundColor = '#e0e0e0';
					isEnableSubmit = false;
				}
			} catch (e) {
				grecaptcha.reset();
				submit_button.style.backgroundColor = '#e0e0e0';
				isEnableSubmit = false;
				if (e.response) {
					console.error(e)
				} else {
					// const message = JSON.parse(target.response).detail
					if (e === 'ErrorWhileSent') {
						console.log(e);
					}
				}
			}
		}
	})
}


/**
 * 프라이버시 동의 
 */
const privacy_policy_checkbox = document.querySelector('#agreement_private_policy');
if (privacy_policy_checkbox) {
	privacy_policy_checkbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			if (captchaChecked) {
				submit_button.style.backgroundColor = '#6C79F9';
				isEnableSubmit = true;
			}
		} else {
			submit_button.style.backgroundColor = '#e0e0e0';
			isEnableSubmit = false;
		}
	})
}
let captchaChecked = false;
const captchaCallback = () => {
	captchaChecked = true;
	if (privacy_policy_checkbox.checked) {
		submit_button.style.backgroundColor = '#6C79F9';
		isEnableSubmit = true;
	} else {
		submit_button.style.backgroundColor = '#e0e0e0';
		isEnableSubmit = false;
	}
}