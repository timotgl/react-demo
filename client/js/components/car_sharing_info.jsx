import React from 'react';

/*
 * Render meta data of car_sharing routes.
 */
const CarSharingInfo = React.createClass({
  render: function () {
    return (
      <span className="car_sharing_info">
        {this.props.model} ({this.props.engine_type}) with license plate {this.props.license_plate}
      </span>
    );
  }
});

export default CarSharingInfo;
