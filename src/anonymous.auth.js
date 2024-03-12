const { AuthClient } = require("@dfinity/auth-client");
const { HttpAgent } = require("@dfinity/agent");

/**
 * A class for handling anonymous authentication with the Dfinity network.
 */
class AnonymousAuth {
  static async getAnonymousIdentity() {
    const authClient = await AuthClient.create();
    return authClient.getIdentity();
  }

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
