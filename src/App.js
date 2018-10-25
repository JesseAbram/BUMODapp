import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BumoSDK from 'bumo-sdk';
import 'bulma/css/bulma.css';
import { handleFundAccount } from './utils.js'


const sdk = new BumoSDK({
  host: 'seed1.bumotest.io:26002',
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: null,
      privateKey: null,
      blob: null,
      nonce: null,
    }

    this.handleFundAccount = this.handleFundAccount.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleNonce = this.handleNonce.bind(this);
    this.convertToHex = this.convertToHex.bind(this);

  }

  convertToHex = (blob) => {
    const buffer = blob.split(',').map(e => Number(e))
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  handleAccountCreation = async (e) => {
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

  handleNonce = async (e) => {
    const accountInfo = await sdk.account.getNonce('buQgvdDfUjmK56K73ba8kqnE1d8azzCRYM9G');
    if (accountInfo.errorCode !== 0) {
      console.log(accountInfo);
      return;
    }
    let non = accountInfo.result.nonce;
    let nonce = parseInt(non.substring(0)) + 1;

    console.log(nonce);
    this.setState({ nonce: nonce})
  

  }
  

  handleFundAccount = async (e) => {

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





  handleSign = async (e) => {

    const blob = this.state.blob

    const signatureInfo = sdk.transaction.sign({
      privateKeys: ['privbtEELf99kKzMAPJU17ceYzz5d6y8Y5gbEKc7WySG9NRAEmGibkiG'],
      blob
    });


    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }

    const signature = signatureInfo.result.signatures;

    console.log(signature);


    try {
      const transactionInfo = await sdk.transaction.submit({
        blob,
        signature: signature,
      })

      if (transactionInfo.errorCode !== 0) {
        console.log("Error code not 0 ",transactionInfo);
      }
      console.log(transactionInfo);
    } catch (e) {
      console.log("Error ", e);
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
            onClick={() => this.handleNonce()}
          >
              Get Nonce
        </button>
        <p> Current Nonce = {this.state.nonce}</p>

          <button
            className="button is-primary"
            onClick={() => this.handleFundAccount()}
          >
            Preapre to Fund Account With 1 Test BU

        </button>
          <p>{this.state.blob}</p>


          <button
            className="button is-primary"
            onClick={() => this.handleSign()}
          >
            Fund Account With 1 Test BU
        </button>
          <button
            className="button is-primary"
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
