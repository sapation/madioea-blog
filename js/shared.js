jQuery(document).ready(function(){
    "use strict" 

     //Scroll section
    
     $(window).scroll(function(){
        let top = $(window).scrollTop();
        if(top>= 20){
            $("nav").addClass('secondary')
        }else if($("nav").hasClass('secondary')){
            $('nav').removeClass('secondary')
        }
    })

})