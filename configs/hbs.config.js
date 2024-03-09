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

