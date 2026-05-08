import { Kernel } from "../kernel/kernel.ts";

export class Agent {
  kernel: Kernel;
  domain: string;
  identity: string;

  constructor(kernel: Kernel, domain: string) {
    this.kernel = kernel;
    this.domain = domain;
    this.identity = "kernel-compliant";
  }

  /**
   * Performs an action based on the provided intent and context.
   * Optimized: Removed 'async' to avoid unnecessary Promise wrapping for synchronous kernel routing.
   */
  act(intent: string, context: any): any {
    return this.kernel.route(intent, this.domain, this, context);
  }
}
