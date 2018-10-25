'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test asset service', function() {

  it('test asset.getInfo()', async() => {
    let data = await sdk.token.asset.getInfo({
      address: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
      code: 'BTC',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('assets');
    data.result.assets.should.be.a('array');

    // empty argument
    data = await sdk.token.asset.getInfo();
    data.errorCode.should.equal(15016);

    // invalid address
    data = await sdk.token.asset.getInfo({
      address: '',
      code: 'BTC',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
    });
    data.errorCode.should.equal(11006);

    // invalid code
    data = await sdk.token.asset.getInfo({
      address: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
      code: '',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
    });
    data.errorCode.should.equal(11023);

    // invalid issuer address
    data = await sdk.token.asset.getInfo({
      address: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
      code: 'BTC',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkjeA',
    });
    data.errorCode.should.equal(11027);

    // BTCDEMO asset does not exist
    data = await sdk.token.asset.getInfo({
      address: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
      code: 'BTCDEMO',
      issuer: 'buQWESXjdgXSFFajEZfkwi5H4fuAyTGgzkje',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('assets');
    data.result.assets.should.have.lengthOf(0);
  });

});
