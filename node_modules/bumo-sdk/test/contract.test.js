'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test bumo-sdk contract service', function() {

  it('test contract.getInfo()', async() => {
    let data = await sdk.contract.getInfo('buQqbhTrfAqZtiX79zp4MWwUVfpcadvtz2TM');
    data.errorCode.should.equal(0);
    data = await sdk.contract.getInfo('buQi5DrUSze4RLAM4oh51oDVnwwHFUrvW4sP');
    data.errorCode.should.equal(11038);
    data = await sdk.contract.getInfo('buQi5DrUSze4RLAM4oh51oDVnwwHFUrvW4sPA');
    data.errorCode.should.equal(11006);

    data = await sdk.contract.getInfo('buQhP94E8FjWDF3zfsxjqVQDeBypvzMrB3y3');
    data.errorCode.should.equal(11038);

  });

  it('test contract.checkValid()', async() => {

    let data = await sdk.contract.checkValid('buQhP94E8FjWDF3zfsxjqVQDeBypvzMrB3y3');
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.isValid.should.equal(false);

    data = await sdk.contract.checkValid('buQqbhTrfAqZtiX79zp4MWwUVfpcadvtz2TM');
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.isValid.should.equal(true);

    data = await sdk.contract.checkValid('buQqbhTrfAqZtiX79zp4MWwUVfpcadvtz2TMA');
    data.errorCode.should.equal(11037);
  });

  it('test contract.getAddress()', async() => {
    let hash = 'f298d08ec3987adc3aeef73e81cbb49cbad2316145ba190700de2d78657880c0';
    // hash = 'buQqbhTrfAqZtiX79zp4MWwUVfpcadvtz2TMA';
    let data = await sdk.contract.getAddress(hash);
    console.log(data);
    console.log(JSON.stringify(data))
  });

  it('test contract.call()', async() => {

    let data = await sdk.contract.call({
      optType: 2,
      // code: 'leo'
      // contractAddress: 'buQVyqx5hnPPpuPdN5awWzkdaD1wKtczst8G',
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      input: JSON.stringify({
        // method: 'contractInfo',
        method: 'name',
      }),
    });
    console.log(JSON.stringify(data));
  });

});
