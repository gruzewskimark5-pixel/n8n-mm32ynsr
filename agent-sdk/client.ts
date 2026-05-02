import { Agent } from "./agent.ts";

export class AgentClient {
  kernel: any;
  agents: Map<string, Agent>;

  constructor(kernel) {
    this.kernel = kernel;
    this.agents = new Map();
  }

  createAgent(domain) {
    if (!this.agents.has(domain)) {
      this.agents.set(domain, new Agent(this.kernel, domain));
    }
    return this.agents.get(domain);
  }
}
