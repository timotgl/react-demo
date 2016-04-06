jest.unmock('../client/js/components/Money.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Money from '../client/js/components/Money.jsx';

describe('Money', () => {
  it('formats amount and currency', () => {
    const money = TestUtils.renderIntoDocument(
      <Money amount={1234} currency="EUR" />
    );
    const moneyNode = ReactDOM.findDOMNode(money);
    expect(moneyNode.textContent).toEqual('12.34 €');
  });
});
