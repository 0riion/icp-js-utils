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
   * SeedAuth.isSeedEmpty(seed);
   * // => true
   */
  static isSeedEmpty(seed) {
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
   * SeedAuth.validateSeed(seed);
   * // => true
   */
  static validateSeed(seed) {
    if (seed.length && seed.length > 0 && seed.length < 32) {
      return true; // Valid seed length is between 1 and 32 characters
    }
    return false;
  }

  /**
   * Generates an Ed25519 key identity from a provided seed.
   *
   * This function throws an error if the seed is empty or invalid.
   *
   * @param {string} seed - The seed to use for generating the identity.
   * @returns {Ed25519KeyIdentity} - The generated Ed25519 key identity.
   * @memberof SeedAuth
   * @example
   * SeedAuth.seedToIdentity(seed);
   * // => Ed25519KeyIdentity
   */
  static seedToIdentity(seed) {
    const isValid = SeedAuth.validateSeed(seed);
    if (!isValid || SeedAuth.isSeedEmpty(seed)) throw new Error("Invalid seed");

    const seedBuffer = new Uint8Array(new ArrayBuffer(32));
    seedBuffer.set(new TextEncoder().encode(seed));
    return Ed25519KeyIdentity.generate(seedBuffer);
  }

  /**
   * Creates a new HTTP Agent instance.
   *
   * This function requires either a seed or an identity to be provided.
   * If seed is provided, it will be used to generate an identity using the `seedToIdentity` function.
   *
   * @param {object} options - Options for creating the agent.
   * @param {string} options.seed - The seed to use for generating the identity (optional).
   * @param {Ed25519KeyIdentity} options.identity - The Ed25519 key identity to use (optional).
   * @param {string} [options.host] - The hostname of the server to connect to (optional).
   * @returns {HttpAgent} - The newly created HttpAgent instance.
   * @memberof SeedAuth
   * @example
   * SeedAuth.create
   * // => HttpAgent
   */
  static async createAgent(options) {
    if (!options.seed && !options.identity)
      throw new Error("Seed or Identity is required");
    const { seed, identity } = options;

    if (seed) {
      const identity = SeedAuth.seedToIdentity(seed);
      const agent = new HttpAgent({ identity, host: options?.host });
      return agent;
    }

    const agent = new HttpAgent({ identity, host: options?.host });
    return agent;
  }
}

module.exports = SeedAuth;
