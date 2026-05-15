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
    // Flatten contracts for faster lookup in hot paths
    this.identityContract = config.contracts.identity;
    this.routingContract = config.contracts.routing;
    this.objectContract = config.contracts.object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses flattened contract properties to minimize property lookups
   * and uses stateMachine.process to reduce function call overhead.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    const { identityContract, routingContract, objectContract, stateMachine } = this;

    identityContract.validate(agent);
    routingContract.validate(intent, surface);
    objectContract.validate(context);

    return stateMachine.process(context, intent);
  }
}
