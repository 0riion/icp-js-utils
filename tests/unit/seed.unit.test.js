const { HttpAgent } = require("@dfinity/agent");
const { Ed25519KeyIdentity } = require("@dfinity/identity");
const SeedAuth = require("../../src/seed.auth.js");

describe("SeedAuth", () => {
  test("_isSeedEmpty", () => {
    const seed = "";
    const seedAuth = new SeedAuth();
    expect(seedAuth._isSeedEmpty(seed)).toBe(true);
  });

  test("_validateSeed empty seed", () => {
    const seed = "";
    const seedAuth = new SeedAuth();
    expect(seedAuth._validateSeed(seed)).toBe(false);
  });

  test("_validateSeed more than 32 characters", () => {
    const seed = "a".repeat(33);
    const seedAuth = new SeedAuth();
    expect(seedAuth._validateSeed(seed)).toBe(false);
  });

  test("_validateSeed valid seed", () => {
    const seed = "a".repeat(32);
    const seedAuth = new SeedAuth();
    expect(seedAuth._validateSeed(seed)).toBe(true);
  }, 1000);

  test("seedToIdentity empty seed", () => {
    const seed = "";
    const seedAuth = new SeedAuth();
    expect(() => seedAuth.seedToIdentity(seed)).toThrow("Invalid seed");
  });

  test("seedToIdentity more than 32 characters", () => {
    const seed = "a".repeat(33);
    const seedAuth = new SeedAuth();
    expect(() => seedAuth.seedToIdentity(seed)).toThrow("Invalid seed");
  });

  test("seedToIdentity valid seed", () => {
    const seed = "a".repeat(32);
    const seedAuth = new SeedAuth();
    const identity = seedAuth.seedToIdentity(seed);
    expect(identity).toBeInstanceOf(Ed25519KeyIdentity);
  });

  test("createAgent no seed or identity", async () => {
    const seedAuth = new SeedAuth();
    await expect(seedAuth.createAgent({})).rejects.toThrow(
      "Seed or Identity is required"
    );
  });

  test("createAgent seed", async () => {
    const seedAuth = new SeedAuth();
    const agent = await seedAuth.createAgent({ seed: "valid-seed" });
    expect(agent).toBeInstanceOf(HttpAgent);
  });

  test("createAgent identity", async () => {
    const seedAuth = new SeedAuth();
    const identity = new Ed25519KeyIdentity();
    const agent = await seedAuth.createAgent({ identity });
    expect(agent).toBeInstanceOf(HttpAgent);
  });
});
