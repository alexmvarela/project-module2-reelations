$(document).ready(function () {
    $('.create-list-btn').on('click', function () {
       
        let $input = $(this).siblings('.input-list'); // siblings en este caso busca el item que tenga esta clase y este a su misma altura
        let inputValue = $input.val();

        $.ajax({
            type: 'POST',
            url: '/new-list',
            data: { name: inputValue },
            success: function (data) {
                $input.val('');
                let $newListItem = $('<a>').text(inputValue).addClass('playlist-a').attr('href', `/lists/${data.id}`);
                $('.playlist-group-ul').append($newListItem);
            }
        });
    });
});