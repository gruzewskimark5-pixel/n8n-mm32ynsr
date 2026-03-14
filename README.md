# Deploy n8n on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/n8n "Deploy n8n to Render")

> [!IMPORTANT]
> **View full deployment instructions in [Render's n8n deployment guide](https://render.com/docs/deploy-n8n).**

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Post-deployment Setup](#post-deployment-setup)
- [Free Tier Limitations](#free-tier-limitations)
- [Next Steps](#next-steps)

## Getting Started

This template defines a [`render.yaml`](./render.yaml) file you can use to deploy [n8n](https://n8n.io/) on Render. Click **Use this template** in the upper right to copy this template into your account as a new repo.

The `render.yaml` file defines the following resources:

- A web service that pulls and runs the official n8n Docker image
- A Render Postgres database that stores n8n data

Each of the above uses a free instance type by default.

## Features

- 🚀 **One-Click Deploy:** Get up and running in minutes with a pre-configured Blueprint.
- ⚡ **Free Tier Optimized:** Pre-tuned for Render's free tier with optimized memory settings, concurrency limits, disk-offloaded binary data for stability, disabled workflow templates, and automated data pruning.
- 💾 **Persistent Storage:** Includes a Render Postgres database (1GB limit on Free Tier) to securely store your workflows and credentials.
- 🛠️ **Zero-Downtime Deploys:** Includes a health check endpoint to ensure your service is always available.

## Post-deployment Setup

After your n8n instance is up and running, follow these steps in the [Render Dashboard](https://dashboard.render.com/) to finish setting up:

### 👤 1. Create your owner account
Visit your `onrender.com` URL to create your first owner account. This account will have full access to your n8n instance.

### 🪝 2. Configure Webhook URL
If you use webhook nodes or OAuth2 authentication (e.g., Google, Slack) in your workflows, you must set your service's `WEBHOOK_URL` environment variable manually.

> [!IMPORTANT]
> The `WEBHOOK_URL` must not include a trailing slash or a port number. For example, use `https://n8n-service-q975.onrender.com` instead of `https://n8n-service-q975.onrender.com/`.

1. **Find your URL:** Copy your service URL from the top of the service page or under the **Connect** button in the [Render Dashboard](https://dashboard.render.com/) (e.g., `https://n8n-service-q975.onrender.com`).
2. **Open Environment settings:** Navigate to your service's **Environment** tab.
3. **Add variable:** Click **Add Environment Variable**.
4. **Enter details:** Set the key to `WEBHOOK_URL` and paste your service URL as the value.
5. **Save:** Click **Save Changes**. Render will automatically restart your service with the new setting.

### 🌍 3. Set your Timezone (Optional)
To ensure your scheduled workflows run at the correct time, you should set the `GENERIC_TIMEZONE` environment variable.

1. **Find your Timezone:** Look up your [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `Europe/Berlin` or `America/New_York`).
2. **Open Environment settings:** Navigate to your service's **Environment** tab.
3. **Add variable:** Click **Add Environment Variable**.
4. **Enter details:** Set the key to `GENERIC_TIMEZONE` and your TZ name as the value.
5. **Save:** Click **Save Changes**.

### ✅ 4. Verify your deployment
You can verify that your n8n instance is running correctly by visiting your service URL with the `/healthz` path appended (e.g., `https://n8n-service-q975.onrender.com/healthz`). A successful setup will return an `OK` response.

## Free Tier Limitations
> [!WARNING]
> This template uses Render's **Free instance type** by default.
> - **Spin down:** Free web services [spin down](https://render.com/docs/free#spinning-down) after 15 minutes of inactivity.
> - **Database expiry:** Free PostgreSQL databases expire and are permanently **DELETED** after **30 days** ([documentation](https://render.com/docs/free#free-postgresql)).
>
> To avoid data loss and ensure your workflows run reliably, we recommend upgrading to a paid instance type for both the web service and the database.

## Next Steps

- 🧩 **Explore Templates:** Browse the [n8n workflow library](https://n8n.io/workflows/) for inspiration.
- 🔌 **Connect Apps:** Check out the [available integrations](https://n8n.io/integrations/).
- 💬 **Get Help:** Join the [n8n forum](https://community.n8n.io/) or read the [official docs](https://docs.n8n.io/).

---
[Back to top](#deploy-n8n-on-render)
