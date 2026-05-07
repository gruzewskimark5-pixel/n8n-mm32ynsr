import { Kernel } from "../kernel/kernel.ts";
import { Agent } from "./agent.ts";

export class AgentClient {
  kernel: Kernel;

  constructor(kernel: Kernel) {
    this.kernel = kernel;
  }

  createAgent(domain) {
    return new Agent(this.kernel, domain);
  }
}
