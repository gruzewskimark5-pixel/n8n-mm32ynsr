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
   * Optimized: Uses destructuring to minimize property lookups on 'this' and 'this.contracts'.
   */
  route(intent: string, surface: string, agent: any, context: any): any {
    const { identity, routing, object } = this.contracts;

    identity.validate(agent);
    routing.validate(intent, surface);
    object.validate(context);

    const sm = this.stateMachine;
    const nextState = sm.transition(context, intent);

    return {
      state: nextState,
      next_action: sm.nextAction(nextState),
    };
  }
}
