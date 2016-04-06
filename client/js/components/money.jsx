import React from 'react';

const CurrencySymbols = {
  'EUR': '€'
};

/*
 * Render an amount of money in a given currency. Expects the props
 * 'amount' (int) in cents and 'currency' (string id for symbol).
 */
const Money = React.createClass({
  render: function () {
    return (
      <span className="money">
        {(this.props.amount/100).toFixed(2)} {CurrencySymbols[this.props.currency]}
      </span>
    );
  }
});

export default Money;
