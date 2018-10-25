import BumoSDK from 'bumo-sdk';



const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
})


export const handleAccountCreation = async (e) => {
  this.refs.btn.setAttribute("disabled", "disabled");

  sdk.account.create().then(data => {
    console.log(data)
    var address = data.result.address;
    this.setState({ address: JSON.stringify(address) })
    var privateKey = data.result.privateKey;
    this.setState({ privateKey: JSON.stringify(privateKey) })
  }).catch(err => {
    console.log(err.message)
  });
}




export const  handleFundAccount = async (e) => {

  const BumoSDK = require('bumo-sdk');

  const sdk = new BumoSDK({
    host: 'seed1.bumotest.io:26002',
  });



  const operationInfo = sdk.operation.buSendOperation({
    destAddress: 'buQnVFqm1LPjPbip5SLBBG6Ke96qmVs4zBw7',
    buAmount: '100000000', //write about
    metadata: '746573742073656e64206275',
  });


  if (operationInfo.errorCode !== 0) {
    console.log(operationInfo);
    return;
  }


  const operationItem = operationInfo.result.operation;

  console.log(operationItem);
 
  const nonce = String(this.state.nonce)
  console.log(nonce);

  const blobInfo = sdk.transaction.buildBlob({
    sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
    gasPrice: '1000',
    feeLimit: '306000',
    nonce,
    operations: [operationItem],

  });

  console.log(blobInfo.errorCode);

  if (blobInfo.errorCode !== 0) {
    console.log(blobInfo.toString());
    return;
  }



  const blob = blobInfo.result.transactionBlob;
  console.log(blob);
  const blobHexFormat = this.convertToHex(blob)
  this.setState({ blob: blobHexFormat })

    


}
