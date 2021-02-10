$(document).ready(function () {
  $("#addCategory")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();
      let addCatName = $("#addCatName").val();

      if (addCatName == "") {
        $("#addCatName").after(
          '<p class="text-danger">Category Name field is required</p>'
        );
        $("#addCatName").closest(".form-control").addClass("is-invalid");
      } else {
        $("#category_name").find(".text-danger").remove();
        $("#category_name").closest(".form-control").addClass("is-valid");
      }

      if (addCatName) {
        let form = $(this);
        $.ajax({
          url: form.attr("action"),
          type: form.attr("method"),
          data: form.serialize(),
          dataType: "json",
          success: function (response) {
            $("#category-messages").html(
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

/********************************************
 * Category Edit Section
 ***************************************/
for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = editBtn[i].dataset.id;
    const modal = $("#editCategory");
    const urlPoint = `getCategory/${id}`;
    fetch(urlPoint, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        modal.find("form").attr("action", "/admin/editCategory/" + id);
        modal.find("[name=category_name]").val(data.category_name);
        modal.find("[name=id]").val(data._id);
        modal.modal("show");
      });
  });
}

/********************************************
 * Category updating Section
 ***************************************/

const editCategory = () => {
  const modal = $("#editCategory");
  let cateName = $("#category_name").val();

  if (cateName == "") {
    $("#category_name").after(
      '<p class="text-danger">Category Name field is required</p>'
    );
    $("#category_name").closest(".form-control").addClass("is-invalid");
  } else {
    // remov error text field
    $("#category_name").find(".text-danger").remove();
    // success out for form
    $("#category_name").closest(".form-control").addClass("is-valid");
  }

  if (cateName) {
    $("#editCategoryForm")
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

            $("#category-messages").html(
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
  }
  return false;
};

/********************************************
 * Category Delete Section
 ***************************************/
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const id = deleteBtn[i].dataset.id;
    const modal = $("#deletePost");
    modal.find("form").attr("action", `/admin/deleteCategory/${id}`);
    modal.find("[name=deletePost]").val(id);
    modal.modal("show");
  });
}

const deleteCategory = () => {
  const id = $("#editCategoryValue").val();
  const modal = $("#deleteCategory");

  $("#deleteCategoryForm")
    .unbind("submit")
    .bind("submit", function (e) {
      e.preventDefault();
      let form = $(this);
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        dataType: "json",
        success: function (response) {
          modal.modal("hide");
          $("#category-messages").html(
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
