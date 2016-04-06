import React from 'react';

const Header = React.createClass({
  render: function () {
    return (
      <h1>
        {this.props.origin} → {this.props.destination}
      </h1>
    );
  }
});

export default Header;
