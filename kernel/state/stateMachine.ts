export const StateMachine = {
  /**
   * Internal helper to create the state object.
   * Optimized: Using inline object literal for state construction.
   */
  _createState(context, intent) {
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
    const state = this._createState(context, intent);

    return {
      state,
      next_action: this.lookupAction(intent, state.constraints),
    };
  },

  transition(context, intent) {
    return this._createState(context, intent);
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
