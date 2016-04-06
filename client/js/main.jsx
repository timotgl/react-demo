import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import RouteStore from './stores/route_store.js';
import RouteSearchResults from './components/route_search_results.jsx';

/*
 * App entry point with mocked route search parameters. In a full-fledged app
 * there would be components like a search form hooked up to this.
 */
const origin = 'Torstraße 103, Berlin',
  destination = 'Potsdamer Platz, Berlin',
  datetime = moment('2015-04-17T12:29:00+01:00');

// Render main controller-view
ReactDOM.render(
  <RouteSearchResults
    origin={origin}
    destination={destination}
    datetime={datetime} />,
  document.getElementById('route_search_results')
);

// Perform search
RouteStore.search(origin, destination, datetime);
