import React from 'react';
import Route from './route.jsx';

const Results = React.createClass({
  render: function () {
    const datetime = this.props.search_datetime;
    const attrs = this.props.provider_attributes;
    const routes = this.props.routes.map(function (route, index) {
      return (
        <li key={index} className="route">
          <Route
            {...route}
            search_datetime={datetime}
            provider_attributes={attrs} />
        </li>
      );
    });
    
    return (
      <ul className="results">
        {routes}
      </ul>
    );
  }
});

export default Results;
