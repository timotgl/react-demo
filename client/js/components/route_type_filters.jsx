import React from 'react';
import FilterCheckbox from './filter_checkbox.jsx';

const RouteTypeFilters = React.createClass({
  /*
   * Show enabled route types with a checked checkbox, filtered out route types
   * with an unchecked checkbox.
   * filters = Map {'public_transport' => true}
   * types = {public_transport: 3, car_sharing: 2}
   */
  renderFilters: function (filters, types) {
    const toggle = this.props.toggleFilter;
    return Object.keys(types).map(function (type, index) {
      return (
        <li key={index}>
          <FilterCheckbox
            type={type}
            number={types[type]}
            checked={filters.get(type)}
            toggleFilter={toggle} />
        </li>
      );
    });
  },

  render: function () {
    return (
      <ul className="filters">
        {this.renderFilters(this.props.filters, this.props.types)}
      </ul>
    );
  }
});

export default RouteTypeFilters;
