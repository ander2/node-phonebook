$(function(){

    var getEntryData = function(){
       var name =  $(this).text();
       $.getJSON('/entry/' + name, function(data){
            $('#name').html(name);
            $('#phone').text(data);
       })
   }
   $('#entries li a').click(getEntryData);

   $('#add-new-phone').click(function(){
        var name = $('#new-name').val();
        var phone = $('#new-phone').val();
        $.ajax({
            method: 'POST',
            url: '/entry/add',
            data: JSON.stringify({name: name, phone: phone}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
               var link = $('<a>').text(name).click(getEntryData);
               $('<li>').appendTo('#entries').html(link);
               $('#new-name').val('');
               $('#new-phone').val('');
            },
            error: function(err) {
               var msg = 'Status: ' + err.status + ': ' + err.responseText;
               alert(msg);
            }
        });  
   })
});