export class Kernel {
  constructor(config) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;
  }

  route(intent, surface, agent, context) {
    this.contracts.identity.validate(agent);
    this.contracts.routing.validate(intent, surface);
    this.contracts.object.validate(context);

    const nextState = this.stateMachine.transition(context, intent);

    return {
      state: nextState,
      next_action: this.stateMachine.nextAction(nextState),
    };
  }
}
