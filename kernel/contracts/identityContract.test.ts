import test from "node:test";
import assert from "node:assert";
import { IdentityContract } from "./identityContract.ts";

test("IdentityContract.validate", async (t) => {
  await t.test("should pass for kernel-compliant agent", () => {
    const agent = { identity: "kernel-compliant" };
    assert.doesNotThrow(() => {
      IdentityContract.validate(agent);
    });
  });

  await t.test("should throw for missing identity", () => {
    const agent = {};
    assert.throws(() => {
      IdentityContract.validate(agent);
    }, /Agent identity violation/);
  });

  await t.test("should throw for invalid identity", () => {
    const agent = { identity: "not-compliant" };
    assert.throws(() => {
      IdentityContract.validate(agent);
    }, /Agent identity violation/);
  });

  await t.test("should throw for null identity", () => {
    const agent = { identity: null };
    assert.throws(() => {
      IdentityContract.validate(agent);
    }, /Agent identity violation/);
  });
});
