/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/products/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    console.log('fdf'+value);
    return 	'<td>'+value.id+'</td>'
            + '<td class="category_id">'+value.category.name+'</td>'
            + '<td class="name">'+value.name+'</td>'
			+ '<td class="description">'+value.description+'</td>'
			+ '<td class="author">'+value.author+'</td>'
			+ '<td class="publishingHouse">'+value.publishingHouse+'</td>'
			+ '<td class="yearAppearance">'+value.yearAppearance+'</td>'
			+ '<td class="price">'+value.price+'</td>'
// 			+ '<td class="image"><img src="/'+value.image+'"></img></td>'
            + '<td class="image">'+value.image+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    console.log('kjlkj'+ $('#image').paths(''));
    $('#id').val('');
    $('#category_id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#author').val('');
    $('#publishingHouse').val('');
    $('#yearAppearance').val('');
    $('#price').val('');
    $('#image').val('');
    
    $('#myModalLabel').html('Add New Product');
}

function viewRecord(id) {
    var url = "/products/" + id;
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        console.log(data.image);
        $('#category_id').val(data.category_id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#author').val(data.author);
        $('#publishingHouse').val(data.publishingHouse);
        $('#yearAppearance').val(data.yearAppearance);
        $('#price').val(data.price);
        $('#image').val(data.image);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}

function formdd() {
    var form = $('#record_form'),
        formDataa = new FormData(),
        formParams = form.serializeArray();

    $.each(form.find('input[type="file"]'), function(i, tag) {
      $.each($(tag)[0].files, function(i, file) {
        formDataa.append(tag.name, file);
      });
    });

    $.each(formParams, function(i, val) {
      formDataa.append(val.name, val.value);
    });
return formDataa;
  }

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    // var formData = formdd();
        console.log(formData);
    //decide if it's an edit or create
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/products/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/products/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
           console.log(formData);
            $('#row_id_'+formData.id+'>td.category_id').html(formData.category_id);
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.description').html(formData.description);
            $('#row_id_'+formData.id+'>td.author').html(formData.author);
            $('#row_id_'+formData.id+'>td.publishingHouse').html(formData.publishingHouse);
            $('#row_id_'+formData.id+'>td.yearAppearance').html(formData.yearAppearance);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            $('#row_id_'+formData.id+'>td.image').html(formData.image);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/products/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}