import crypto from "node:crypto";

export const IdentityContract = {
  validate(agent, secret) {
    if (!agent.identity || !agent.domain || !secret) {
      throw new Error("Agent identity violation");
    }

    const expectedIdentity = crypto
      .createHmac("sha256", secret)
      .update(agent.domain)
      .digest("hex");

    const actualIdentity = Buffer.from(agent.identity, "utf-8");
    const expectedBuffer = Buffer.from(expectedIdentity, "utf-8");

    if (actualIdentity.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualIdentity, expectedBuffer)) {
      throw new Error("Agent identity violation");
    }
  }
};
