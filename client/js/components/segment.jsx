import React from 'react';

const Segment = React.createClass({
  render: function () {
    var style = {
      backgroundColor: this.props.color,
      backgroundImage: 'url(' + this.props.icon_url + ')'
    };
    return (
      <div className="segment" style={style}>
        <span className="segment_name">
          {(this.props.name === 'Cycling') ? 'Bike' : this.props.name}
        </span>
      </div>
    );
  }
});

export default Segment;
