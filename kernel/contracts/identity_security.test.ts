import { test } from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import { IdentityContract } from "./identityContract.ts";
import { Kernel } from "../kernel.ts";
import { AgentClient } from "../../agent-sdk/client.ts";
import { StateMachine } from "../state/stateMachine.ts";

const secret = "super-secret-key";

test("IdentityContract.validate should pass with correct HMAC identity", () => {
  const domain = "test-domain";
  const identity = crypto.createHmac("sha256", secret).update(domain).digest("hex");
  const agent = { domain, identity };

  assert.doesNotThrow(() => IdentityContract.validate(agent, secret));
});

test("IdentityContract.validate should throw with incorrect identity (spoofing attempt)", () => {
  const agent = { domain: "test-domain", identity: "kernel-compliant" };
  assert.throws(() => IdentityContract.validate(agent, secret), /Agent identity violation/);
});

test("IdentityContract.validate should throw with wrong secret", () => {
  const domain = "test-domain";
  const identity = crypto.createHmac("sha256", secret).update(domain).digest("hex");
  const agent = { domain, identity };

  assert.throws(() => IdentityContract.validate(agent, "wrong-secret"), /Agent identity violation/);
});

test("Full integration flow with AgentClient and Kernel", async () => {
  const mockStateMachine = {
    ...StateMachine,
    computeConstraints: () => ({}),
    lookupAction: () => "none"
  };

  const kernel = new Kernel({
    identity: "test-kernel",
    secret: secret,
    objects: {},
    stateMachine: mockStateMachine,
    contracts: {
      identity: IdentityContract,
      routing: { validate: () => {} },
      object: { validate: () => {} }
    }
  });

  const client = new AgentClient(kernel);
  const agent = client.createAgent("secure-domain");

  // Should succeed
  const result = await agent.act("test-intent", {});
  assert.ok(result.state);

  // Manual spoofing attempt
  const spoofedAgent = {
    domain: "secure-domain",
    identity: "kernel-compliant",
    kernel: kernel,
    act: agent.act
  };

  await assert.rejects(
    async () => await kernel.route("test-intent", "secure-domain", spoofedAgent, {}),
    /Agent identity violation/
  );
});
