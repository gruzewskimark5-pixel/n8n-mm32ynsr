export const StateMachine = {
  /**
   * Internal helper to create a state object.
   * Centralizing this maintains DRY and ensures consistency between process and transition.
   */
  createState(context, intent) {
    const constraints = this.computeConstraints(context);
    return {
      identity: context.identity,
      intent,
      context,
      constraints,
    };
  },

  /**
   * Optimized: Performs transition and action lookup in a single pass.
   * This reduces function call overhead and centralizes the logic.
   */
  process(context, intent) {
    const state = this.createState(context, intent);
    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

  /**
   * Optimized: Directly returns the state object without looking up next_action.
   * This improves performance in paths where only the next state is needed.
   */
  transition(context, intent) {
    return this.createState(context, intent);
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
