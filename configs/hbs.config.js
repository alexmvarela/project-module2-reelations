const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);


hbs.registerHelper('ifEq', function (left, right, options) {
    if (left === right) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });