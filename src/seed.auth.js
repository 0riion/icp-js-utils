const { HttpAgent } = require("@dfinity/agent");
const { Ed25519KeyIdentity } = require("@dfinity/identity");

/**
 * @class SeedAuth
 * @description Generate http agent to interact with ICP from a seed
 * @param {Object} options
 */

class SeedAuth {
  constructor(options) {
    this.options = options;
  }

  /**
   * Checks if the seed is empty.
   * @param {string} seed Seed to check
   * @returns {boolean} True if the seed is empty, false otherwise.
   * @private
   * @memberof SeedAuth
   * @example
   * SeedAuth._isSeedEmpty(seed);
   * // => true
   * */
  _isSeedEmpty(seed) {
    return seed.length === 0;
  }

  /**
   * Validates the provided seed.
   *
   * @param {string} seed Seed to validate
   * @returns {boolean} True if the seed is valid, false otherwise.
   * @private
   * @memberof SeedAuth
   * @example
   * SeedAuth._validateSeed(seed);
   * // => true
   */
  _validateSeed(seed) {
    if (seed.length && seed.length > 0 && seed.length < 32) return true;
    return false;
  }

  _identityFromEmptySeed(seed) {
    // TODO: generate a new identity from an empty seed, as an anonymous principal 2vxsx-fae
  }

  static seedToIdentity(seed) {
    if (this._isSeedEmpty(seed)) return this._identityFromEmptySeed(seed);

    const isValid = this._validateSeed(seed);
    if (!isValid) throw new Error("Invalid seed");

    const seedBuffer = new Uint8Array(new ArrayBuffer(32));
    seedBuffer.set(new TextEncoder().encode(seed));
    return Ed25519KeyIdentity.generate(seedBuffer);
  }

  static async createAgent(options) {
    if (!options.seed || !options.identity)
      throw new Error("Seed or Identity is required");
    const { seed, identity } = options;

    if (seed) {
      const identity = SeedAuth.seedToIdentity(seed);
      const agent = new HttpAgent({ identity, host: options?.host });
      return agent;
    }

    return agent;
  }
}

module.exports = SeedAuth;
