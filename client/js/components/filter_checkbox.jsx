import React from 'react';
import I18n from '../i18n/en_EN';

const FilterCheckbox = React.createClass({
  render: function () {
    return (
      <label className="filter">
        <input type="checkbox"
          name={this.props.type}
          checked={this.props.checked}
          onChange={this.handleChange} />
        {I18n[this.props.type]}
        <span className="type_frequency">
          ({this.props.number})
        </span>
      </label>
    );
  },

  /*
   * Transition between checked and unchecked states.
   * Call the parent RouteSearchResults so that it may reflect the change down
   * the chain of components.
   */
  handleChange: function (changeEvent) {
    const isChecked = changeEvent.target.checked;
    this.props.toggleFilter(this.props.type, isChecked);
  }
});

export default FilterCheckbox;
