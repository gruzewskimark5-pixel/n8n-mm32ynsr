export const StateMachine = {
  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * This reduces function call overhead and centralizes the logic.
   */
  process(context, intent) {
    const constraints = this.computeConstraints(context);
    const state = {
      identity: context.identity,
      intent,
      context,
      constraints,
    };

    return {
      state,
      next_action: this.lookupAction(intent, constraints),
    };
  },

  transition(context, intent) {
    return this.process(context, intent).state;
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
