/*
 * app.js
 *
 * It all starts here. This is the script to run under node.  It configures 
 * and initializes the application, and starts the server.
 *
 */

/*
 * EXPRESS SERVER CONFIGURATION
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    clique = require('./src/main/public/js/dist/clique.js'); // Import the library for the analyzer

app.configure(function () {
  app.set('views', __dirname + '/src/main/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.register('.html', {
    compile: function (str, options) {
      return function (locals) {
        return str;
      };
    }
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'zombie devops feynman'
  }));
  app.use(app.router);
  app.use(express['static'](__dirname + '/src/main/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

/*
 * CONTROLLERS
 */

require('./src/main/controllers/analyzer-prep.js');
require('./src/main/controllers/interface-controller.js')(app);
require('./src/main/controllers/spec-controller.js')(app);
require('./src/test/qunit/test-suite-controller.js')(app);

/*
 * START THE SERVER
 */

app.listen(5700);
console.log('Express server listening on port %d in %s mode', 
    app.address().port, app.settings.env);
