var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var PORT = 3000;
var STATIC_FILES = path.join(__dirname, 'client');
var MOCK_ROUTES_FILE = path.join(__dirname, 'routes.json');

function serveMockRoutes (request, response) {
  fs.readFile(MOCK_ROUTES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    response.json(JSON.parse(data));
  });
}

// Conditional redirect for the JS bundle (served by webpack-dev-server).
function redirectJsBundle (request, response, next) {
  if (request.path === '/js/bundle.js') {
    response.redirect('http://localhost:8080/assets/bundle.js');
  } else {
    next();
  }
}

// Define routes:
// 1) static files
// 2) js bundle
// 3) routes 'backend'
app.use('/', redirectJsBundle, express.static(STATIC_FILES));
app.get('/routes', serveMockRoutes);

// Start server
app.listen(PORT, function() {
  console.log('Please open http://localhost:' + PORT + '/ in your browser.');
});
