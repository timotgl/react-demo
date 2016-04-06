import moment from 'moment';

/*
 * 'Static' methods specific to a route and related date/time calculations.
 */
const Route = {
  // obviously incomplete list of transport_modes for public_transport routes.
  _pt_travel_modes: new Set(['bus', 'subway']),

  isPublicTransport: function (travel_mode) {
    return this._pt_travel_modes.has(travel_mode);
  },

  /*
   * Convert datetime strings into moment.js objects.
   */
  firstStop: function (segments) {
    return moment(segments[0].stops[0].datetime);
  },

  lastStop: function (segments) {
    const last_segment = segments[segments.length - 1];
    return moment(last_segment.stops[last_segment.stops.length - 1].datetime);
  },

  /*
   * Find the first 'real' stop in the segments of a public_transport route.
   * This skips the first 'walking' segment and fast-forwards to one with
   * travel_mode being one of ('subway', 'bus', etc.).
   */
  firstPubTransStop: function (segments) {
    const segment = segments.find(
      (segment) => this.isPublicTransport(segment.travel_mode)
    );
    return moment(segment.stops[0].datetime);
  },
  
  /*
   * Count the types of all routes and return an object with frequencies.
   * Example: {'public_transport': 3, 'car_sharing': 2}
   */
  countRouteTypes: function (routes) {
    const reducer = function (filters, route) {
      let t = route.type;
      (filters[t]) ? filters[t] += 1 : filters[t] = 1;
      return filters;
    };
    return routes.reduce(reducer, {});
  },

  /*
   * Set the initial state of the filter panel: Every route type is enabled.
   * Example: Map {"public_transport" => true, "car_sharing" => true}
   */
  initializeFilters: function (routes) {
    const types = new Set(routes.map((route) => route.type)); // unique types
    return new Map(Array.from(types).map((type) => [type, true]));
  },
  
  /*
   * Return only the routes of enabled types, as chosen in the filter panel.
   * Example: if filters = Map {"type1" => true, "type2" => false} then
   * we only return routes where route.type === 'type1'.
   */
  filterRoutes: function (routes, filters) {
    return routes.map(function (route) {
      route.visible = filters.get(route.type);
      return route;
    });
  },
};

export default Route;
