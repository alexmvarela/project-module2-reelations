$(document).ready(function () {
    $('.create-list-btn').on('click', function () {
       
        let $input = $(this).siblings('.input-list'); // siblings en este caso busca el item que tenga esta clase y este a su misma altura
        let inputValue = $input.val();

        $.ajax({
            type: 'POST',
            url: '/new-list',
            data: { name: inputValue },
            success: function (data) {
                if (data.success) {
                    // Manejar el éxito de la solicitud
                    $input.val('');
                    let $newListItem = $('<a>').text(inputValue).addClass('playlist-a').attr('href', `/lists/${data.id}`);
                    $(".collapse-div").append($newListItem);
                    $('.playlist-group-ul').append($newListItem);
                } else {
                    console.error('La solicitud no se completó correctamente:', data);
                }
                
            }
        });
    });
});