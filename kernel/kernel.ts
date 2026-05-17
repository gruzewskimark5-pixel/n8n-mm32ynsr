export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;

  // Flattened contracts for hot path performance
  identityContract: any;
  routingContract: any;
  objectContract: any;

  constructor(config: any) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Flatten contracts to minimize lookup depth in route()
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses flattened contract references to minimize property lookup depth
   * and uses stateMachine.process to reduce function call overhead.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    this.identityContract.validate(agent);
    this.routingContract.validate(intent, surface);
    this.objectContract.validate(context);

    return this.stateMachine.process(context, intent);
  }
}
