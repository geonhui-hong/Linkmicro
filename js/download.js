const downType = document.querySelector('.download_list');
const downTypeItem = Array.from(downType.querySelectorAll('li'));
downTypeItem.addEventListener('click',(event) =>{;
  const target = event.target;
  const link = target.dataset.link;
  downTypeItem.forEach((item) => item.classList.remove('active'));
  target.classList.add('active');
  if(link == null){
    return;
  }
});