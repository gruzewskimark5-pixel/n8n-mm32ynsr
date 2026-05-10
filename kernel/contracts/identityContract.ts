export const IdentityContract = {
  validate(agent) {
    // Optimized: Removed redundant '!agent.identity ||' as 'agent.identity !== "kernel-compliant"' already covers it.
    if (agent.identity !== "kernel-compliant") {
      throw new Error("Agent identity violation");
    }
  }
};
