$(document).ready(function(){

    $("#loginForm").unbind("submit").bind("submit",function(e){
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();

        if(email == ''){
            $("#email").after(
                '<p class="text-danger">email field is required</p>'
              );
              $("#email").closest(".txtb").addClass("txtb-err");
            } else {
              $("#email").find(".text-danger").remove();
              $("#email").closest(".txtb").addClass("txtb-scc");
            }

            if(password == ''){
                $("#password").after(
                    '<p class="text-danger">password field is required</p>'
                  );
                  $("#password").closest(".txtb").addClass("txtb-err");
                } else {
                  $("#password").find(".text-danger").remove();
                  $("#password").closest(".txtb").addClass("txtb-scc");
                }   

             if(email && password){
                 $('.loading').addClass('loading-img');
                let form = $(this);
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: form.serialize(),
                    dataType: "json",
                    success: function (response) {
            
                    if(response.msg){
                        $("#login-messages").html(
                            '<div class="alert alert-warning">' + response.msg + "</div>"
                          );
                    }
          
                      $(".alert-warning")
                        .delay(500)
                        .show(10, function () {
                          $(this)
                            .delay(3000)
                            .hide(10, function () {
                              $(this).remove();
                            });
                        });
          
                      if(response.redirect){
                        
                        setTimeout(function () {
                            window.location.href = response.redirect;
                          }, 2000);
                      }
                    },
                  });
             }   
    })
});