// var bitcoin = require('bitcoinjs-lib');
import bitcoin from "bitcoinjs-lib";
import bip38 from "bip38";
import wif from "wif";

import storage from "./storage";

const KEY_PK = "wallet_PK";
const KEY_ADDRESS = "wallet_address";
const KEY_PASS = "wallet_pass";

class Wallet {
  init() {
    console.log("init wallet");

    storage.get(KEY_PK).then(pk => (this.pk = pk));
    storage.get(KEY_ADDRESS).then(addr => (this.address = addr));
    storage.get(KEY_PASS).then(pass => (this.pass = pass));
  }

  isHasWallet() {
    return new Promise(res => {
      if (this.isAuth) {
        res({
          login: true,
          storage: true
        });
      } else {
        storage.get(KEY_PK).then(enpk => {
          console.log(enpk);
          if (enpk) {
            res({
              login: false,
              storage: true
            });
          } else {
            res({
              login: false,
              storage: false
            });
          }
        });
      }
    });
  }

  create(pass) {
    const testnet = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

    this.pk = keyPair.toWIF();
    this.address = keyPair.getAddress();
    this.pass = pass;

    storage.set(KEY_PK, this.pk);
    storage.set(KEY_ADDRESS, this.address);
    storage.set(KEY_PASS, pass);

    storage.get(KEY_PK).then(pk => console.log("pk", pk));
    storage.get(KEY_PASS).then(pass => console.log("pass", pass));

    // console.log(testnet);
    // console.log(keyPair);
    // console.log(this.pk);
    // console.log(this.address);

    // let decoded = wif.decode(this.pk);

    // var encryptedKey = bip38.encrypt(
    //   decoded.privateKey,
    //   decoded.compressed,
    //   pass
    // );

    // console.log(encryptedKey);

    // var decryptedKey = bip38.decrypt(encryptedKey, pass, function(status) {
    //   //   console.log(status.percent); // will print the precent every time current increases by 1000
    // });

    // console.log(
    //   wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed)
    // );
  }

  auth(pass) {
    if (this.isAuth) {
      return true;
    }

    if (this.checkPass(pass)) {
      this.isAuth = true;
      return true;
    }

    return false;
  }

  checkPass(pass) {
    return this.pass == pass;
  }

  createTX({ to, amount, data }) {
    // SEND signed Tx
    console.log("create TX with: ", to, amount, data);
  }
}

const wallet = new Wallet();
export default wallet;
