export interface Contract {
  validate(...args: any[]): void;
}

export interface KernelConfig {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: {
    identity: Contract;
    routing: Contract;
    object: Contract;
  };
}

export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;

  // Flattened properties for hot path optimization
  private identityContract: Contract;
  private routingContract: Contract;
  private objectContract: Contract;

  constructor(config: KernelConfig) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Initialize flattened properties to minimize lookup depth in route()
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses direct property access to minimize lookup depth and
   * overhead in the performance-critical path.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    this.identityContract.validate(agent);
    this.routingContract.validate(intent, surface);
    this.objectContract.validate(context);

    return this.stateMachine.process(context, intent);
  }
}
