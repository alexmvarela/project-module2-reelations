const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);


hbs.registerHelper('ifEq', function (left, right, options) {
    if (left === right) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  hbs.registerHelper('ifDec', function (left, right, options) {
    if (left !== right) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });


  const randomstring = require('randomstring');

  const generateRandomString = function (length) {
      return randomstring.generate({
        length: length || 8,  
        charset: 'alphabetic'
      });
  }


  hbs.registerHelper('ranStr', function (value, options) {
    return generateRandomString(value)
  })

  hbs.registerHelper('isBtwn', function (first, second , third, options) {
    if (first.toString() >= second.toString() && first.toString() <= third.toString()) {
      return true
    }
  });

  hbs.registerHelper('newGenre', function (id,  options) {

    switch (id) {
      case 28:
          return "Action";
      case 35:
          return "Comedy";
      case 80:
          return "Crime";
      case 99:
          return "Documentary";
      case 18:
          return "Drama";
      case 16:
          return "Animation";
      case 12:
          return "Adventure";
      case 36:
          return "History";
      case 9648:
          return "Mystery";
      case 10402:
          return "Music";
      case 27:
          return "Horror";
      case 10749:
          return "Romance";
      case 878:
          return "Science Fiction";
      case 10770:
          return "TV Movie";
      case 53:
          return "Thriller";
      case 37:
          return "Western";
      case 10752:
          return "War";
      case 10751:
          return "Family";
      case 14:
          return "Fantasy";
    }
  })

