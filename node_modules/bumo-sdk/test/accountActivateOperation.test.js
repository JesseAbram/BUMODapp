'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test account activate operation', function() {

  it('test operation.accountActivateOperation()', function() {

    let data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '1000',
      metadata: 'Test Account Activate',
    });

    data.should.be.a('object');
    data.errorCode.should.equal(0);
    data.result.should.have.property('operation').be.a('object');
    data.result.operation.should.have.property('type');
    data.result.operation.should.have.property('data');
    data.result.operation.type.should.equal('activateAccount');

    // Invalid sourceAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: '',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11002);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: null,
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11002);

    // Invalid destAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: '',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11003);

    // sourceAddress === destAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11005);

    // Invalid initBalance
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: 1000,
    });
    data.errorCode.should.equal(11004);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '',
    });
    data.errorCode.should.equal(11004);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
    });
    data.errorCode.should.equal(11004);

    // Invalid metadata
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '1000',
      metadata: '',
    });
    data.errorCode.should.equal(15028);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      destAddress: 'buQVkUUBKpDKRmHYWw1MU8U7ngoQehno165i',
      initBalance: '1000',
      metadata: 123,
    });
    data.errorCode.should.equal(15028);

  });

});
