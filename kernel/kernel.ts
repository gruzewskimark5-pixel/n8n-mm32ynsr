export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;
  identityContract: any;
  routingContract: any;
  objectContract: any;

  constructor(config: any) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Flatten contracts for faster access in hot paths
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Flattened contract references to minimize property lookup depth
   * and removed destructuring overhead in the hot path.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    this.identityContract.validate(agent);
    this.routingContract.validate(intent, surface);
    this.objectContract.validate(context);

    return this.stateMachine.process(context, intent);
  }
}
