export class Agent {
  constructor(kernel, domain) {
    this.kernel = kernel;
    this.domain = domain;
    this.identity = "kernel-compliant";
  }

  async act(intent, context) {
    return this.kernel.route(intent, this.domain, this, context);
  }
}
