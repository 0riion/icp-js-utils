/**
 * @class SeedAuth
 * @description Generate http agent to interact with ICP from a seed
 * @param {Object} options
 */

class SeedAuth {
  constructor(options) {
    this.options = options;
  }

  _validateSeed(seed) {
    if (seed.length === 0) return false;
    if (!seed.length || seed.length > 32) return false;
    return true;
  }

  _identityFromEmptySeed(seed) {
    // TODO: generate a new identity from an empty seed, as an anonymous principal 2vxsx-fae
  }

  static seedToIdentity(seed) {
    const isValid = this._validateSeed(seed);
    const seedBuffer = new Uint8Array(new ArrayBuffer(32));
  }
}

module.exports = SeedAuth;
