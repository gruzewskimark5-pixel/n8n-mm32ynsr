export const StateMachine = {
  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * Inlined state object creation to minimize local variable allocation
   * overhead and leverage V8 optimization in the execution hot path.
   */
  process(context, intent) {
    const constraints = this.computeConstraints(context);
    return {
      state: {
        identity: context.identity,
        intent,
        context,
        constraints,
      },
      next_action: this.lookupAction(intent, constraints),
    };
  },

  /**
   * Optimized: Inlined state object creation to avoid internal helper call
   * overhead and provide the fastest possible state transition.
   */
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
