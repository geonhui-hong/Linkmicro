/**
 * submit 버튼 색 풀기(여기서는 submit의 조건이 없다)
 */
const submit_button = document.querySelector('#submit');
if (submit_button) submit_button.style.opacity = 1;

const form = document.querySelector('#download_option_form');
if (form) {
	form.addEventListener('submit', (e) => {
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


submit_button.addEventListener('click', () => {
	try {
		const xhr = new XMLHttpRequest();
		const method = 'POST';
		const url = '';

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
	} catch (e) {
		console.log(e);
	}
})