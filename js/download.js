
// const downType = document.querySelector('.download_list');
// const downTypeItem = Array.from(downType.querySelectorAll('li'));
// downTypeItem.addEventListener('click', (event) => {
// 	;
// 	const target = event.target;
// 	const link = target.dataset.link;
// 	downTypeItem.forEach((item) => item.classList.remove('active'));
// 	target.classList.add('active');
// 	if (link == null) {
// 		return;
// 	}
// });


/**
 * 전역 변수
 */
let isEnableSubmit = false;
/**
/**
* 에러 필드
*/
const email_error_filed = document.querySelector('#email_error_field');
const product_key_error_field = document.querySelector('#product_key_error_field');
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
	}, 300);
})

productKeyInputTag.addEventListener('keydown', (event) => {
	if (productKeyInputDebouncingID) clearTimeout(productKeyInputDebouncingID);
	productKeyInputDebouncingID = setTimeout(() => {
		checkIsEnableSubmit();
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
			const url = 'https://homepage.api.admin.link.makinarocks.ai/jhigcbc8t19efxrtizc8wd20q/api/v1/homepage/customer/register';

			xhr.open(method, url);
			xhr.onreadystatechange = (event) => {
				const { target } = event;
				if (target.readyState === XMLHttpRequest.DONE) {
					const { status } = target;
					// download1.html					
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

