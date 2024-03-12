const { HttpAgent } = require("@dfinity/agent");
const { Ed25519KeyIdentity } = require("@dfinity/identity");
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");
const bip39 = require("bip39");

class MnemonicAuth {
  static isMnemonicEmpty(mnemonic) {
    return mnemonic.length === 0;
  }

  static validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  static mnemonicToIdentity(mnemonic) {
    const isValid = MnemonicAuth.validateMnemonic(mnemonic);
    if (!isValid || MnemonicAuth.isMnemonicEmpty(mnemonic))
      throw new Error("Invalid mnemonic");
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return Ed25519KeyIdentity.generate(seed);
  }

  static mnemonicToIdentitySecp256k1(mnemonic) {
    const isValid = MnemonicAuth.validateMnemonic(mnemonic);
    if (!isValid || MnemonicAuth.isMnemonicEmpty(mnemonic))
      throw new Error("Invalid mnemonic");

    return Secp256k1KeyIdentity.fromSeedPhrase(mnemonic);
  }

  static async createAgent({ mnemonic, identity }) {
    if (!mnemonic && !identity)
      throw new Error("Mnemonic or Identity is required");

    if (mnemonic) {
      identity = MnemonicAuth.mnemonicToIdentitySecp256k1(mnemonic);
    }

    const agent = new HttpAgent({ identity });
    return agent;
  }
}

module.exports = MnemonicAuth;
