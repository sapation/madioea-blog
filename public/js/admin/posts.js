$(document).ready(function () {
    $("#postImage").fileinput({
      browseClass: "btn cprimary btn-block",
      showCaption: false,
      showRemove: false,
      showUpload: false
  });

  $("#editpostImage").fileinput({
    browseClass: "btn cprimary btn-block",
    showCaption: false,
    showRemove: false,
    showUpload: false
});

  $("#addPostForm")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();

      let postTitle = $("#postName").val();
      let postCategory = $("#postCategory").val();
      let postBody = CKEDITOR.instances.postBody.getData();
      let postStatus = $("#postStatus").val();
      let postImage = $("#postImage").val();
     
      if (postTitle == "") {
        $("#postName").after(
          '<div class="invalid-feedback">Please provide a post name.</div>'
        );
        $("#postName").closest(".form-control").addClass("is-invalid");
      } else {
        $("#postName").find(".invalid-feedback").remove();
        $("#postName").closest(".form-control").addClass("is-valid");
      }

      if (postCategory == "") {
        $("#postCategory").after(
          '<div class="invalid-feedback">Please provide a post category.</div>'
        );
        $("#postCategory").closest(".form-control").addClass("is-invalid");
      } else {
        $("#postCategory").find(".invalid-feedback").remove();
        $("#postCategory").closest(".form-control").addClass("is-valid");
      }

      if (postBody == "") {
        $("#postBody").after(
          '<div class="invalid-feedback">Please provide post Body.</div>'
        );
        $("#postBody").closest(".form-control").addClass("is-invalid");
      } else {
        $("#postBody").find(".invalid-feedback").remove();
        $("#postBody").closest(".form-control").addClass("is-valid");
      }

      if (postStatus == "") {
        $("#postStatus").after(
          '<div class="invalid-feedback">Please provide a post status.</div>'
        );
        $("#postStatus").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#postStatus").find(".invalid-feedback").remove();
        // success out for form
        $("#postStatus").closest(".form-control").addClass("is-valid");
      }

      if (postImage == "") {
        $("#postImage").after(
          '<div class="invalid-feedback">Please provide a post status.</div>'
        );
        $("#postImage").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#postImage").find(".invalid-feedback").remove();
        // success out for form
        $("#postImage").closest(".form-control").addClass("is-valid");
      }

      if (postTitle && postCategory && postBody && postStatus) {
        let form = $(this);
        let formData = new FormData(this);
        const token =  $("#addPostModal").find("[name=_csrf]").val();
        formData.append('postBody',CKEDITOR.instances.postBody.getData())
        $.ajax({
          credentials: 'same-origin',
          headers: {
            'CSRF-Token': token 
          },
          url: form.attr("action"),
          type: form.attr("method"),
          data: formData,
          dataType: "json",
          cache: false,
          contentType: false,
          processData: false,
          success: function (response) {
            $("#addPostModal").modal("hide");

            $("#post-messages").html(
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
    });
});

/********************************************
 * Post  Edit Section
 ***************************************/


const editBtn = document.getElementsByClassName("edit-btn");
for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = editBtn[i].dataset.id;
    const modal = $("#editPostModal");
    const urlPoint = `getPost/${id}`;
    const token = modal.find("[name=_csrf]").val();
    fetch(urlPoint, {
      credentials: 'same-origin',
      headers: {
        'CSRF-Token': token 
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        CKEDITOR.instances.editpostBody.setData( data.postBody );
        modal.find("form").attr("action", "/admin/editPost/" + id);
        modal.find("[name=editpostName]").val(data.postName);
        modal.find("[name=editpostCategory]").val(data.postCategory);
        //modal.find("[name=editpostBody]").val(data.postBody);
        modal.find("[name=editpostStatus]").val(data.postStatus);
        modal.find("[name=id]").val(data._id);
        modal.modal("show");
      });
  });
};

const editPost = ()=>{
  $('#editPostForm').unbind('submit').bind('submit', function(e){
      e.preventDefault();
      
      let editpostTitle = $("#editpostName").val();
      let editpostCategory =$("#editpostCategory").val();
      let editpostBody = CKEDITOR.instances.editpostBody.getData();
      let editpostStatus = $("#editpostStatus").val();
      


      if (editpostTitle == "") {
        $("#editpostName").after(
          '<div class="invalid-feedback">Please provide a post name.</div>'
        );
        $("#editpostName").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#editpostName").find(".invalid-feedback").remove();
        // success out for form
        $("#editpostName").closest(".form-control").addClass("is-valid");
      }

      if (editpostCategory == "") {
        $("#editpostCategory").after(
          '<div class="invalid-feedback">Please provide a post category.</div>'
        );
        $("#editpostCategory").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#editpostCategory").find(".invalid-feedback").remove();
        // success out for form
        $("#editpostCategory").closest(".form-control").addClass("is-valid");
      }

      if (editpostBody == "") {
        $("#editpostBody").after(
          '<div class="invalid-feedback">Please provide post Body.</div>'
        );
        $("#editpostBody").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#editpostBody").find(".invalid-feedback").remove();
        // success out for form
        $("#editpostBody").closest(".form-control").addClass("is-valid");
      }

      if (editpostStatus == "") {
        $("#editpostStatus").after(
          '<div class="invalid-feedback">Please provide a post status.</div>'
        );
        $("#editpostStatus").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#editpostStatus").find(".invalid-feedback").remove();
        // success out for form
        $("#editpostStatus").closest(".form-control").addClass("is-valid");
      }

      if (editpostTitle && editpostCategory && editpostBody && editpostStatus) {
        let form = $(this);
      
        let formData = new FormData(this);
        const token =  $("#editPostModal").find("[name=_csrf]").val();
        formData.append('editpostBody',CKEDITOR.instances.editpostBody.getData())
        // formData.append('CSRF-Token', token)
       
        $.ajax({
          credentials: 'same-origin',
          headers: {
            'CSRF-Token': token 
          },
          url: form.attr("action"),
          type: form.attr("method"),
          data: formData,
          dataType: "json",
          cache: false,
          contentType: false,
          processData: false,
          success: function (response) {
            $("#editPostModal").modal("hide");

            $("#post-messages").html(
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

  });

  return false;
}

/********************************************
 * Post Delete Section
 ***************************************/
const deleteBtn = document.getElementsByClassName("delete-btn");
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = deleteBtn[i].dataset.id;
    const modal = $("#deletePost");
    modal.find("form").attr("action", `/admin/deletePost/${id}`);
    modal.find("[name=deletePostValue").val(id);
    modal.modal("show");
  });
};


const deletePost = ()=> {
  const modal = $("#deletePost");

  $("#deletePostForm").unbind('submit').bind('submit', function(e){
      e.preventDefault();
        let form  = $(this);
        $.ajax({
          url: form.attr("action"),
          type: form.attr("method"),
          data: form.serialize(),
          dataType: "json",
          success: function (response) {
            modal.modal("hide");
            $("#post-messages").html(
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
          },3000)
        }
        })
  });
  return false
}

 
