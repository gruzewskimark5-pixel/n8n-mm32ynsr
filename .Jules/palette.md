## 2025-02-26 - Transparency in Template Deployment
**Learning:** For deployment templates using free tiers, users often miss critical limitations (like database expiry) which leads to a poor UX and potential data loss. Adding clear warnings and post-deployment steps in the README significantly improves the "Day 2" user experience.
**Action:** Always check the provider's free-tier terms and include specific warnings and setup guides in the README.

## 2025-05-15 - Improving Deployment Visibility with Health Checks
**Learning:** For infrastructure-as-code templates, adding a health check endpoint (like n8n's `/healthz`) to the deployment configuration (`render.yaml`) significantly improves the developer UX by providing real-time feedback during the deploy process and enabling zero-downtime updates.
**Action:** Always identify and implement the application's native health check endpoint in the Blueprint configuration and document it in a "Verification" section in the README.

## 2025-05-16 - Reducing Navigation Friction in Deployment Templates
**Learning:** Providing specific UI navigation paths (e.g., 'Go to the Environment tab') for manual setup steps reduces cognitive load and prevents users from getting lost in a complex platform dashboard.
**Action:** Always include step-by-step navigation guidance for any manual configuration required after deployment.

## 2025-05-18 - Reducing Post-Deployment Activation Friction
**Learning:** Users often experience a "what now?" moment after a successful infrastructure deployment. Including a "Next Steps" section with direct links to application-specific onboarding (like the n8n Workflow Library) bridges the gap between DevOps and User Value.
**Action:** Always include a "Next Steps" or "Getting Started with [App Name]" section in the README that points to high-value initial actions.

## 2025-05-18 - Clarifying Multi-Purpose Environment Variables
**Learning:** Environment variables like `WEBHOOK_URL` are often perceived as optional or limited to a specific feature (webhooks). Explicitly documenting that they are also required for core functionality like OAuth2 prevents common setup failures.
**Action:** Audit environment variable descriptions for hidden dependencies on core features and explicitly list them in both the configuration comments and the README.
