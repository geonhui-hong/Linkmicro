const download_button = document.querySelector('#download_button');
if (download_button) {
	download_button.style.opacity = 1;
	download_button.addEventListener('click', () => {
		// 다운로드
		window.location.href = 'download.html'
	})
}


const resend_button = document.querySelector('#resend_button');
if (resend_button) {
	resend_button.addEventListener('click', () => {
		// 이메일 재전송 요청
		console.log("이메일 재전송 요청")
	})
}