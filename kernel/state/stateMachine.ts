export const StateMachine = {
  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * Leverages the optimized transition logic to avoid redundant lookup calls.
   */
  process(context, intent) {
    const state = this.transition(context, intent);
    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

  /**
   * Optimized: Decoupled from process() to avoid redundant action lookups.
   * Uses inline object literal to minimize local variable allocation.
   */
  transition(context, intent) {
    const constraints = this.computeConstraints(context);
    return {
      identity: context.identity,
      intent,
      context,
      constraints,
    };
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
