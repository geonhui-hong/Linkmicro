/**
 * 전역 변수
 */
let isEnableSubmit = false;

const url = new URL(window.location.href);
const os = url.searchParams.get('os');
const py_ver = url.searchParams.get('pythonVersion');
const link_ver = url.searchParams.get('linkVersion');
const arch = url.searchParams.get('arch');
console.log("======= QUERY PARAMS ==============")
console.log(os)
console.log(py_ver)
console.log(link_ver)
console.log(arch);
console.log("===================================")

let os_value = null;
if (os === 'windows') {
	os_value = 'window';
} else if (os === 'linux') {
	os_value = os;
} else if (os === 'mac' && arch === 'x86_64') {
	os_value = 'apple_intel';
} else if (os === 'mac' && arch === 'arm64') {
	os_value = 'apple_silicon';
}

const py_ver_opt = document.querySelector(`[value="${py_ver}"]`);
if (py_ver_opt) {
	py_ver_opt.selected = true;
}
const link_ver_opt = document.querySelector(`[value="${link_ver}"]`)
if (link_ver_opt) {
	link_ver_opt.selected = true;
}
const os_opt = document.querySelector(`[value="${os_value}"]`);
if (os_opt) {
	os_opt.selected = true;
}

/**
 * 에러 필드 
 */
const fname_error_field = document.querySelector('#fname_error_field');
const lname_error_field = document.querySelector('#lname_error_field');
const email_error_field = document.querySelector('#email_error_field');
const description_error_field = document.querySelector('#description_error_field');

/**
 * 폼
 */
const submit_button = document.querySelector('#submit');
if (submit_button) {
	submit_button.style.backgroundColor = '#e0e0e0';
}
const form = document.querySelector('#technical_support_form');
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
			description_error_field.style.visibility = 'hidden';

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

			if (formData.has('description') && formData.get('description').length === 0) {
				description_error_field.textContent = 'Required';
				description_error_field.style.visibility = 'visible'
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
			} catch (e) {
				console.log(e)
			}
		}
	})
}

let uploaded = [];
const drop_zone = document.querySelector('#drop_zone');
const file_list = document.querySelector('#file_list');
function fileListItemTemplate(fileName, index) {
	return `
		<div style="display: flex; gap: 10px;">
			<div>
				${fileName}
			</div>
			<div class='delete_button' data-index=${index}>X</div> 			
		</div>
		`
}
function dropHandler(ev) {
	console.log('File(s) dropped');

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			// If dropped items aren't files, reject them
			if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				console.log(file);
				uploaded.push(file);
				console.log('... file[' + i + '].name = ' + file.name);
			}
		}
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
			console.log(file);
			uploaded.push(ev.dataTransfer.files[i]);
		}
	}
	file_list.innerHTML = uploaded.reduce((acc, curr, i) => {
		return acc + fileListItemTemplate(curr.name, i);
	}, '')
}

function dragOverHandler(ev) {
	console.log('File(s) in drop zone');

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}

function clickHandler(ev) {
	if (Array.from(ev.target.classList).includes('delete_button')) {
		const index = parseInt(ev.target.dataset.index);
		uploaded = uploaded.filter((d, i) => index !== i)

		file_list.innerHTML = uploaded.reduce((acc, curr, i) => {
			return acc + fileListItemTemplate(curr.name, i);
		}, '')
	}
}

function dragAreaClickHandler(ev) {
	const input = document.createElement('input');
	input.type = 'file';
	input.style.visibility = 'hidden';
	document.body.append(input);
	input.click();
	input.addEventListener('change', (e) => {
		const file = e.target.files[0];
		uploaded.push(file);
		file_list.innerHTML = uploaded.reduce((acc, curr, i) => {
			return acc + fileListItemTemplate(curr.name, i);
		}, '')
		input.remove();
	})
}