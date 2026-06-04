export const StateMachine = {
  /**
   * Internal helper to create a state object.
   */
  createState(context, intent) {
    const constraints = (this as any).computeConstraints(context);
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
      next_action: (this as any).lookupAction(intent, state.constraints),
    };
  },

  /**
   * Optimized: Bypasses redundant lookupAction call by creating state directly.
   */
  transition(context, intent) {
    return this.createState(context, intent);
  },

  nextAction(state) {
    return (this as any).lookupAction(state.intent, state.constraints);
  }
};
