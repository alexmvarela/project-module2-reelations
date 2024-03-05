const fetch = require('node-fetch');


//trending

module.exports.trending = (req, res, next) => {
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgzMjMzYmI5YWQ0OThiZTZjOTYwNWU4OWU3MjU0YiIsInN1YiI6IjY1ZTc2MTZiMzFkMDliMDE3ZGUzMTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VqyuyEvW2r3JaqHTZs4ebw0E0fyaV-pZIHegl3zbIXw'
    }
    };

    fetch(url, options)
  .then(res => res.json())
  .then(json => {
    res.render('home', {json})
  })
  .catch(err => console.error('error:' + err));
}
