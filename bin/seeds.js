
require('dotenv/config');
require('../configs/db.config');

const Movie = require('../models/movies.model')
const Genre = require('../models/genre.model')
const Review = require('../models/review.model')


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgzMjMzYmI5YWQ0OThiZTZjOTYwNWU4OWU3MjU0YiIsInN1YiI6IjY1ZTc2MTZiMzFkMDliMDE3ZGUzMTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VqyuyEvW2r3JaqHTZs4ebw0E0fyaV-pZIHegl3zbIXw'
  }
};

let i = 0;

findMovies()

function findMovies() {

  Movie.find()
      .then(movies => {

          if (movies.length > 0) {
              fetchPage(movies, i);
          } else {
              console.log('No se encontraron películas.');
          }
      })
      .catch(error => {
          console.error('Error al buscar películas:');
      });
}
 


let num = 20000



// const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

// fetch(genresUrl, options)
//     .then(response => response.json())
//     .then(json => {
//       return Genre.create(json.genres)
//             .then((genres) => console.info('Genres created'))
//             .catch(err => console.error('error creating genres:' + err))
//     })
//     .catch(err => console.error('error:' + err))

// function fetchPage(Arr) {

//     if (i < Arr.length) { 
//         const id = Arr[i];

//         Movie.findById(id)
//                 .then((movie) => {
//                     const reviews = movie.reviews;

//                     return Promise.all(reviews.map((rev) => {
//                         rev.movie_id = movie.id;
//                         rev.rating = rev.author_details.rating;

//                         return Review.create(rev);
//                     }))
//                     .then(() => {
//                         console.log(`Created reviews for movie ${i + 1} / ${Arr.length}`);
//                     });
//                 })
//                 .catch((error) => {
//                     console.error(`Error al procesar la película ${error}`);
//                 })
//                 .finally(() => {
//                     i++;
//                     fetchPage(Arr); // Llamada recursiva después de procesar la película actual
//                 });
//     } else {
//         console.log('Se han creado todas las películas.');
//     }
// }




// Identificar y eliminar los documentos duplicados
// Movie.aggregate([
//     {
//       $group: {
//         _id: { overview: '$overview' }, // Agrupar por el campo que puede tener duplicados
//         duplicados: { $addToSet: '$_id' }, // Almacenar los IDs de los documentos duplicados
//         count: { $sum: 1 } // Contar cuántos documentos hay en cada grupo
//       }
//     },
//     {
//       $match: {
//         count: { $gt: 1 } // Filtrar los grupos que tienen más de un documento (es decir, duplicados)
//       }
//     }
//   ]).exec()
//   .then(resultados => {
//     const operacionesEliminacion = resultados.map(resultado => {
//       const documentosDuplicados = resultado.duplicados.slice(1); // Excluir el primer documento (mantener uno de los duplicados)
//       return Movie.deleteMany({ _id: { $in: documentosDuplicados } }); // Devolver una promesa de eliminación
//     });
  
//     return Promise.all(operacionesEliminacion); // Esperar a que todas las operaciones de eliminación se completen
//   })
//   .then(resultadosEliminacion => {
//     resultadosEliminacion.forEach((resultado, index) => {
//       console.log(`Se eliminaron ${resultado.deletedCount} documentos duplicados del grupo ${index + 1}.`);
//     });
//   })
//   .catch(err => {
//     console.error('Error al encontrar o eliminar duplicados:', err);
//   });







  
function fetchPage(Arr, i) {

    if (i < Arr.length) { 
        const id = Arr[i];

        Movie.findById(id)
            .then((movie) => {
              const reviews = movie.reviews

              reviews.forEach((rev) => {
              rev.movie_id = movie.id
               Review.create({author: rev.author, content: rev.content, created_at: rev.created_at, movie_id: rev.movie_id, rating: rev.author_details.rating})
                      .then( () => {console.log(`created ${i} / ${Arr.length}`)})
                      })
              
            })
            .catch((err) => console.log(err))
            .finally(() => {
                i++;
                fetchPage(Arr, i); 
            });
    } else {
        console.log('Se han creado todas las películas.');
    }
}

  