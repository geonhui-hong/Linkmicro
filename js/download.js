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
const versionRadios = document.querySelectorAll('[name="python_version"]');
Array.from(operationRadios).forEach((el) => {
	el.addEventListener('change', (event) => {
		const selected = document.querySelector('input[name="operation_system"]:checked').value;
		if (selected === 'apple_silicon') {
			const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
			const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
			if (radio1) radio1.disabled = true;
			if (radio2) radio2.disabled = true;
			os_info_field.textContent = '(macOS-Apple Silicon) Only Supported Python 3.8 and 3.9';
			os_info_field.style.visibility = 'visible'
		} else {
			const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
			const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
			if (radio1) radio1.disabled = false;
			if (radio2) radio2.disabled = false;
			os_info_field.style.visibility = 'hidden'
		}
	})
})

const os_info_field = document.querySelector('#os_info_field');
const version_info_field = document.querySelector('#version_info_field');
Array.from(versionRadios).forEach((el) => {
	el.addEventListener('change', (event) => {
		const selected = document.querySelector('input[name="python_version"]:checked').value;
		console.log(selected)
		if (selected === "3.6") {
			version_info_field.textContent = '(Python-3.6) Only Supported Python 3.6.13'
			version_info_field.style.visibility = 'visible'
		} else {
			version_info_field.style.visibility = 'hidden'
		}
	})
})

/**
	 * 폼
	 */
const submit_button = document.querySelector('#submit');
if (submit_button) {
	submit_button.style.backgroundColor = '#e0e0e0';
}
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
		submit_button.style.backgroundColor = '#6C79F9';
		isEnableSubmit = true;
	} else {
		submit_button.style.backgroundColor = '#e0e0e0';
		isEnableSubmit = false;
	}
}

submit_button.addEventListener('click', async () => {
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
			const url = apiPrefix + '/api/v1/download/help/download';

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
						const blob = new Blob([target.response], {
							type: xhr.getResponseHeader('content-type'),
						});
						temp.setAttribute('href', URL.createObjectURL(blob));
						// temp.setAttribute('href', URL.createObjectURL(success.data));
						temp.setAttribute(
							'download',
							xhr.getResponseHeader('content-disposition')
								.split('filename=')[1]
								.replaceAll('"', ''),
						);
						document.body.appendChild(temp);
						temp.click();
						document.body.removeChild(temp);
					} else {
						const message = JSON.parse(target.response).detail
						if (message === 'MemberLicenseKeyMismatch') {
							product_key_error_field.textContent = 'This product key is invalid';
							product_key_error_field.style.visibility = 'visible';
						} else if (message === 'NoSuchMemberEmail') {
							product_key_error_field.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
							product_key_error_field.style.visibility = 'visible';
						} else if (message === 'CustomerLicenseExpired') {
							product_key_error_field.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
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

			let os = '';
			let arch = '';
			const operation_system = document.querySelector('input[name="operation_system"]:checked').value
			if (operation_system === "apple_silicon") {
				os = 'mac';
				arch = 'arm64'
			} else if (operation_system === 'apple_intel') {
				os = 'mac';
				arch = 'x86_64';
			} else if (operation_system === 'linux') {
				os = 'linux';
				arch = 'x86_64';
			} else {
				os = 'windows';
				arch = 'x86_64';
			}
			let version = await getLatestVersion(obj.email, obj.product_key)
			xhr.send(JSON.stringify({
				member_email: obj.email.trim(),
				member_license_key: obj.product_key.trim(),
				product_type: document.querySelector('input[name="product_type"]:checked').value,
				py_ver: document.querySelector('input[name="python_version"]:checked').value,
				arch: arch,
				os: os,
				link_ver: version
			}));
		} catch (e) {
			console.log(e)
		}
	}
})

function getLatestVersion(email, productkey) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const method = 'POST';
		const url = apiPrefix + '/api/v1/link/link_release_notice/latest';
		try {
			xhr.open(method, url);
			xhr.onreadystatechange = (event) => {
				const { target } = event;
				if (target.readyState === XMLHttpRequest.DONE) {
					const { status } = target;
					if (status === 422) {
						console.log('error : ', target)
					} else if (status === 200) {
						const result = JSON.parse(target.response);
						if (result.ok) {
							resolve(result.result.link_ver);
						}
					} else {
						const message = JSON.parse(target.response).detail
						console.log(message);
					}
				}
			}
			xhr.addEventListener('error', (event) => {
				reject(event);
			});
			xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로

			xhr.send(JSON.stringify({
				member_email: email,
				member_license_key: productkey
			}));
		} catch (e) {
			reject(e);
		}
	})

}