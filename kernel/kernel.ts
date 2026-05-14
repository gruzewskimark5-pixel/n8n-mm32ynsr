export interface KernelConfig {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: {
    identity: any;
    routing: any;
    object: any;
  };
}

export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;

  // Flattened contracts for optimized hot path access
  private identityContract: any;
  private routingContract: any;
  private objectContract: any;

  constructor(config: KernelConfig) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Cache contract references to minimize property lookup depth in route()
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses direct property access to flattened contracts,
   * reducing property lookup depth and avoiding local destructuring overhead.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    this.identityContract.validate(agent);
    this.routingContract.validate(intent, surface);
    this.objectContract.validate(context);

    return this.stateMachine.process(context, intent);
  }
}
