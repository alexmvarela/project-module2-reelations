$(document).ready(function() {
    $('.edit-btn').click(function() {
        
        let playId = $(this).attr('id');
        
        let $div1 = $('.prof-playlist-inner-' + playId).hide()
        
        
        let $edit = $('#edit-playlist-' + playId)
        $edit.removeClass('hidden')

              
    });
});


$(document).ready(function() {
    $('.cancel-edit-btn').click(function() {
        
        let playId = $(this).attr('id').substring(7)   
        let $edit = $('#edit-playlist-' + playId)
        $edit.addClass('hidden')

        let $div1 = $('.prof-playlist-inner-' + playId).show()      
    });
});