/**
* 에러 필드
*/
const email_error_filed = document.querySelector('#email_error_field');
const product_key_error_field = document.querySelector('#product_key_error_field');

const download_option_form = document.querySelector('#download_option_form');
if (download_option_form) {
	download_option_form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}

const productRadio = document.querySelector('[name="product_type"]');
const operationRadios = document.querySelectorAll('[name="operation_system"]')

Array.from(operationRadios).forEach((el) => {
	el.addEventListener('change', (event) => {
		const selected = document.querySelector('input[name="operation_system"]:checked').value;
		if (selected === 'apple_silicon') {
			const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
			const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
			if (radio1) radio1.disabled = true;
			if (radio2) radio2.disabled = true;
		} else {
			const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
			const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
			if (radio1) radio1.disabled = false;
			if (radio2) radio2.disabled = false;
		}
	})
})


/**
	 * 폼
	 */
const submit_button = document.querySelector('#submit');
const form = document.querySelector('#download_form');
if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}

/**
 * 엘리먼트
 */
const emailInputTag = document.querySelector('#email');
let emailInputDebouncingID = 0;
const productKeyInputTag = document.querySelector('#product_key');
let productKeyInputDebouncingID = 0;
emailInputTag.addEventListener('keydown', (event) => {
	if (emailInputDebouncingID) clearTimeout(emailInputDebouncingID);
	emailInputDebouncingID = setTimeout(() => {
		checkIsEnableSubmit();
		emailInputDebouncingID = null;
	}, 300);
})

productKeyInputTag.addEventListener('keydown', (event) => {
	if (productKeyInputDebouncingID) clearTimeout(productKeyInputDebouncingID);
	productKeyInputDebouncingID = setTimeout(() => {
		checkIsEnableSubmit();
		productKeyInputDebouncingID = null;
	}, 300);
})

const checkIsEnableSubmit = () => {
	if (emailInputTag.value.length > 0 && productKeyInputTag.value.length > 0) {
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
			const url = 'https://dev.homepage.api.admin.link.makina.rocks/b2gfa0infqfv9bkvdkwi7zm3n/api/v1/download/help/download';

			xhr.open(method, url);
			xhr.onreadystatechange = (event) => {
				const { target } = event;
				if (target.readyState === XMLHttpRequest.DONE) {
					const { status } = target;
					if (status === 422) {
						console.log('error : ', target)
					} else if (status === 200) {
						console.log(event);
						const temp = document.createElement('a');
						const blob = new Blob([success.data], {
							type: success.headers['content-type'],
						});
						temp.setAttribute('href', URL.createObjectURL(blob));
						// temp.setAttribute('href', URL.createObjectURL(success.data));
						temp.setAttribute(
							'download',
							success.headers['content-disposition']
								.split('filename=')[1]
								.replaceAll('"', ''),
						);
						document.body.appendChild(temp);
						temp.click();
						document.body.removeChild(temp);
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
				member_email: obj.email,
				member_license_key: obj.product_key,
				prodct_type: document.querySelector('input[name="product_type"]:checked').value,
				py_ver: document.querySelector('input[name="python_version"]:checked').value,
				os: document.querySelector('input[name="operation_system"]:checked').value,
			}));
		} catch (e) {
			console.log(e)
		}
	}
})
