import React from 'react';
import Route from '../lib/route';
import RouteStore from '../stores/route_store.js';
import Header from './header.jsx';
import RouteTypeFilters from './route_type_filters.jsx';
import Results from './results.jsx';

/*
 * Main controller-view for route search results.
 */
const RouteSearchResults = React.createClass({
  getInitialState: function() {
    return {
      routes: [], // All routes returned from backend API
      types: {}, // counted frequencies of distinct route types
      filters: new Map(), // state of route filter panel (which types are shown)
      provider_attributes: {}
    };
  },

  /*
   * Turn the filter for a given route type on or off.
   */
  toggleFilter: function (type, isChecked) {
    this.setState({
      filters: this.state.filters.set(type, isChecked),
      routes: Route.filterRoutes(this.state.routes, this.state.filters)
    });
  },

  /*
   * Listen for change events emitted by the RouteStore and pass the route data
   * down to other components.
   */
  componentDidMount: function () {
    RouteStore.onChange(function(data) {
      const filters = Route.initializeFilters(data.routes);
      this.setState({
        routes: Route.filterRoutes(data.routes, filters),
        types: Route.countRouteTypes(data.routes),
        filters: filters,
        provider_attributes: data.provider_attributes
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
      <Header
        origin={this.props.origin}
        destination={this.props.destination}
        num_routes={this.state.routes.length} />
      <RouteTypeFilters
        types={this.state.types}
        filters={this.state.filters}
        toggleFilter={this.toggleFilter} />
      <Results
        routes={this.state.routes}
        search_datetime={this.props.datetime}
        provider_attributes={this.state.provider_attributes} />
      </div>
    );
  }
});

export default RouteSearchResults;
