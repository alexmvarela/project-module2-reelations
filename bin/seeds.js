
require('dotenv/config');
require('../configs/db.config');

const Movie = require('../models/movies.model')
const Genre = require('../models/genre.model')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgzMjMzYmI5YWQ0OThiZTZjOTYwNWU4OWU3MjU0YiIsInN1YiI6IjY1ZTc2MTZiMzFkMDliMDE3ZGUzMTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VqyuyEvW2r3JaqHTZs4ebw0E0fyaV-pZIHegl3zbIXw'
  }
};


function findMovies() {
    Movie.find({lang: "ES"}, 'id')
        .then(movies => {
            const movieIds = movies.map(movie => movie.id);
            fetchPage(movieIds);
        })
        .catch(error => {
            console.error('Error al buscar películas:', error);
        })
}
 

let i = 0;
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

function fetchPage(Arr) {
    if (i < Arr.length) { // Comprobación de límites del índice
        const id = Arr[i];

                    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits`
                    return fetch(castUrl, options)
                            .then(response => response.json())
                            .then((cast) => {

                                const filteredCrew = cast.crew.filter(member => member.job === "Director");

                                const filter = { 'id': id };
                                const update = { $set: { crew: filteredCrew } }; 
            
                                return Movie.updateMany(filter, update)
                                    .then(() => {
                                        console.log(`${i}/${Arr.length}`);
                                    });
                            })                                             
                            .catch(err => console.error('Error en la solicitud:', err))
                            .finally(() => {
                                i++;
                                fetchPage(Arr); 
                            });
    } else {
        console.log('Se han creado todas las películas.');
    }
}
// findMovies()

// Identificar y eliminar los documentos duplicados
Movie.aggregate([
    {
      $group: {
        _id: { overview: '$overview' }, // Agrupar por el campo que puede tener duplicados
        duplicados: { $addToSet: '$_id' }, // Almacenar los IDs de los documentos duplicados
        count: { $sum: 1 } // Contar cuántos documentos hay en cada grupo
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Filtrar los grupos que tienen más de un documento (es decir, duplicados)
      }
    }
  ]).exec()
  .then(resultados => {
    const operacionesEliminacion = resultados.map(resultado => {
      const documentosDuplicados = resultado.duplicados.slice(1); // Excluir el primer documento (mantener uno de los duplicados)
      return Movie.deleteMany({ _id: { $in: documentosDuplicados } }); // Devolver una promesa de eliminación
    });
  
    return Promise.all(operacionesEliminacion); // Esperar a que todas las operaciones de eliminación se completen
  })
  .then(resultadosEliminacion => {
    resultadosEliminacion.forEach((resultado, index) => {
      console.log(`Se eliminaron ${resultado.deletedCount} documentos duplicados del grupo ${index + 1}.`);
    });
  })
  .catch(err => {
    console.error('Error al encontrar o eliminar duplicados:', err);
  });