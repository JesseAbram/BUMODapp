'use strict';

require('chai').should();
const BigNumber = require('bignumber.js');
const co = require('co');

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
  // host: '192.168.1.34:36002',
});

describe('Test ctp10Token Issue Operation', function() {

  it('Test ctp10Token Issue Operation ', function() {
    let data = sdk.operation.ctp10TokenIssueOperation({
      initBalance: '10000000',
      name: 'leo',
      symbol: 'LEO',
      decimals: 6,
      totalSupply: '30',
      sourceAddress: 'buQhP94E8FjWDF3zfsxjqVQDeBypvzMrB3y3',
      // metadata: '',
    });
    data.errorCode.should.equal(0);

    data = sdk.operation.ctp10TokenIssueOperation({
      initBalance: '10000000a',
      name: 'leo',
      symbol: 'LEO',
      decimals: 6,
      totalSupply: '30',
      sourceAddress: 'buQhP94E8FjWDF3zfsxjqVQDeBypvzMrB3y3',
      metadata: '',
    });
    data.errorCode.should.equal(11004);
  });

});
