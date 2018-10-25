'use strict';

require('chai').should();
const BumoSDK = require('../index');


const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bu send operation', function() {

  it('test operation.buSendOperation()', function() {
    let data = sdk.operation.buSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
      buAmount: '6000',
      metadata: 'oh my send bu',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('operation');
    data.result.operation.should.be.a('object');
    data.result.operation.should.have.property('type').equal('payCoin');
    data.result.operation.should.have.property('data');

    // Invalid sourceAddress
    data = sdk.operation.buSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1A',
      destAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
      buAmount: '6000',
      metadata: 'oh my send bu',
    });
    data.errorCode.should.equal(11002);

    data = sdk.operation.buSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVqA',
      buAmount: '6000',
      metadata: 'oh my send bu',
    });
    data.errorCode.should.equal(11003);

    // Invalid buAmount
    data = sdk.operation.buSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
      buAmount: '6000A',
      metadata: 'oh my send bu',
    });
    data.errorCode.should.equal(11026);

    // Invalid metadata
    data = sdk.operation.buSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQtGi7QmaiaMDygKxMAsKPyLicYjPV2xKVq',
      buAmount: '6000',
      metadata: '',
    });

    data.errorCode.should.equal(15028);
  });

});
