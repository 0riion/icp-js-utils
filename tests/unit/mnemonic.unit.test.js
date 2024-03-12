const MnemonicAuth = require("../../src/mnemonic.auth.js");
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");

// https://iancoleman.io/bip39/
const VALID_MNEMONIC = "crazy world recipe sad gentle inject box aisle item tired glass merit dinosaur author gorilla";
const INVALID_MNEMONIC = "%$%#@";

describe("MnemonicAuth", () => {
  describe("mnemonicToIdentitySecp256k1", () => {
    it("should throw an error if the mnemonic is invalid", () => {
      expect(() =>
        MnemonicAuth.mnemonicToIdentitySecp256k1(INVALID_MNEMONIC)
      ).toThrow("Invalid mnemonic");
    });

    it("should throw an error if the mnemonic is empty", () => {
      const emptyMnemonic = "";
      expect(() =>
        MnemonicAuth.mnemonicToIdentitySecp256k1(emptyMnemonic)
      ).toThrow("Invalid mnemonic");
    });

    it("should return a Secp256k1KeyIdentity if the mnemonic is valid", () => {
      const identity = MnemonicAuth.mnemonicToIdentitySecp256k1(VALID_MNEMONIC);
      expect(identity).toBeInstanceOf(Secp256k1KeyIdentity);
    });
  });
});
