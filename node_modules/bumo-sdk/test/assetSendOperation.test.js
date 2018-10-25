'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test asset send operation', function() {

  it('test operation.assetSendOperation(args)', function() {
    let data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('operation');
    data.result.operation.should.be.a('object');
    data.result.operation.should.have.property('type').equal('payAsset');
    data.result.operation.should.have.property('data');

    // sourceAddress === destAddress
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11005);

    // Invalid sourceAddress
    data = sdk.operation.assetSendOperation({
      sourceAddress: '',
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11002);

    // sourceAddress is undefined
    data = sdk.operation.assetSendOperation({
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(0);

    // Invalid code
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: '',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11023);

    // Invalid assetAmount
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11024);

    // Invalid metadata
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
      metadata: '',
    });
    data.errorCode.should.equal(15028);

    // metadata is undefined
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      code: 'leo',
      issuer: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      assetAmount: '100',
    });
    data.errorCode.should.equal(0);
  });
});
