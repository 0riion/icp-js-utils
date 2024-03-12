const { HttpAgent } = require("@dfinity/agent");
const { Ed25519KeyIdentity } = require("@dfinity/identity");
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");
const bip39 = require("bip39");

/**
 * This class provides utility functions for authenticating using mnemonics.
 */
class MnemonicAuth {
  /**
   * Checks if the provided mnemonic is empty.
   *
   * @param {string} mnemonic - The mnemonic string to check.
   * @returns {boolean} True if the mnemonic is empty, false otherwise.
   */
  static isMnemonicEmpty(mnemonic) {
    return mnemonic.length === 0;
  }

  /**
   * Validates the provided mnemonic using bip39.
   *
   * @param {string} mnemonic - The mnemonic string to validate.
   * @returns {boolean} True if the mnemonic is valid, false otherwise.
   */
  static validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }

  /**
   * Converts a valid mnemonic to an Ed25519KeyIdentity.
   *
   * @param {string} mnemonic - The valid mnemonic string.
   * @throws {Error} If the mnemonic is invalid or empty.
   * @returns {Ed25519KeyIdentity} The generated Ed25519KeyIdentity.
   */
  static mnemonicToIdentity(mnemonic) {
    const isValid = MnemonicAuth.validateMnemonic(mnemonic);
    if (!isValid || MnemonicAuth.isMnemonicEmpty(mnemonic))
      throw new Error("Invalid mnemonic");
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return Ed25519KeyIdentity.generate(seed);
  }

  /**
   * Converts a valid mnemonic to a Secp256k1KeyIdentity.
   *
   * @param {string} mnemonic - The valid mnemonic string.
   * @throws {Error} If the mnemonic is invalid or empty.
   * @returns {Secp256k1KeyIdentity} The generated Secp256k1KeyIdentity.
   */
  static mnemonicToIdentitySecp256k1(mnemonic) {
    const isValid = MnemonicAuth.validateMnemonic(mnemonic);
    if (!isValid || MnemonicAuth.isMnemonicEmpty(mnemonic))
      throw new Error("Invalid mnemonic");

    return Secp256k1KeyIdentity.fromSeedPhrase(mnemonic);
  }

  /**
   * Creates a new HttpAgent instance using either a mnemonic or an identity.
   *
   * @param {object} options - Configuration object.
   * @param {string} options.mnemonic - The mnemonic string (optional).
   * @param {Ed25519KeyIdentity|Secp256k1KeyIdentity} options.identity - The identity object (optional).
   * @throws {Error} If neither mnemonic nor identity is provided.
   * @returns {HttpAgent} The created HttpAgent instance.
   */
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
