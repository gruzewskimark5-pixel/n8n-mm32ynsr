import crypto from "node:crypto";
import { Agent } from "./agent.ts";

export class AgentClient {
  kernel: any;

  constructor(kernel) {
    this.kernel = kernel;
  }

  createAgent(domain) {
    if (!this.kernel.secret) {
        throw new Error("Kernel secret is required for agent creation");
    }

    const identity = crypto
      .createHmac("sha256", this.kernel.secret)
      .update(domain)
      .digest("hex");

    return new Agent(this.kernel, domain, identity);
  }
}
