/*global $ */
$(document).ready(function(){
    showCategories()
    showProducts()
})

function showCategories() {
    $.get( "/categories", function( data ) {
        var html = ''
        data.forEach(function(category) {
            html = html + '<li><a style="font-size: 25px; text-decoration: none" href="#" onClick="showProducts('+category.id+')">'+category.name+'</a></li>'
        })
        $('#categories').html(html)
    });
}


function showProducts(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/products';
    } else {
        var url = '/products'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(product) {
                html = html + '<div class="product">'
                //   +  '<h3 style="font: bold 20px/1.5 Helvetica, Verdana, sans-serif;">'+product.name+'</h3>'
                //   +  '<p style = "font: 200 12px/1.5 Georgia, Times New Roman, serif;">'+product.description+'</p>'
                //   +  '<p style = "font: 200 12px/1.5 Georgia, Times New Roman, serif;">Pret: '+product.pret+'</p>'
                //   +  '<p style = "font: 200 12px/1.5 Georgia, Times New Roman, serif;" >Categorie: '+product.category.name+'</p>'
                
                +' <table style="width: 691px; height: 121px; background-color: #aadade; border-color: #059abd; font: 200 12px/1.5 Georgia, Times New Roman, serif;" border="10">'
                +'<caption style="font: bold 20px/1.5 Helvetica, Verdana, sans-serif; background-color: #aadade;">'+product.name+'</caption>'
                +'<caption style=" font: 200 12px/1.5 Georgia, Times New Roman, serif;background-color: #aadade; text-align: center;">'+product.description+'</caption>'
                +'    <tbody>'
                +'    <tr style="height: 23px;">'
                +'    <td style="width: ; height: 23px;">Categorie</td>'
                +'    <td style="width: 407px; height: 23px;">'+product.category.name+'</td>'
                +'    </tr>'
                +'    <tr style="height: 23px;">'
                +'    <td style="width: 397px; height: 23px;">Autor</td>'
                +'    <td style="width: 407px; height: 23px;">'+product.author+'</td>'
                +'    </tr>'
                +'    <tr style="height: 23px;">'
                +'    <td style="width: 397px; height: 23px;">Pret</td>'
                +'    <td style="width: 407px; height: 23px;">'+product.pret+'</td>'
                +'    </tr>'
                +'    <tr style="height: 23px;">'
                +'    <td style="width: 397px; height: 23px;">Editura</td>'
                +'    <td style="width: 407px; height: 23px;">'+product.publishingHouse+'</td>'
                +'    </tr>'
                +'    <tr style="height: 23px;">'
                +'    <td style="width: 397px; height: 23px;">An aparitie</td>'
                +'    <td style="width: 407px; height: 23px;">'+product.yearAppearance+'</td>'
                +'    </tr>'
                +'    </tbody>'
                +'  </table>'
                +'<hr>'
                + '</div>'
                +'<br>';
                
                // html = html + '<h3>Product reviews</h3>'
                
                // if(product.reviews) {
                //     product.reviews.forEach(
                //         function(reviewData) {
                //             html = html + reviewData.name + ' ' + reviewData.content;
                //             html = html + '<br>';
                //         }
                //     )
                // }
                
                
            }
        )
        $('#content').html(html);
    })
}

function sendMessage() {
    //get data from the html form
    var formData = $('#create_message').serializeObject();
    // var formData = formdd();
        console.log(formData);
    //decide if it's an edit or create
    createMessage(formData);
}
function createMessage(formData) {
    $.ajax({
        url: '/messages/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
             $('#add_new_record_modal').modal('hide');
            
            // var row = '<tr id="row_id_'+ data.id +'">'
            // 			+ displayColumns(data)
        				// + '</tr>';
            // $('#articles').append(row);
        } 
    });
}