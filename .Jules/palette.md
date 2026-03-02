## 2025-02-26 - Transparency in Template Deployment
**Learning:** For deployment templates using free tiers, users often miss critical limitations (like database expiry) which leads to a poor UX and potential data loss. Adding clear warnings and post-deployment steps in the README significantly improves the "Day 2" user experience.
**Action:** Always check the provider's free-tier terms and include specific warnings and setup guides in the README.

## 2025-05-15 - Improving Deployment Visibility with Health Checks
**Learning:** For infrastructure-as-code templates, adding a health check endpoint (like n8n's `/healthz`) to the deployment configuration (`render.yaml`) significantly improves the developer UX by providing real-time feedback during the deploy process and enabling zero-downtime updates.
**Action:** Always identify and implement the application's native health check endpoint in the Blueprint configuration and document it in a "Verification" section in the README.

## 2025-05-22 - Onboarding Optimization for Deployment Templates
**Learning:** For infrastructure-as-code templates, the "interface" is the documentation and configuration files. Micro-UX improvements like using action-oriented headings (e.g., "Create your account" vs. "Initial Setup"), adding a "Features" value proposition, and including "Next Steps" resources significantly reduce onboarding friction and improve user confidence.
**Action:** Always ensure template READMEs have a clear value proposition, action-oriented setup steps, and comprehensive resource links for post-deployment success.
