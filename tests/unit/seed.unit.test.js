const { HttpAgent } = require("@dfinity/agent");
const { Ed25519KeyIdentity } = require("@dfinity/identity");
const SeedAuth = require("../../src/seed.auth.js");

describe("SeedAuth", () => {
  test("_isSeedEmpty", () => {
    const seed = "";
    expect(SeedAuth.isSeedEmpty(seed)).toBe(true);
  });

  test("validateSeed empty seed", () => {
    const seed = "";
    expect(SeedAuth.validateSeed(seed)).toBe(false);
  });

  test("validateSeed more than 32 characters", () => {
    const seed = "a".repeat(33);
    expect(SeedAuth.validateSeed(seed)).toBe(false);
  });

  test("validateSeed valid seed", () => {
    const seed = "a".repeat(32);
    expect(SeedAuth.validateSeed(seed)).toBe(true);
  }, 1000);

  test("seedToIdentity empty seed", () => {
    const seed = "";
    expect(() => SeedAuth.seedToIdentity(seed)).toThrow("Invalid seed");
  });

  test("seedToIdentity more than 32 characters", () => {
    const seed = "a".repeat(33);
    expect(() => SeedAuth.seedToIdentity(seed)).toThrow("Invalid seed");
  });

  test("seedToIdentity valid seed", () => {
    const seed = "a".repeat(32);
    const identity = SeedAuth.seedToIdentity(seed);
    expect(identity).toBeInstanceOf(Ed25519KeyIdentity);
  });

  test("createAgent no seed or identity", async () => {
    expect(() => SeedAuth.createAgent({})).toThrow(
      "Seed or Identity is required"
    );
  });

  test("createAgent seed", async () => {
    const agent = SeedAuth.createAgent({ seed: "valid-seed" });
    expect(agent).toBeInstanceOf(HttpAgent);
  });

  test("createAgent identity", async () => {
    const seed = "valid-seed";
    const seedBuffer = new Uint8Array(new ArrayBuffer(32));
    seedBuffer.set(new TextEncoder().encode(seed));
    const identity = Ed25519KeyIdentity.generate(seedBuffer);
    const agent = SeedAuth.createAgent({ identity });
    expect(agent).toBeInstanceOf(HttpAgent);
  });
});
