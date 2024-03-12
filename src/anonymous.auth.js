const { AuthClient } = require("@dfinity/auth-client");
const { HttpAgent } = require("@dfinity/agent");

/**
 * A class for handling anonymous authentication with the Dfinity network.
 */
class AnonymousAuth {
  /**
   * Retrieves the anonymous identity associated with the current environment.
   *
   * This method utilizes the `AuthClient.getIdentity()` function to retrieve the anonymous identity.
   *
   * @returns {object} - The anonymous identity object.
   */
  static getAnonymousIdentity() {
    return AuthClient.getIdentity();
  }

  /**
   * Creates a new HTTP Agent instance for anonymous authentication.
   *
   * This function allows for providing an optional identity object in the `options` parameter.
   * If no identity is provided, the anonymous identity retrieved through `getAnonymousIdentity` will be used.
   *
   * @param {object} [options] - Optional configuration options for the agent.
   * @param {object} [options.identity] - The Ed25519 key identity to use (optional).
   * @param {string} [options.host] - The hostname of the server to connect to (optional).
   * @returns {HttpAgent} - The newly created HttpAgent instance.
   */
  static createAnonymousAgent(options = {}) {
    const authClient = AuthClient.create();

    const identity = options?.identity
      ? options.identity
      : authClient.getIdentity();

    const agent = new HttpAgent({ identity, host: options?.host });
    return agent;
  }
}

module.exports = AnonymousAuth;
