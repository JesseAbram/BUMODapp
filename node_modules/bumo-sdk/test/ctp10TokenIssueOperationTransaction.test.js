'use strict';

require('chai').should();
const BigNumber = require('bignumber.js');
const co = require('co');

const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
  // host: '192.168.1.34:36002',
});

describe('Test ctp10Token Issue Transaction', function() {

  it('Test ctp10Token Issue Transaction ', function() {
    const privateKey = 'private key';
    const sourceAddress = 'buQhP94E8FjWDF3zfsxjqVQDeBypvzMrB3y3';

    co(function* () {
      const result = yield sdk.account.getNonce(sourceAddress);

      if (result.errorCode !== 0) {
        console.log(result);
        return;
      }
      let nonce = result.result.nonce;

      nonce = new BigNumber(nonce).plus(1).toString(10);

      let ctp10TokenIssueOperation = sdk.operation.ctp10TokenIssueOperation({
        initBalance: '2000000000',
        name: 'leo',
        symbol: 'LEO',
        decimals: 6,
        totalSupply: '50',
        sourceAddress,
        // metadata: '',
      });

      if (ctp10TokenIssueOperation.errorCode !== 0) {
        console.log(ctp10TokenIssueOperation);
        return;
      }

      const operationItem = ctp10TokenIssueOperation.result.operation;

      const args = {
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '100',
        // metadata: 'Test evaluation fee',
      };

      let feeData = yield sdk.transaction.evaluateFee(args);
      if (feeData.errorCode !== 0) {
        console.log(feeData);
        return;
      }

      let feeLimit = feeData.result.feeLimit;
      let gasPrice = feeData.result.gasPrice;

      // 2. build blob
      let blobInfo = sdk.transaction.buildBlob({
        sourceAddress: sourceAddress,
        gasPrice,
        feeLimit,
        nonce: nonce,
        operations: [ operationItem ],
      });

      if (blobInfo.errorCode !== 0) {
        console.log(blobInfo);
        return;
      }

      let blob = blobInfo.result.transactionBlob;

      // 3. sign blob
      let signatureInfo = sdk.transaction.sign({
        privateKeys: [ privateKey ],
        blob,
      });

      if (signatureInfo.errorCode !== 0) {
        console.log(signatureInfo);
        return;
      }

      let signature = signatureInfo.result.signatures;
      // 4. submit transaction
      let transactionInfo = yield sdk.transaction.submit({
        blob,
        signature: signature,
      });

      console.log(transactionInfo);

    }).catch(err => {
      console.log(err);
    });
  });

});
