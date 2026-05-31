export const StateMachine = {
  /**
   * Optimized: Computes next state without redundant action lookup.
   */
  transition(context, intent) {
    return {
      identity: context.identity,
      intent,
      context,
      constraints: this.computeConstraints(context),
    };
  },

  /**
   * Optimized: Leverages transition() and performs action lookup.
   * Eliminates the performance anti-pattern of transition() calling process().
   */
  process(context, intent) {
    const state = this.transition(context, intent);
    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
