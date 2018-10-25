'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test contract create operation', function() {

  it('test operation.contractCreateOperation()', function() {

    let contractCreateOperation = sdk.operation.contractCreateOperation({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      initBalance: '1000',
      type: 0,
      payload: 'afasfsaff',
      initInput: 'aaaaa',
      metadata: 'Test contract create operation',
    });

    if (contractCreateOperation.errorCode !== 0) {
      console.log(contractCreateOperation);
      return;
    }

    const operationItem = contractCreateOperation.result.operation;

    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: 'buQsBMbFNH3NRJBbFRCPWDzjx7RqRc1hhvn1',
      gasPrice: '1000',
      feeLimit: '1000000',
      nonce: '123',
      operations: [ operationItem ],
    });

    console.log(blobInfo);
  });

});
