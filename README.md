# Deploy n8n on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/n8n "Deploy n8n to Render")

> [!IMPORTANT]
> **View full deployment instructions in [Render's n8n deployment guide](https://render.com/docs/deploy-n8n).**

This template defines a [`render.yaml`](./render.yaml) file you can use to deploy [n8n](https://n8n.io/) on Render. Click **Use this template** in the upper right to copy this template into your account as a new repo.

The `render.yaml` file defines the following resources:

- A web service that pulls and runs the official n8n Docker image
- A Render Postgres database that stores n8n data

Each of the above uses a free instance type by default.

## ✨ Features

- **One-Click Deploy:** Get up and running in minutes with a pre-configured Blueprint.
- **Free Tier Optimized:** Pre-tuned for Render's free tier with optimized memory settings, concurrency limits, and automated data pruning.
- **Persistent Storage:** Includes a Render Postgres database to securely store your workflows and credentials.
- **Zero-Downtime Deploys:** Includes a health check endpoint to ensure your service is always available.

## Post-deployment setup

After your n8n instance is up and running, follow these steps to finish setting up:

### 👤 1. Create your owner account
Visit your `onrender.com` URL to create your first owner account. This account will have full access to your n8n instance.

### 🪝 2. Configure Webhook URL
If you use webhook nodes in your workflows, you must set your service's `WEBHOOK_URL` environment variable manually to your service's `onrender.com` URL (for example, `https://n8n-service-q975.onrender.com/`).

### ✅ 3. Verify your deployment
You can verify that your n8n instance is running correctly by visiting your service URL with the `/healthz` path appended (e.g., `https://n8n-service-q975.onrender.com/healthz`). A successful setup will return an `OK` response.

### ⚠️ 4. Free Tier Limitations
> [!WARNING]
> This template uses Render's **Free instance type** by default.
> - **Spin down:** Free web services spin down after 15 minutes of inactivity.
> - **Database expiry:** Free PostgreSQL databases expire and are deleted after **90 days**.
>
> To avoid data loss and ensure your workflows run reliably, we recommend upgrading to a paid instance type for both the web service and the database.
