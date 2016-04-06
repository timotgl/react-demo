import React from 'react';
import RouteCompact from './route_compact.jsx';
import RouteDetails from './route_details.jsx';

const Route = React.createClass({
  getInitialState: function() {
    return {
      details: false
    };
  },

  /*
   * Toggle between 'compact' and 'details' view.
   */
  showDetails: function (isVisible) {
    this.setState({
      details: isVisible
    });
  },

  render: function () {
    const container_class = 'route_container ' +
      ((this.state.details) ? 'details ' : 'compact ') +
      ((this.props.visible) ? '' : 'hidden');
    return (
      <div className={container_class}>
        <RouteCompact
          {...this.props}
          showDetails={this.showDetails}
          visible={!this.state.details} />
        <RouteDetails
          {...this.props}
          showDetails={this.showDetails}
          visible={this.state.details} />
      </div>
    );
  }
});

export default Route;
