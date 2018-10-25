import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BumoSDK from 'bumo-sdk';
import 'bulma/css/bulma.css';
import { handleFundAccount } from './utils.js'



const sdk = new BumoSDK({
  host: '192.168.33.10:36002',
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: null,
      privateKey: null,
      blob: null,
      nonce: null,
      txHash: null
    }

    this.handleFundAccount = this.handleFundAccount.bind(this);
    this.convertToHex = this.convertToHex.bind(this);
    this.handleCreateAssest = this.handleCreateAssest.bind(this);
    this.AssestToHex = this.AssestToHex.bind(this);

  }

  convertToHex = (blob) => {
    const buffer = blob.split(',').map(e => Number(e))
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  AssestToHex = (blob) => {
    const buffer = blob.split(',').map(e => Number(e))
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  handleAccountCreation = async (e) => {
    this.refs.btn.setAttribute("disabled", "disabled");

    sdk.account.create().then(data => {
      console.log(data)
      var address = data.result.address;
      this.setState({ address: address })
      var privateKey = data.result.privateKey;
      this.setState({ privateKey: privateKey })
    }).catch(err => {
      console.log(err.message)
    });
  }



  handleFundAccount = async (e) => {




    const operationInfo = sdk.operation.buSendOperation({
      destAddress: this.state.address,
      buAmount: '10000000', //write about
      metadata: '746573742073656e64206275',
    });


    if (operationInfo.errorCode !== 0) {
      console.log(operationInfo);
      return;
    }


    const operationItem = operationInfo.result.operation;

    console.log(operationItem);

    const accountInfo = await sdk.account.getNonce('buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G');
    if (accountInfo.errorCode !== 0) {
      console.log(accountInfo);
      return;
    }
    let non = accountInfo.result.nonce;
    let nonc = parseInt(non.substring(0)) + 1;
    let nonce = String(nonc);

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
    const blobHexFormat = await this.convertToHex(blob)
    this.setState({ blob: blobHexFormat })

    const signatureInfo = sdk.transaction.sign({
      privateKeys: ['privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG'],
      blob: blobHexFormat,
    });


    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }

    const signature = signatureInfo.result.signatures;

    console.log(signature);



    const transactionInfo = sdk.transaction.submit({
      blob: blobHexFormat,
      signature: signature,
    }).then(transactionInfo => {
      console.log(transactionInfo)
      var txHash = transactionInfo.result.hash;
      this.setState({ txHash: txHash })
    }).catch(err => {
      console.log(err.message)
    });



    this.refs.btn2.setAttribute("disabled", "disabled");


  }

  handleCreateAssest = async (e) => {


    const atp10TokenMetadata = {
      version: '1.0',
      name: 'Test',
      nowSupply: '0',
      decimals: '1',
      description: 'testing',
    };


    const operationInfo = sdk.operation.assetIssueOperation({
      sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
      code: atp10TokenMetadata.name,
      assetAmount: '10000',
      metadata: "atp10TokenMetadata",
    });


    if (operationInfo.errorCode !== 0) {
      console.log(operationInfo);
      return;
    }


    const operationItem = operationInfo.result.operation;

    console.log(operationItem);
    
    const accountInfo = await sdk.account.getNonce('buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G');
    if (accountInfo.errorCode !== 0) {
      console.log(accountInfo);
      return;
    }
    let non = accountInfo.result.nonce;
    let nonc = parseInt(non.substring(0)) + 1;
    let nonce = String(nonc);

    console.log(nonce);

    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: 'buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G',
      gasPrice: '1000',
      feeLimit: '50002120000',
      nonce,
      operations: [operationItem],


    });

    console.log(blobInfo.errorCode);

    if (blobInfo.errorCode !== 0) {
      console.log(blobInfo);
      return;
    }


    const blob = blobInfo.result.transactionBlob;
    const AssetHexFormat = await this.convertToHex(blob)


    console.log(blob);

    let signatureInfo = sdk.transaction.sign({
      privateKeys: ['privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG'],
      blob: AssetHexFormat,
    });


    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }

    const signature = signatureInfo.result.signatures;

    console.log(signature);



    const transactionInfo = sdk.transaction.submit({
      blob: AssetHexFormat,
      signature: signature,
    }).then(info => {
      console.log(info);
    }).catch(err => {
      console.log(err.message);
    });


    if (transactionInfo.errorCode !== 0) {
      console.log(transactionInfo);
    }

  }






  render() {
    return (
      <div className="App">
        <header className="App-header"
        >
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Click Button To create private public keys.
          </p>
          <p>Your Address = {this.state.address} </p>
          <p>Your Private Key = {this.state.privateKey}</p>

          <button
            className="button is-primary"
            onClick={() => this.handleAccountCreation()}
            ref="btn">
            Create Account
        </button>


          <button
            className="button is-primary"
            onClick={() => this.handleFundAccount()}
            ref="btn2"
          >
            Fund Account
        </button>
          <p>{this.state.transactionInfo}</p>

          <button
            className="button is-primary"
            onClick={() => this.handleCreateAssest()}
          >
            Create Assest
        </button>
          <button
            className="button is-primary"
          >
            Check Balance
        </button>
        </header>
      </div>
    );
  }
}

export default App;




//privbxcr3H9WbfZwpmB7nVFdPinJFS22i7ifM7z5ikGxQKJWkxnze2Q1
