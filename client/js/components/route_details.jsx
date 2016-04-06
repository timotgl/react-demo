import React from 'react';
import Route from '../lib/route';
import I18n from '../i18n/en_EN';
import Segment from './segment.jsx';
import StopList from './stop_list.jsx';

const RouteDetails = React.createClass({
  /*
   * Inform the parent component that the route details need to be hidden.
   */
  hideDetails: function (clickEvent) {
    clickEvent.preventDefault();
    this.props.showDetails(false);
  },

  renderSegments: function (segments) {
    return segments.map(function (segment, index) {
      return (
        <li key={index}>
          <Segment {...segment} />
          <div className="segment_meta">
            <span className="travel_mode">
              {I18n[segment.travel_mode]}
            </span>
            {(Route.isPublicTransport(segment.travel_mode)) ? (
              <span className="direction">
                {segment.name} → {segment.description}
              </span>
            ) : ''}
            <StopList stops={segment.stops} />
          </div>
        </li>
      );
    });
  },

  render: function () {
    return (
      <div className={'inner ' + (this.props.visible ? '' : 'hidden')}>
        <p>
          <a className="show_details" onClick={this.hideDetails}>
            - hide details
          </a>
        </p>
        <ol className="segments_full">
          {this.renderSegments(this.props.segments)}
        </ol>
      </div>
    );
  }
});

export default RouteDetails;
