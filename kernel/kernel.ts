export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;

  // Flattened contract references for performance optimization
  private identityContract: any;
  private routingContract: any;
  private objectContract: any;

  constructor(config: any) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Pre-cache contract references to minimize property lookup depth in the hot path
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses pre-cached contract references to avoid property lookup
   * and destructuring overhead in high-frequency execution paths.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    this.identityContract.validate(agent);
    this.routingContract.validate(intent, surface);
    this.objectContract.validate(context);

    return this.stateMachine.process(context, intent);
  }
}
