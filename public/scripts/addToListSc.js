$(document).ready(function () {
    $('.addtolist-btn-item').on('click', function () {
        let $btn = $(this);
        let movieId = $btn.data('id');
        let listId = $btn.data('listid'); 

        $.ajax({
            type: 'POST',
            url: '/addto-list',
            data: { 
                movieId: movieId, 
                listId: listId    
            },
            success: function (data) {
                if (data.success) {
                }
            }
        });
    });
});