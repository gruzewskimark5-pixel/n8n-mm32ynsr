export const StateMachine = {
  transition(context, intent) {
    return {
      identity: context.identity,
      intent,
      context,
      constraints: this.computeConstraints(context),
    };
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
