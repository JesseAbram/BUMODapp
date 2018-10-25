'use strict';

require('chai').should();
const BumoSDK = require('../index');

const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
});

describe('Test token.ctp10Token', function() {

  it('test token.ctp10Token.checkValid()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.checkValid(address);
    data.result.isValid.should.equal(true);
    address = 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uA';
    data = await sdk.token.ctp10Token.checkValid(address);
    data.errorCode.should.equal(11037)
  });


  it('test token.ctp10Token.getInfo()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.getInfo(address);
    console.log(data);
  });

  it('test token.ctp10Token.getName()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.getName(address);
    console.log(data);
  });

  it('test token.ctp10Token.getSymbol()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.getSymbol(address);
    console.log(data);
  });

  it('test token.ctp10Token.getDecimals()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.getDecimals(address);
    console.log(data);
  });

  it('test token.ctp10Token.getTotalSupply()', async() => {
    let address = 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz';
    let data = await sdk.token.ctp10Token.getTotalSupply(address);
    console.log(data);
  });

  it('test token.ctp10Token.getBalance()', async() => {
    let data = await sdk.token.ctp10Token.getBalance({
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      tokenOwner: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
    });
    data.errorCode.should.equal(0);

    data = await sdk.token.ctp10Token.getBalance({
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      tokenOwner: 'buQsuXPQojbZYMKzHXiMqVhH1HYsryzq1nJv',
    });
    data.errorCode.should.equal(11030);

    data = await sdk.token.ctp10Token.getBalance({
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgzA',
      tokenOwner: 'buQsuXPQojbZYMKzHXiMqVhH1HYsryzq1nJv',
    });
    data.errorCode.should.equal(11037);

    data = await sdk.token.ctp10Token.getBalance({
      contractAddress: '',
      tokenOwner: 'buQsuXPQojbZYMKzHXiMqVhH1HYsryzq1nJv',
    });
    data.errorCode.should.equal(11037);

    data = await sdk.token.ctp10Token.getBalance({
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      tokenOwner: 'buQsuXPQojbZYMKzHXiMqVhH1HYsryzq1nJvA',
    });
    data.errorCode.should.equal(11035);

  });

  it('test token.ctp10Token.allowance()', async() => {

    let data = await sdk.token.ctp10Token.allowance({
      contractAddress: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      tokenOwner: 'buQVkwAVz8VkEGKvX1zQerJj4q61fFdWGCgz',
      spender: 'buQemmMwmRQY1JkcU7w3nhruoX5N3j6C29uo',
    });
    console.log(data);
  });


});
