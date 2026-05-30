export const StateMachine = {
  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * This reduces function call overhead and centralizes the logic.
   */
  process(context, intent) {
    const state = this.transition(context, intent);
    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

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
