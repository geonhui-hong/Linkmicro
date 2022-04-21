gsap.to('.feauture_text_01', {
  scrollTrigger: {
    trigger: '.feature_01',
    markers: true,
    start: 'top 80%',
    end: "bottom, 50%",
    scrub:true,
  },
  
  y: -100,
  opacity:1,
  duration: 4,
});
gsap.to('.feauture_img_01', {
  scrollTrigger: {
    trigger: '.feature_img',
    markers: true,
    start: 'top 80%',
    end: "bottom, 50%",
    scrub:true,
  },
  y: -100,
  opacity:1,
  duration: 1,
});