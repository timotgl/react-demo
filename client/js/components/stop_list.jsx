import React from 'react';
import moment from 'moment';

const StopList = React.createClass({
  render: function () {
    return (
      <ol className="stop_list">
        {this.props.stops.map(function (stop, index) {
          return (
            <li key={index}>
              {moment(stop.datetime).format('H:mm')} &nbsp;
              <span className="stop_name">
                {stop.name || 'Current location'}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
});

export default StopList;
