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

/**
 * 프라이버시 동의 
 */
 const privacy_policy_checkbox = document.querySelector('#agreement_private_policy');
 if (privacy_policy_checkbox) {
   privacy_policy_checkbox.addEventListener('change', (e) => {
     if (e.target.checked) {
       submit_button.style.backgroundColor = '#6C79F9';
       isEnableSubmit = true;
     } else {
       submit_button.style.backgroundColor = '#e0e0e0';
       isEnableSubmit = false;
     }
 
   })
 }

 if (submit_button) {
	submit_button.addEventListener('click', () => {
		let isEnable = true;
		// || grecaptcha.getResponse().length === 0
		if (!form || !isEnableSubmit) return;
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
				throw new Error('first name has required');
			}
			if (formData.has('fname') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('fname')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('fname')))) {
				fname_error_field.textContent = 'Invalid';
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
				lname_error_field.textContent = 'Invalid';
				lname_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in last name');
			}

			if (formData.has('email') && formData.get('email').length === 0) {
				email_error_field.textContent = 'Required';
				email_error_field.style.visibility = 'visible';
				throw new Error('last name has required');
			}

			if (formData.has('email') && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.get('email')) || formData.get('email').length < 5) {
				email_error_field.textContent = 'Invalid';
				email_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in email');
			}

			if (formData.has('phone_number') && formData.get('phone_number').length === 0) {
				phone_number_error_field.textContent = 'Required';
				phone_number_error_field.style.visibility = 'visible'
				throw new Error('description has required');
			}

      if (formData.has('phone_number') && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.get('phone_number'))) {
				phone_number_error_field.textContent = 'Invalid';
				phone_number_error_field.style.visibility = 'visible'
				throw new Error('description has required');
			}

      if (formData.has('company') && formData.get('company').length === 0) {
				company_error_field.textContent = 'Required';
				company_error_field.style.visibility = 'visible';
				throw new Error('first name has required');
			}
			if (formData.has('company') && (/([^가-힣A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s\x20])/i
				.test(formData.get('company')) || /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(formData.get('company')))) {
          company_error_field.textContent = 'Invalid';
          company_error_field.style.visibility = 'visible';
				throw new Error('not allowed value in first name');
			}
      if (formData.has('message') && formData.get('message').length === 0) {
				message_error_field.textContent = 'Required';
				message_error_field.style.visibility = 'visible'
				throw new Error('description has required');
			}
		} catch (e) {
			console.log(e.message)
			isEnable = false;
		} finally {
			if (!isEnable) return;
			try {
				// const xhr = new XMLHttpRequest();
				// const method = 'POST';
				// const url = apiPrefix + '/api/v1/homepage/customer/register';

				// xhr.open(method, url);
				// xhr.onreadystatechange = (event) => {
				// 	const { target } = event;
				// 	if (target.readyState === XMLHttpRequest.DONE) {
				// 		const { status } = target;
				// 		if (status === 422) {
				// 		} else if (status === 200) {
				// 			const response = JSON.parse(target.response);
				// 			if (response.ok === true) {
				// 				window.location.href = './start2.html'
				// 			} else {
				// 				if (response.err.code === 'CustomerDuplicated' || response.err.code === 'MemberDuplicated') {
				// 					email_error_field.textContent = 'this email already exists'
				// 					email_error_field.style.visibility = 'visible';
				// 				}
				// 			}
				// 		}
				// 	}
				// }
				// xhr.addEventListener('error', (event) => {
				// 	console.log(event);
				// });
				// xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로

				// const obj = Object.fromEntries(new FormData(form));
				// xhr.send(JSON.stringify({
				// 	customer_license_class: "Community",
				// 	company: obj.organization.trim(),
				// 	email: obj.email.trim(),
				// 	first_name: obj.fname.trim(),
				// 	last_name: obj.lname.trim(),
				// 	job_title: obj.job.trim(),
				// 	company: obj.organization.trim(),
				// 	agreement_private_policy: obj.agreement_private_policy === 'on' ? true : false,
				// 	agreement_marketing_policy: obj.agreement_marketing_policy === 'on' ? true : false,
				// 	grecaptcha: grecaptcha.getResponse()
				// }));
        const obj = Object.fromEntries(new FormData(form));
        console.log({
          first_name: obj.fname.trim(),
          last_name: obj.lname.trim(),
          email: obj.email.trim(),
          phone_number: obj.phone_number.trim(),
          company: obj.company.trim(),
          business: obj.business.trim(),
          message: obj.message.trim()
        })
			} catch (e) {
				console.log(e)
			}
		}
	})
}