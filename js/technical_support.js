const href = window.location.href;
let apiPrefix = '';
if (href.includes('pqxzhparpcft-help-web-dev.link.makinarocks.ai') || href.includes('localhost') || href.includes('127.0.0.1')) {
	apiPrefix = 'https://dev.homepage.api.admin.link.makina.rocks/b2gfa0infqfv9bkvdkwi7zm3n';
} else {
	apiPrefix = 'https://homepage.api.admin.link.makinarocks.ai/jhigcbc8t19efxrtizc8wd20q'
}
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
	os_value = 'windows';
} else if (os === 'linux') {
	os_value = os;
} else if (os === 'mac' && arch === 'x86_64') {
	os_value = 'apple_intel';
} else if (os === 'mac' && arch === 'arm64') {
	os_value = 'apple_silicon';
}

if (os === 'mac') {
	const py_ver_opt1 = document.querySelector(`option[value="3.6"]`);
	const py_ver_opt2 = document.querySelector(`option[value="3.7"]`);
	if (py_ver_opt1) py_ver_opt1.disabled = true;
	if (py_ver_opt2) py_ver_opt2.disabled = true;
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

const os_select = document.querySelector('#os');
const python_version_select = document.querySelector('#python_version');
os_select.addEventListener('change', (evt) => {
	console.log(evt);
	const idx = evt.target.selectedIndex;
	const txt = evt.target[idx].value;
	const py_ver_opt1 = document.querySelector(`option[value="3.6"]`);
	const py_ver_opt2 = document.querySelector(`option[value="3.7"]`);
	if (txt.includes('apple')) {
		if (py_ver_opt1) py_ver_opt1.disabled = true;
		if (py_ver_opt2) py_ver_opt2.disabled = true;
		const selected = python_version_select[python_version_select.selectedIndex].value
		if (selected === '3.6' || selected === '3.7') {
			python_version_select.selectedIndex = 3;
		}
	} else {
		if (py_ver_opt1) py_ver_opt1.disabled = false;
		if (py_ver_opt2) py_ver_opt2.disabled = false;
	}
})
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


let formDebouncingID = 0;
form.addEventListener('keydown', (evt) => {
	console.log(evt);
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
		if (evt.target.id === 'description') {
			if (value.length === 0) {
				description_error_field.textContent = 'Required';
				description_error_field.style.visibility = 'visible';
				isEnableSubmit = false;
				return;
			} else {
				description_error_field.style.visibility = 'hidden';
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
			description_error_field.style.visibility = 'hidden';

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

			if (formData.has('description') && formData.get('description').length === 0) {
				description_error_field.textContent = 'Required';
				description_error_field.style.visibility = 'visible'
				isEnable = false;
			}
		} catch (e) {
			console.log(e.message)
			isEnable = false;
		} finally {
			if (!isEnable) return;
			try {
				const obj = Object.fromEntries(new FormData(form));
				const formD = new FormData();
				formD.set('first_name', obj.fname.trim());
				formD.set('last_name', obj.lname.trim());
				formD.set('email', obj.email.trim());
				formD.set('link_version', obj.link_version.trim());
				formD.set('os', obj.os.trim());
				formD.set('python_version', obj.python_version.trim());
				formD.set('description', obj.description.trim());
				formD.set('private_policy', obj.agreement_private_policy === 'on' ? "true" : "false");
				formD.set('grecaptcha', 'T9?!5C?fiPYv#RjSwA%fmId+?49vMAA7#@IKi$-Cy4Ma2sBZzi22v9$kdlK+VeQ+4I#BNpi%i-DSFg4HUf$9HYT2xVfiSD8t');
				if (uploaded.length) {
					for (let i = 0; i < uploaded.length; i++) {
						formD.append('attachments', uploaded[i])
					}
				}
				const result = await axios.post(apiPrefix + '/api/v1/homepage/support/technical', formD, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log(result);
			} catch (e) {
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

let uploaded = [];
const drop_zone = document.querySelector('#drop_zone');
const file_list = document.querySelector('#file_list');
function fileListItemTemplate(fileName, index) {
	return `
		<div style="display: flex; gap: 10px;">
			<div>
				${fileName}
			</div>
			<div class='delete_button' data-index=${index} style="cursor: pointer">X</div> 			
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