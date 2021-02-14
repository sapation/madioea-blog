$(document).ready(function(){
    $("#addUserForm").unbind('submit').bind('submit', function(e){
        e.preventDefault();
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let role = $('#role').val();
        let bio = $('#bio').val();

        if(firstname ==''){
            $("#firstname").after(
                '<p class="text-danger">Firstname field is required</p>'
              );
              $("#firstname").closest(".form-control").addClass("is-invalid");
            } else {
              $("#firstname").find(".text-danger").remove();
              $("#firstname").closest(".form-control").addClass("is-valid");
            }
        
        if(lastname ==''){
            $("#lastname").after(
                '<p class="text-danger">Lastname field is required</p>'
              );
              $("#lastname").closest(".form-control").addClass("is-invalid");
            } else {
              $("#lastname").find(".text-danger").remove();
              $("#lastname").closest(".form-control").addClass("is-valid");
            }
            
            
        if(email ==''){
            $("#email").after(
                '<p class="text-danger">Email field is required</p>'
              );
              $("#email").closest(".form-control").addClass("is-invalid");
            } else {
              $("#email").find(".text-danger").remove();
              $("#email").closest(".form-control").addClass("is-valid");
            }
      
            
        if(password ==''){
            $("#password").after(
                '<p class="text-danger">Password field is required</p>'
              );
              $("#password").closest(".form-control").addClass("is-invalid");
            } else {
              $("#password").find(".text-danger").remove();
              $("#password").closest(".form-control").addClass("is-valid");
            }
       
            
        if(role ==''){
            $("#role").after(
                '<p class="text-danger">Role field is required</p>'
              );
              $("#role").closest(".form-control").addClass("is-invalid");
            } else {
              $("#role").find(".text-danger").remove();
              $("#role").closest(".form-control").addClass("is-valid");
            }
        
        if(firstname && lastname && email && password){
            const modal = $('#addUserModal');
            let form = $(this);
            $.ajax({
                url: form.attr("action"),
                type: form.attr("method"),
                data: form.serialize(),
                dataType: "json",
                success: function (response) {
                    modal.modal('hide')
                  $("#user-messages").html(
                    '<div class="alert alert-success">' + response.msg + "</div>"
                  );
      
                  $(".alert-success")
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
                    }, 3000);
                  }
                },
              });
        }
    });
})


/********************************************
 * User Edit Section
 ***************************************/
const editBtn = document.getElementsByClassName("edit-btn");

for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      const id = editBtn[i].dataset.id;
      const modal = $("#editUserModal");
      const token = modal.find("[name=_csrf]").val();
      console.log(token);
      const urlPoint = `getUser/${id}`;
      fetch(urlPoint, {
        credentials: 'same-origin',
        headers: {
          'CSRF-Token': token 
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          modal.find("#editUserForm").attr("action", "/admin/editUser/" + id);
          modal.find("#editPasswordForm").attr("action", "/admin/editUserPassword/" + id);
          modal.find("[name=editfirstname]").val(data.firstname);
          modal.find("[name=editfirstname]").val(data.firstname);
          modal.find("[name=editlastname]").val(data.lastname);
          modal.find("[name=editemail]").val(data.email);
          modal.find("[name=editrole]").val(data.role);
          modal.find("[name=editbio]").val(data.bio);
          modal.find("[name=id]").val(data._id);
          modal.modal("show");
        });
    });
  }


  const editUser = ()=>{
      $('#editUserForm').unbind('submit').bind('submit', function(e){
        e.preventDefault();
        let firstname = $('#editfirstname').val();
        let lastname = $('#editlastname').val();
        let email = $('#editemail').val();
        let role = $('#editrole').val();
        let bio = $('#editbio').val();

        if(firstname ==''){
            $("#editfirstname").after(
                '<p class="text-danger">Firstname field is required</p>'
              );
              $("#editfirstname").closest(".form-control").addClass("is-invalid");
            } else {
              $("#editfirstname").find(".text-danger").remove();
              $("#editfirstname").closest(".form-control").addClass("is-valid");
            }
        
        if(lastname ==''){
            $("#editlastname").after(
                '<p class="text-danger">Lastname field is required</p>'
              );
              $("#editlastname").closest(".form-control").addClass("is-invalid");
            } else {
              $("#editlastname").find(".text-danger").remove();
              $("#editlastname").closest(".form-control").addClass("is-valid");
            }
            
            
        if(email ==''){
            $("#editemail").after(
                '<p class="text-danger">Email field is required</p>'
              );
              $("#editemail").closest(".form-control").addClass("is-invalid");
            } else {
              $("#editemail").find(".text-danger").remove();
              $("#editemail").closest(".form-control").addClass("is-valid");
            }
      
            
        if(role ==''){
            $("#editrole").after(
                '<p class="text-danger">Role field is required</p>'
              );
              $("#editrole").closest(".form-control").addClass("is-invalid");
            } else {
              $("#editrole").find(".text-danger").remove();
              $("#editrole").closest(".form-control").addClass("is-valid");
            }

            if(firstname && lastname && email && role){
                const modal = $('#editUserModal');
                let form = $(this);
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: form.serialize(),
                    dataType: "json",
                    success: function (response) {
                        modal.modal('hide')
                      $("#user-messages").html(
                        '<div class="alert alert-success">' + response.msg + "</div>"
                      );
          
                      $(".alert-success")
                        .delay(500)
                        .show(10, function () {
                          $(this)
                            .delay(3000)
                            .hide(10, function () {
                              $(this).remove();
                            });
                        });
          
                      setTimeout(function () {
                        window.location.href = response.redirect;
                      }, 3000);
                    },
                  });
            }  
 })

    return false;
  }


  /********************************************
 * password Edit Section
 ***************************************/

 const editPassword = ()=>{
        $('#editPasswordForm').unbind('submit').bind('submit', function(e){
            e.preventDefault();
            let editPassword = $('#editpassword').val();
            if(editPassword ==""){
                $("#editpassword").after(
                    '<p class="text-danger">Password field is required</p>'
                  );
                  $("#editpassword").closest(".form-control").addClass("is-invalid");
                } else {
                  $("#editpassword").find(".text-danger").remove();
                  $("#editpassword").closest(".form-control").addClass("is-valid");
                }
               
                if(editPassword){
                  const modal = $('#editUserModal');
                  let form = $(this);
                  $.ajax({
                      url: form.attr("action"),
                      type: form.attr("method"),
                      data: form.serialize(),
                      dataType: "json",
                      success: function (response) {
                          modal.modal('hide')
                        $("#user-messages").html(
                          '<div class="alert alert-success">' + response.msg + "</div>"
                        );
            
                        $(".alert-success")
                          .delay(500)
                          .show(10, function () {
                            $(this)
                              .delay(3000)
                              .hide(10, function () {
                                $(this).remove();
                              });
                          });
                      },
                    });
                }
        })

     return false;
 }

 /********************************************
 * User Delete Section
 ***************************************/
const deleteBtn = document.getElementsByClassName("delete-btn");
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = deleteBtn[i].dataset.id;
    const modal = $("#deleteUser");
    modal.find("form").attr("action", `/admin/deleteUser/${id}`);
    modal.find("[name=deletePost]").val(id);
    modal.modal("show");
  });
}

const deleteUser = () => {
  const id = $("#editUserValue").val();
  const modal = $("#deleteUser");

  $("#deleteUserForm")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();
      let form = $(this);
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize(),
        dataType: "json",
        success: function (response) {
          modal.modal("hide");
          $("#user-messages").html(
            '<div class="alert alert-success">' +
              '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ' +
              response.msg +
              "</div>"
          );

          $(".alert-success")
            .delay(500)
            .show(10, function () {
              $(this)
                .delay(3000)
                .hide(10, function () {
                  $(this).remove();
                });
            });

          setTimeout(function () {
            window.location.href = response.redirect;
          }, 3000);
        },
      });
    });

  return false;
};