import { test } from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import { IdentityContract } from "./identityContract.ts";

const secret = "test-secret";

test("IdentityContract.validate should pass with correct HMAC identity", () => {
  const domain = "test-domain";
  const identity = crypto.createHmac("sha256", secret).update(domain).digest("hex");
  const agent = { domain, identity };
  assert.doesNotThrow(() => IdentityContract.validate(agent, secret));
});

test("IdentityContract.validate should throw with incorrect identity", () => {
  const agent = { domain: "test-domain", identity: "wrong" };
  assert.throws(() => IdentityContract.validate(agent, secret), /Agent identity violation/);
});

test("IdentityContract.validate should throw with missing identity", () => {
  const agent = { domain: "test-domain" };
  assert.throws(() => IdentityContract.validate(agent, secret), /Agent identity violation/);
});

test("IdentityContract.validate is no longer vulnerable to simple spoofing", () => {
  const domain = "test-domain";
  // The old "kernel-compliant" string no longer works
  const maliciousAgent = { domain, identity: "kernel-compliant" };
  assert.throws(() => IdentityContract.validate(maliciousAgent, secret), /Agent identity violation/);
});
