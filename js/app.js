jQuery(document).ready(function(){
 "use strict"    
    
    //Water ripples effect
    $('.slider').ripples({
      dropRadius: 15,
      perturbance: 0.01,
      
    });
    
//Text animation section
    
    let typed = new Typed('.text', {
        strings:["<strong>Welcome to</strong> <strong class='primary'>Mandiora Blog.</strong>","<strong>We love to</strong> <strong class='primary'>share our thought!!!</strong>"],
        typeSpeed: 50,
        loop:true
    });
    
     
    // popup section
    
    $('.work').magnificPopup({
       delegate: 'a', 
       gallery: {
      enabled: true
    },
    type: 'image'
      
});
$('#categories').owlCarousel({
    items:5,
    autoplay:true,
    smartSpeed:700,
    loop:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:2
        },
        480:{
            items:5
        },
        768:{
            items:5
        }
    }
})

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