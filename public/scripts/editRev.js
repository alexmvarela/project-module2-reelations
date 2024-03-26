$(document).ready(function() {
    $('.edit-btn').click(function() {
        
        let reviewId = $(this).attr('id');
        
        let $div1 = $('.rev-userinfo-' + reviewId).hide()
        let $div2 = $('.rev-content-' + reviewId).hide()
        
        let $edit = $('#edit-review-' + reviewId)
        $edit.removeClass('hidden')

        
        

        $('#review-' + reviewId).append($edit, $separ);
      
    });
});


$(document).ready(function() {
    $('.cancel-edit-btn').click(function() {
        
        let reviewId = $(this).attr('id').substring(7)    
        let $edit = $('#edit-review-' + reviewId)
        $edit.addClass('hidden')

        let $div1 = $('.rev-userinfo-' + reviewId).show()
        let $div2 = $('.rev-content-' + reviewId).show()


      
    });
});








let content = document.getElementById('content').innerText;


