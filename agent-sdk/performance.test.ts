
import { Kernel } from "../kernel/kernel.ts";
import { StateMachine } from "../kernel/state/stateMachine.ts";
import { IdentityContract } from "../kernel/contracts/identityContract.ts";
import { Agent } from "./agent.ts";

// Mocking the missing methods for StateMachine
(StateMachine as any).computeConstraints = (ctx: any) => ({});
(StateMachine as any).lookupAction = (intent: any, constraints: any) => "next-action";

const mockKernelConfig = {
  identity: "kernel-compliant",
  objects: {},
  stateMachine: StateMachine,
  contracts: {
    identity: IdentityContract,
    routing: { validate: () => {} },
    object: { validate: () => {} }
  }
};

const kernel = new Kernel(mockKernelConfig as any);
const agent = new Agent(kernel, "test-domain");

function runBenchmark(iterations: number) {
  console.log(`Running benchmark: ${iterations} iterations...`);

  // Warm up
  for (let i = 0; i < 10000; i++) {
    agent.act("test-intent", { identity: "test-identity" });
  }

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    agent.act("test-intent", { identity: "test-identity" });
  }
  const end = performance.now();

  const totalTime = end - start;
  const avgTime = (totalTime / iterations) * 1000000;

  console.log(`Total Time: ${totalTime.toFixed(2)}ms`);
  console.log(`Average Time per act: ${avgTime.toFixed(4)}ns`);

  // Basic assertion: should be fast (less than 500ns per call on average)
  if (avgTime > 500) {
    console.error("Performance regression: Average act time exceeded 500ns");
    process.exit(1);
  }
  console.log("Performance check passed!");
}

const iterations = 1000000;
runBenchmark(iterations);
