$(document).ready(function () {
    $('.delete-list').on('click', function () {
        let $btn = $(this);
        let listItemId = $btn.data('id');
        let listDel = $btn.data('listdel'); 
            $.ajax({
                type: "POST",
                url: "/delete-list",
                data: {listItemId: listItemId,
                        listDel: listDel},
                success: function (data) {
                    if (data.success) {
            
                        $btn.closest('.page-results').remove();
                    }
                }
            })
    })
})