import $ from 'jquery';

/*
 * RouteStore singleton. Wraps around $.ajax to talk to the backend API and
 * implements sort of a poor man's pub-sub.
 */
 const RouteStore = {
  _listeners: [],
  
  /*
   * Perform a search for routes from origin to destination at a given datetime.
   */
  search: function (origin, destination, datetime) {
    // At this point we would normally talk to the backend with a URL like
    // /routes?from={origin}&to={destination}&dt={datetime}
    $.ajax({
      url: '/routes',
      dataType: 'json',
      success: this._emitChange.bind(this),
      error: this._handleError.bind(this)
    });  
  },
  
  /*
   * Register a callback function to be called when this store has new routes.
   */
  onChange: function(callback) {
    this._listeners.push(callback);
  },
  
  /*
   * Accept API response with route data and call all registered callbacks.
   */
  _emitChange: function (data, textStatus, jqXHR) {
    this._listeners.forEach(function (callback) {
      callback(data);
    });
  },

  _handleError: function (jqXHR, textStatus, errorThrown) {
    console.error(textStatus, errorThrown.toString());
  },
};

export default RouteStore;
