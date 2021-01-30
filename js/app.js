jQuery(document).ready(function(){
 "use strict"    
    
    //Water ripples effect
    $('.slider').ripples({
      dropRadius: 15,
      perturbance: 0.01,
      
    });
    
//Text animation section
    
    let typed = new Typed('.text', {
        strings:["<strong>I love</strong> <strong class='primary'>coding.</strong>","<strong>and to</strong> <strong class='primary'>share !!!</strong>"],
        typeSpeed: 50,
        loop:true
    });
    
    
    //Scroll section
    
    $(window).scroll(function(){
        let top = $(window).scrollTop();
        if(top>= 60){
            $("nav").addClass('secondary')
        }else if($("nav").hasClass('secondary')){
            $('nav').removeClass('secondary')
        }
    })
    
    
    // popup section
    
    $('.work').magnificPopup({
       delegate: 'a', 
       gallery: {
      enabled: true
    },
    type: 'image'
      
});


// owl carousel
$('#team-members').owlCarousel({
    items:3,
    autoplay:true,
    smartSpeed:700,
    loop:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        480:{
            items:3
        },
        768:{
            items:3
        }
    }
})
    
});