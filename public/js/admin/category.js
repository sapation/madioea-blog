const deleteBtn = document.getElementsByClassName('delete-btn');
const editBtn = document.getElementsByClassName('edit-btn');

    
 
/********************************************
 * Category Edit Section 
 ***************************************/
for(let i =0; i<editBtn.length; i++){
    editBtn[i].addEventListener('click',(e)=>{
        e.preventDefault();
        const id = editBtn[i].dataset.id;
        const modal = $('#editCategory');
        const urlPoint = `getCategory/${id}`;
        fetch(urlPoint,{
            method:'POST'
        }).then(res => res.json())
          .then(data =>{
              console.log(data);
            modal.find('form').attr('action', '/admin/editCategory/' + id );
            modal.find('[name=category_name]').val( data.category_name );
            modal.find('[name=id]').val(data._id);
            modal.modal('show')
        })
    })
}

/********************************************
 * Category updating Section 
 ***************************************/

const editCategory =()=>{
    const modal = $('#editCategory');
    const id = modal.find('[name=id]').val();
    const urlPoint = `editCategory/${id}`;
    let catName = modal.find('[name=category_name]').val();
    $.ajax({
        method: "POST",
        url: urlPoint,
        data: { category_name : catName}
      })
        .done(function( msg ) {
          alert( "Data Saved: " + msg );
        });
}


/********************************************
 * Category Delete Section 
 ***************************************/
for(let i = 0; i<deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click', (e)=>{
        e.preventDefault();
        const id = deleteBtn[i].dataset.id;
        const endpoint = `deleteCategory/${id}`;
        fetch(endpoint,{
            method:'DELETE'
        }).then(res=> res.json())
        .then((result)=>{
            window.location.href = result.redirect;
            alert(result.msg);
        }).catch(error=>console.log(error))
    })
    
}
