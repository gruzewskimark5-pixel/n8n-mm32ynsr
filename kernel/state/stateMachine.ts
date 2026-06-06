export const StateMachine = {
  /**
   * Internal helper to create a state object.
   * Optimized: Shared state construction logic to maintain DRY principle while
   * allowing process() and transition() to be optimized independently.
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

  /**
   * Optimized: Directly returns the state object using the helper to avoid the
   * redundant lookupAction() call that would be performed if calling this.process().
   */
  transition(context, intent) {
    return this._createState(context, intent);
  },

  nextAction(state) {
    return this.lookupAction(state.intent, state.constraints);
  }
};
