import React from 'react';
import moment from 'moment';
import Route from '../lib/route';
import Money from './money.jsx';
import Segment from './segment.jsx';
import CarSharingInfo from './car_sharing_info.jsx';

const RouteCompact = React.createClass({
  /*
   * Inform the parent component that the route details need to be shown.
   */
  showDetails: function (clickEvent) {
    clickEvent.preventDefault();
    this.props.showDetails(true);
  },

  /*
   * Calculate the route's total duration by diffing the very first and the very
   * last stop.
   */
  calculateDuration: function (first_stop, last_stop) {
    const diff = last_stop.diff(first_stop, 'minutes');
    return (
      <span className="duration">
        {diff} min.
      </span>
    );
  },

  renderSegments: function (segments) {
    return segments.map(function (segment, index) {
      return (
        <li key={index}>
          <Segment {...segment} />
        </li>
      );
    });
  },
  
  /*
   * Render departure info for public transport routes.
   */
  renderDeparture: function (segments, search_datetime) {
    const first_stop = Route.firstPubTransStop(segments);
    return (
      <span className="departure">
        Departs in {first_stop.diff(search_datetime, 'minutes')} min.<br />
      </span>
    );
  },
  
  renderPrice: function (price) {
    return (price) ? (
      <Money amount={price.amount} currency={price.currency} />
    ) : '';
  },
  
  iconForProvider: function (provider) {
    return this.props.provider_attributes[provider].provider_icon_url;
  },

  render: function () {
    const first_stop = Route.firstStop(this.props.segments);
    const last_stop = Route.lastStop(this.props.segments);
    const price = this.props.price;
    const icon_style = {
      backgroundImage: 'url(' + this.iconForProvider(this.props.provider) + ')'
    };
    return (
      <div className={'compact_inner ' + (this.props.visible ? '' : 'hidden')}>
        <div className="route_times">
          <p>
            {first_stop.format('H:mm')} → {last_stop.format('H:mm')}<br />
            <span className="duration">
              {this.calculateDuration(first_stop, last_stop)}
            </span><br />
            <a className="show_details" onClick={this.showDetails}>+ show details</a>
          </p>
        </div>
        <ol className="segments">
          {this.renderSegments(this.props.segments)}
        </ol>
        <div className="more_info">
          <p>
            {this.renderPrice(this.props.price)}
            {(this.props.type === 'public_transport') ?
              this.renderDeparture(
                this.props.segments,
                this.props.search_datetime
              ) : ''}
            {(this.props.type === 'car_sharing') ? (
              <CarSharingInfo {...this.props.properties} />
            ) : ''}
          </p>
        </div>
        <div className="provider_icon_container">
          <span className={'provider_icon ' + this.props.provider} style={icon_style}></span>
        </div>
      </div>
    );
  }
});

export default RouteCompact;
