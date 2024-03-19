$(document).ready(function () {
    $('.like-btn').on('click', function () {
        let $btn = $(this);
        let objectId = $btn.data('id');

        $.ajax({
            type: 'POST',
            url: '/like',
            data: { objectId: objectId },
            success: function (data) {
                if (data.success) {
                    console.log('liked!')
                    let isLiked = data.user.likes.includes(objectId);
                    $btn.css('color', isLiked ? '#D94A4A' : '#727272');
                }
            }
        });
    });
});