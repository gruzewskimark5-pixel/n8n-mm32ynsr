export class Agent {
  kernel: any;
  domain: any;
  identity: string;

  constructor(kernel, domain, identity) {
    this.kernel = kernel;
    this.domain = domain;
    this.identity = identity;
  }

  async act(intent, context) {
    return this.kernel.route(intent, this.domain, this, context);
  }
}
