export class Kernel {
  constructor(config) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;
  }

  route(intent, surface, agent, context) {
    // Optimized: Destructure contracts and stateMachine to minimize property lookups in the hot path.
    const { contracts, stateMachine } = this;
    const { identity, routing, object } = contracts;

    identity.validate(agent);
    routing.validate(intent, surface);
    object.validate(context);

    const nextState = stateMachine.transition(context, intent);

    return {
      state: nextState,
      next_action: stateMachine.nextAction(nextState),
    };
  }
}
