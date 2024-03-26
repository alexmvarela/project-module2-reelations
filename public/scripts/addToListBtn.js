document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.addtolist-btn');
    const collapsePlaylists = document.querySelectorAll('.collapse-div');
    const addtolist = document.querySelectorAll(".addtolist-btn-item")
    

    toggleButtons.forEach(function(toggleButton, index) {
        toggleButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const collapsePlaylist = collapsePlaylists[index];
            collapsePlaylist.classList.toggle('show');
        });
    });

    document.addEventListener('click', function(event) {
        collapsePlaylists.forEach(function(collapsePlaylist) {
            if (!collapsePlaylist.contains(event.target) && !event.target.classList.contains('addtolist-btn')) {
                collapsePlaylist.classList.remove('show');
            }
            
        });
    });

    addtolist.forEach(function(addtolist, index) {
        addtolist.addEventListener('click', function(event) {
            event.stopPropagation();
            collapsePlaylists.forEach(function(collapsePlaylist) {
                collapsePlaylist.classList.remove('show');
            });
        });
    });
})
