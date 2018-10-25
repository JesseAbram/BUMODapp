import BumoSDK from 'bumo-sdk';



const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
})


export const handleAccountCreation = async (e) => {

  this.refs.btn.setAttribute("disabled", "disabled");

  sdk.account.create().then(data => {
    console.log(data)
    var address = data.result.address;
    this.setState({address: JSON.stringify(address)})
    var privateKey = data.result.privateKey;
    this.setState({privateKey: JSON.stringify(privateKey)})
  }).catch(err => {
    console.log(err.message)
  });
}



export const handleFundAccount = async (e) => {
  
  const BumoSDK = require('bumo-sdk');
  
  const sdk = new BumoSDK({
    host: '192.168.33.10:36002',
  });
  
  
  const operationInfo = sdk.operation.buSendOperation({
    destAddress: 'buQoG5u7hiGPUxcbpoerjkvASAFbiZPStQ4Q',
    buAmount: '10',
    metadata:'746573742073656e64206275',
  });
  
  
  if (operationInfo.errorCode !== 0) {
    console.log(operationInfo);
    return;
  }
  
  
  const operationItem = operationInfo.result.operation;
  
  console.log(operationItem);
  
  const blobInfo = sdk.transaction.buildBlob({
    sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
    gasPrice: '10000',
    feeLimit: '30600000',
    nonce: '5',
    operations: [ operationItem ],
  
  });
  
  console.log(blobInfo.errorCode);
  
  if (blobInfo.errorCode !== 0) {
    console.log(blobInfo);
    return;
  }
  
  
  const blob = blobInfo.result.transactionBlob;
  
  console.log(blob);
  
  const signatureInfo = sdk.transaction.sign({
      privateKeys: [ 'privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG' ],
      blob,
    });
  
  
    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }
  
    const signature = signatureInfo.result.signatures;
  
    console.log(signature);
  
  
  
    const transactionInfo = sdk.transaction.submit({
       blob,
       signature: signature,
     }).then(info=> {
      console.log(info);
    }).catch(err => {
     console.log(err.message);
   });
  
  
     if (transactionInfo.errorCode !== 0) {
       console.log(transactionInfo);
     }
     console.log(transactionInfo);
  
    }
    