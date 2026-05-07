export class Kernel {
  identity: any;
  objects: any;
  stateMachine: any;
  contracts: any;
  secret: string;

  constructor(config) {
    this.identity = config.identity;
    this.objects = config.objects;
    this.stateMachine = config.stateMachine;
    this.contracts = config.contracts;
    this.secret = config.secret;
  }

  route(intent, surface, agent, context) {
    this.contracts.identity.validate(agent, this.secret);
    this.contracts.routing.validate(intent, surface);
    this.contracts.object.validate(context);

    const nextState = this.stateMachine.transition(context, intent);

    return {
      state: nextState,
      next_action: this.stateMachine.nextAction(nextState),
    };
  }
}
