export class AgentClient {
  constructor(kernel) {
    this.kernel = kernel;
  }

  createAgent(domain) {
    return new Agent(this.kernel, domain);
  }
}
