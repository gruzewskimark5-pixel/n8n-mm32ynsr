export const StateMachine = {
  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * Leverages transition() to avoid code duplication while inlining
   * object creation in the return statement to minimize overhead.
   */
  process(context, intent) {
    const state = this.transition(context, intent);
    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

  /**
   * Optimized: Computes the next state directly without redundant
   * action lookups. Inlines object creation to reduce memory pressure
   * and local variable allocation overhead.
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
