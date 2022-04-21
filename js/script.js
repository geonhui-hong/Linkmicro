//네비 
$(document).ready(function(){
    $(".popupVideo a").click(function() {
        $(".video-popup").addClass("reveal");
        $(".video-popup .video-wrapper").remove();
        $(".video-popup").append("<div class='video-wrapper'><iframe width='560' height='315' src='https://youtube.com/embed/" + $(this).data("video") + "?rel=0&playsinline=1&autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")
      });
      $(".video-popup-closer").click(function() {
        $(".video-popup .video-wrapper").remove();
        $(".video-popup").removeClass("reveal");
      });
});



function fnMove(seq){
    var offset = $("#div" + seq).offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
};


// 탭
$(document).ready(function(){

$('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('active');
    $('.work__projects').removeClass('active');

    $(this).addClass('active');
    $("#"+tab_id).addClass('active');
});

});
// 모달창 띄우기  
// const body = document.querySelector('body');
// const modalWrap = document.querySelector('.modal');
// const project = document.querySelector('.proejct');
// project.addEventListener('click',() =>{
//   modalWrap.classList.add('open');
//   body.classList.add('modal_in');
//   bodystyle.paddingRight = getScrollWidth();
// });


// $(document).ready(function() {
//     $body = $('body');
//     $modalWrap = $('.modal');
//     $('.project').click(function(){
//         $('.modal').addClass('open');
//         $body.addClass('modal_in');
//         $("nav").css({"opacity":"0"});
//         $body.css('padding-right',getScrollWidth());
//     });

//    $('.modal_close').click(function(){
//       $('.modal').removeClass('open');
//       setTimeout(function () {
//         $body.removeClass('modal_in');  
//         // $("body").css("overflow", "auto");
//         $body.css('padding-right',0)
//         $("nav").css({"opacity":"1"}); 
//       }, 600);

//     });
// 		function getScrollWidth(){
// 			var body = document.querySelector('body');
// 		    var scrollDiv = document.createElement('div');
// 		    	scrollDiv.className = 'fake_sjwidth';
// 		    	body.appendChild(scrollDiv);
// 		    var scrollbarWidth = $(document).height() > $(window).height() ? scrollDiv.offsetWidth - scrollDiv.clientWidth : 0;

// 		    	body.removeChild(scrollDiv);
// 		    	return scrollbarWidth;
// 		}
// $('.btn_nav').click(function(){
//     $('.btn_nav').removeClass('active');
//     $(this).addClass('active');
//     });
    
// });


//gnb
// $(function(){
//     $('.gnb > li >a').on('mouseenter focus',function(){
//         var gnbindex = $('.gnb > li >a').index($(this));
//         $('.gnb .inner').removeClass('on');
//        $('.gnb .inner:eq('+ gnbindex +')').addClass('on');
//     });
//     $('header').on('mouseleave', function(){
//         $('.gnb .inner').removeClass('on');
//     } )
// });

//fixheader



var scrollFix = 0;
scrollFix = $(document).scrollTop();
fixHeader();



//윈도우창 조절시 이벤트
$(window).on('scroll resize', function(){
    scrollFix = $(document).scrollTop();
    fixHeader();
});



//고정헤더함수=> fixheader();
function fixHeader(){
    if(scrollFix > 150){
        $('header').addClass('on');
    }else{
        $('header').removeClass('on');
    }
}
