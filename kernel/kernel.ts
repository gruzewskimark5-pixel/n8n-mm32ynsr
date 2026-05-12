export interface KernelConfig {
  identity: string;
  objects: Record<string, any>;
  stateMachine: any;
  contracts: {
    identity: any;
    routing: any;
    object: any;
  };
}

export class Kernel {
  identity: string;
  objects: Record<string, any>;
  stateMachine: any;
  contracts: any; // Keep for backward compatibility if any external code uses it
  identityContract: any;
  routingContract: any;
  objectContract: any;

  constructor(config: KernelConfig) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;

    // Flatten contracts for faster access in the route hot path
    const { identity, routing, object } = config.contracts;
    this.identityContract = identity;
    this.routingContract = routing;
    this.objectContract = object;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses flattened contract properties and local destructuring to
   * eliminate nested property lookups and minimize overhead in the hot path.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    const { identityContract, routingContract, objectContract, stateMachine } = this;

    identityContract.validate(agent);
    routingContract.validate(intent, surface);
    objectContract.validate(context);

    return stateMachine.process(context, intent);
  }
}
