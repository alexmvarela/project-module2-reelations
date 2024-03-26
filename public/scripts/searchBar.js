$(document).ready(function(){
    let typingTimer; 
    let doneTypingInterval = 500; 



    $('#searchMovies').on('input', function(event){
        clearTimeout(typingTimer); 
        if ($('#searchMovies').val()) {
            typingTimer = setTimeout(function(){
                let title = $('#searchMovies').val();
                if(title.length >= 3) { 
                    $.ajax({
                        url: '/search-movie',
                        method: 'POST',
                        data: { title: title },
                        success: function(data) {

                            let firstFiveResults = data.slice(0, 5);

                            $('#result .search-result').remove();
                            if (firstFiveResults.length > 0) {
                                $('#result').removeClass('hidden')
                            } else {
                                $('#result').addClass('hidden')

                            }
                            firstFiveResults.forEach(function(movie) {

                                

                                let $div = $('<div>').addClass('search-result');
                                let $div2 = $('<div>').addClass('search-info')
                                let $img = $('<img>').attr('src', movie.image);
                                let $a = $('<a>').attr('href', `/movies/${movie._id}`).addClass('result-link-con'); // Crear el enlace <a>


                                let $p = $('<a>').text(movie.title).attr('href', `/movies/${movie._id}`).addClass('result-link-a');

                                let genres = movie.genres.map((gen) => {
                                    return  ' ' + gen.name ;
                                });

                                let $p2 = $('<p>').addClass('search-genre').text(genres);

                                $div2.append($p, $p2)
                                $a.append($img, $div2); // Agregar elementos al enlace <a>

                                $div.append($a);
                                $('#result').append($div);



                    
                            })
                            $('#searchLink').appendTo('#result');

                        },
                        error: function(xhr, status, error) {
                            console.error('Error en la solicitud:', error);
                        }
                    });
                } else {
                    $('#result').html(''); // Limpia los resultados si hay menos de 3 caracteres
                }
            }, doneTypingInterval);
        }
    });
});