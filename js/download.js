if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	window.location.href = `./mobile.html`;
}

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
// const email_error_filed = document.querySelector('#email_error_field');
// const product_key_error_field = document.querySelector('#product_key_error_field');

const download_option_form = document.querySelector('#download_option_form');
const os_list = document.querySelector('.os_list');
if (download_option_form) {
	download_option_form.addEventListener('submit', (e) => {
		e.preventDefault();
	})
}
const createListItem = (text) => {
	const li = document.createElement('li');
	li.className = "dynamic-list-item"
	const label = document.createElement('label');
	const image = document.createElement('img');
	image.src = "images/os3.svg";
	label.append(image);
	li.append(label);
	const div = document.createElement('div');
	div.className = 'download_list_radio_li'
	const input = document.createElement('input');
	input.type = "radio";
	input.name = "operation_system";
	input.id = text;
	input.value = text;
	const inputLabel = document.createElement('label')
	inputLabel.textContent = text;
	div.append(input);
	div.append(inputLabel);
	li.append(div);
	return li;
}
const productRadio = document.querySelectorAll('input[name="product_type"]');
const operationRadios = document.querySelectorAll('[name="operation_system"]')
const versionRadios = document.querySelectorAll('[name="python_version"]');
Array.from(productRadio).forEach((el) => {
	el.addEventListener('change', () => {
		const selected = document.querySelector('input[name="product_type"]:checked').value;
		const radio1 = document.querySelector('input[name="python_version"][value="3.6"]');
		document.querySelectorAll('.dynamic-list-item').forEach((d) => d.remove())

		if (selected === 'desktop') {
			const selected2 = document.querySelector('input[name="python_version"]:checked').value;
			if (radio1) radio1.disabled = true;
			if (selected2 === '3.6') {
				document.querySelector('input[name="python_version"][value="3.8"]').checked = true;
				version_info_field.style.visibility = 'hidden'
			}
			// linux - pedora, ubuntu
			os_list.append(createListItem('pedora'))
			os_list.append(createListItem('ubuntu'))
		} else {
			if (radio1) radio1.disabled = false;
			// linux
			os_list.append(createListItem('linux'))
		}
	})
})
Array.from(operationRadios).forEach((el) => {
	el.addEventListener('change', (event) => {
		const selected = document.querySelector('input[name="operation_system"]:checked').value;
		const selectedPtype = document.querySelector('input[name="python_version"]:checked').value;

		if (selected === 'apple_silicon') {
			const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
			const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
			if (radio1) radio1.disabled = true;
			if (radio2) radio2.disabled = true;
			document.querySelector('input[name="python_version"][value="3.8"]').checked = true;
			version_info_field.style.visibility = 'hidden'
			os_info_field.textContent = '(macOS-Apple Silicon) Only Python 3.8 and 3.9 are supported.';
			os_info_field.style.visibility = 'visible'
		} else {
			if (!selectedPtype === 'desktop') {
				const radio1 = document.querySelector('input[name="python_version"][value="3.6"]')
				const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
				if (radio1) radio1.disabled = false;
				if (radio2) radio2.disabled = false;
			} else {
				const radio2 = document.querySelector('input[name="python_version"][value="3.7"]')
				if (radio2) radio2.disabled = false;
			}
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
			version_info_field.innerHTML = '(Python-3.6) Only Python 3.6.13 supported.'
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
// if (submit_button) {
// 	submit_button.style.backgroundColor = '#e0e0e0';
// }
// const form = document.querySelector('#download_form');
// if (form) {
// 	form.addEventListener('submit', (e) => {
// 		e.preventDefault();
// 	})
// }

/**
 * 엘리먼트
 */
// const emailInputTag = document.querySelector('#email');
// let emailInputDebouncingID = 0;
// const productKeyInputTag = document.querySelector('#product_key');
// let productKeyInputDebouncingID = 0;
// emailInputTag.addEventListener('keydown', (event) => {
// 	if (emailInputDebouncingID) clearTimeout(emailInputDebouncingID);
// 	emailInputDebouncingID = setTimeout(() => {
// 		checkIsEnableSubmit();
// 		emailInputDebouncingID = null;
// 	}, 300);
// })

// productKeyInputTag.addEventListener('keydown', (event) => {
// 	if (productKeyInputDebouncingID) clearTimeout(productKeyInputDebouncingID);
// 	productKeyInputDebouncingID = setTimeout(() => {
// 		checkIsEnableSubmit();
// 		productKeyInputDebouncingID = null;
// 	}, 300);
// })

// const checkIsEnableSubmit = () => {
// 	if (emailInputTag.value.length > 0 && productKeyInputTag.value.length > 0) {
// 		submit_button.style.backgroundColor = '#6C79F9';
// 		isEnableSubmit = true;
// 	} else {
// 		submit_button.style.backgroundColor = '#e0e0e0';
// 		isEnableSubmit = false;
// 	}
// }
/**
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
			if (window.MRXAnalytics) MRXAnalytics.sendEvent("linkDownload");

			email_error_filed.style.visibility = 'hidden';
			product_key_error_field.style.visibility = 'hidden';

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

			const headers = {
				'Content-Type': 'application/json',
				withCredentials: true,
			};			

			const response = await axios.post(apiPrefix + '/api/v1/download/help/download', JSON.stringify({
				member_email: obj.email.trim(),
				member_license_key: obj.product_key.trim(),
				product_type: document.querySelector('input[name="product_type"]:checked').value,
				py_ver: document.querySelector('input[name="python_version"]:checked').value,
				arch: arch,
				os: os,
				link_ver: version
			}), {
				headers,
				responseEncoding: 'binary',
				responseType: 'arraybuffer',
			});

			const temp = document.createElement('a');
			const blob = new Blob([response.data], {
				type: response.headers['content-type'],
			});
			temp.setAttribute('href', URL.createObjectURL(blob));

			temp.setAttribute(
				'download',
				response.headers['content-disposition']
					.split('filename=')[1]
					.replaceAll('"', ''),
			);
			document.body.appendChild(temp);
			temp.click();
			document.body.removeChild(temp);

			const modalBackground = document.querySelector('.jquery-modal')
			modalBackground.dispatchEvent(new Event('click'))
			window.location.href = './thanks.html'
		} catch (e) {
			if (e.response) {
				console.error(e)
			} else {
				// const message = JSON.parse(target.response).detail
				if (e === 'MemberLicenseKeyMismatch') {
					product_key_error_field.textContent = 'This product key is invalid';
					product_key_error_field.style.visibility = 'visible';
				} else if (e === 'NoSuchMemberEmail') {
					email_error_filed.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
					email_error_filed.style.visibility = 'visible';
				} else if (e === 'CustomerLicenseExpired') {
					product_key_error_field.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
					product_key_error_field.style.visibility = 'visible';
				}
			}

		}
	}
})
 */
submit_button.addEventListener('click', async () => {
	try {
		if (window.MRXAnalytics) MRXAnalytics.sendEvent("linkDownload");

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

		let version = await getLatestVersion()

		axios({
			url: apiPrefix + '/api/v1/download/help/download2', //your url
			method: 'GET',
			responseType: 'blob', // important
			params: {
				product_type: document.querySelector('input[name="product_type"]:checked').value,
				py_ver: document.querySelector('input[name="python_version"]:checked').value,
				arch: arch,
				os: os,
				link_ver: version
			}
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			// temp.setAttribute(
			// 	'download',
			// 	response.headers['content-disposition']
			// 		.split('filename=')[1]
			// 		.replaceAll('"', ''),
			// );
			link.setAttribute('download', 'test.whl'); //or any other extension
			document.body.appendChild(link);
			link.click();
		});

		// const headers = {
		// 	'Content-Type': 'application/json',
		// 	withCredentials: true,
		// };

		// const response = await axios.post(apiPrefix + '/api/v1/download/help/download', JSON.stringify({
		// 	product_type: document.querySelector('input[name="product_type"]:checked').value,
		// 	py_ver: document.querySelector('input[name="python_version"]:checked').value,
		// 	arch: arch,
		// 	os: os,
		// 	link_ver: version
		// }), {
		// 	headers,
		// 	responseEncoding: 'binary',
		// 	responseType: 'arraybuffer',
		// });

		// const temp = document.createElement('a');
		// const blob = new Blob([response.data], {
		// 	type: response.headers['content-type'],
		// });
		// temp.setAttribute('href', URL.createObjectURL(blob));

		// temp.setAttribute(
		// 	'download',
		// 	response.headers['content-disposition']
		// 		.split('filename=')[1]
		// 		.replaceAll('"', ''),
		// );
		// document.body.appendChild(temp);
		// temp.click();
		// document.body.removeChild(temp);
		// window.location.href = './thanks.html'
	} catch (e) {
		if (e.response) {
			console.error(e)
		} else {
			// const message = JSON.parse(target.response).detail
			if (e === 'MemberLicenseKeyMismatch') {
				product_key_error_field.textContent = 'This product key is invalid';
				product_key_error_field.style.visibility = 'visible';
			} else if (e === 'NoSuchMemberEmail') {
				email_error_filed.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
				email_error_filed.style.visibility = 'visible';
			} else if (e === 'CustomerLicenseExpired') {
				product_key_error_field.textContent = 'This email doesn’t exist. Please click “Get Started for Free”';
				product_key_error_field.style.visibility = 'visible';
			}
		}

	}
})

function getLatestVersion() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const method = 'POST';
		const url = apiPrefix + '/api/v1/help/link_release_notice/latest';
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
						} else {
							reject(result.err.code);
						}
					} else {
						const message = JSON.parse(target.response).detail
						reject(message);
					}
				}
			}
			xhr.addEventListener('error', (event) => {
				reject(event);
			});
			xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로

			xhr.send(JSON.stringify({}));
		} catch (e) {
			reject(e);
		}
	})

}

function dialogScript() {
	const emailInput = document.querySelector('#email');
	if (emailInput) emailInput.value = ''
	const productKeyInput = document.querySelector('#product_key');
	if (productKeyInput) productKeyInput.value = ''

	if (email_error_filed)
		email_error_filed.style.visibility = 'hidden';
	if (product_key_error_field)
		product_key_error_field.style.visibility = 'hidden';
}