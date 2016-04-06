# React demo project using JSX and ES6 (Babel)
This project was created as solution of a technical assignment, but any proprietary data has been removed in its current state. It is meant to demonstrate the usage of React, JSX, ES6 and Babel but doesn't run on its own.

### How to run
1. Have a relatively recent [Node.js](https://nodejs.org/) version. This project was tested with node v5.7.1 and npm v.3.6.0.
2. Do `npm install` and start the server with `npm start`.
3. Open a browser and go to [http://localhost:3000/](http://localhost:3000/). Note that the first launch takes a bit longer, due to `webpack` and `lessc` creating `bundle.css` and `bundle.js` from scratch.

### How to run tests
`npm test`

### For developers
* When using `npm start` to launch the server, editing less/js/jsx files triggers `lessc` and `webpack` to rebuild the bundles. Simply refresh your browser to get the changes.
* Recompile JS bundle once: `webpack`
* Recompile CSS bundle once: `npm run-script css`

### Approach
The project is a single page app built with ES6 and React. Inspired by the Flux architecture pattern, there is a Route store that emits change events (routes fetched via AJAX) and the controller-view listens to them and updates its child components accordingly.

I used Babel to transpile ES2015 and JSX into ES5 and webpack to bundle everything together. The test framework is Jest, in order to easily test React components. The simple dev webserver uses Express, it doesn't do much more than returning the content of `routes.json`, static files, and redirecting the JS bundle to `webpack-dev-server`. For date and time calculation I used moment.js.
