$(document).ready(function () {
    $("#postImage").fileinput({
      browseClass: "btn cprimary btn-block",
      showCaption: false,
      showRemove: false,
      showUpload: false
  });

  // posts.js:17 C:\fakepath\2.png

  $("#addPostForm")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();

      let postTitle = $("#postName").val();
      let postCategory = $("#postCategory").val();
      let postBody = CKEDITOR.instances.postBody.getData();
      let postStatus = $("#postStatus").val();
      let postImage = $("#postImage").val();
      //  postImage = postImage.split("\\")[2];
      console.log(postBody);

      if (postTitle == "") {
        $("#postName").after(
          '<div class="invalid-feedback">Please provide a post name.</div>'
        );
        $("#postName").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#postName").find(".invalid-feedback").remove();
        // success out for form
        $("#postName").closest(".form-control").addClass("is-valid");
      }

      if (postCategory == "") {
        $("#postCategory").after(
          '<div class="invalid-feedback">Please provide a post category.</div>'
        );
        $("#postCategory").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#postCategory").find(".invalid-feedback").remove();
        // success out for form
        $("#postCategory").closest(".form-control").addClass("is-valid");
      }

      if (postBody == "") {
        $("#postBody").after(
          '<div class="invalid-feedback">Please provide post Body.</div>'
        );
        $("#postBody").closest(".form-control").addClass("is-invalid");
      } else {
        // remov error text field
        $("#postBody").find(".invalid-feedback").remove();
        // success out for form
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
        // let formData ={
        //   postName:postTitle,
        //   postCategory: postCategory,
        //   postBody:postBody,
        //   postStatus:postStatus,
        //   postImage:postImage
        // };
        formData.append('postBody',CKEDITOR.instances.postBody.getData())
        console.log(formData);
        $.ajax({
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

const deleteBtn = document.getElementsByClassName("delete-btn");
const editBtn = document.getElementsByClassName("edit-btn");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = deleteBtn[i].dataset.id;
    const modal = $("#deletePost");
    modal.find("form").attr("action", `/admin/deletePost/${id}`);
    modal.find("[name=editcategory]").val(id);
    modal.modal("show");
  });
}

const deletePost = () => {
  const modal = $("#deletePost");

  $("#deletePostForm")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();
      console.log("Hello");
    });
};
