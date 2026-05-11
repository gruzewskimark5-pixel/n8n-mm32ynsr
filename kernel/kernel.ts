export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;

  constructor(config: any) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;
  }

  /**
   * Routes the intent to the state machine after validating contracts.
   * Optimized: Uses destructuring to minimize property lookups and uses
   * stateMachine.process to reduce function call overhead.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    const { contracts, stateMachine } = this;
    const { identity, routing, object } = contracts;

    identity.validate(agent);
    routing.validate(intent, surface);
    object.validate(context);

    return stateMachine.process(context, intent);
  }
}
