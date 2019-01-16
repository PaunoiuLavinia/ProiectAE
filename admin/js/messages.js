/*global $ */
$(document).ready(function(){
    showMessages();
})

function showMessages() {
    $.get( "/messages", function( data ) {
        var html = ''
        data.forEach(function(message) {
            html = html + '<li><p>Nume: '+message.surname+'</p> '
                               +'<p>Prenume: '+message.name+'</p>'
                               +'<p>Email: '+message.email+'</p>'
                               +'<p>Fax: '+message.fax+'</p>'
                               +'<p>Telefon: '+message.phone+'</p>'
                               +'<p>Email: '+message.email+'</p>'
                               +'<p>Mesaj: '+message.message+'</p>'
                          +' </li>'
        })
        // style="font-size: 25px; text-decoration: none"
        $('#messages').html(html)
    });
}