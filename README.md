# Deploy n8n on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/n8n "Deploy n8n to Render")

> [!IMPORTANT]
> **View full deployment instructions in [Render's n8n deployment guide](https://render.com/docs/deploy-n8n).**

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Post-deployment Setup](#post-deployment-setup)
- [Free Tier Limitations](#free-tier-limitations)
- [Maintenance & Updates](#maintenance--updates)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Getting Started

This template defines a [`render.yaml`](./render.yaml) file you can use to deploy [n8n](https://n8n.io/) on Render. Click **Use this template** in the upper right to copy this template into your account as a new repo.

The `render.yaml` file defines the following resources:

- A web service that pulls and runs the official n8n Docker image
- A Render Postgres database that stores n8n data

Each of the above uses a free instance type by default.

> [!WARNING]
> Render's **Free instance type** for PostgreSQL databases has a critical limitation: the database and all its data are **PERMANENTLY DELETED** after **30 days** of usage. For production workflows, upgrading to a paid database plan is highly recommended.

---
[↑ Back to top](#deploy-n8n-on-render)

## Features

- 🚀 **One-Click Deploy:** Get up and running in minutes with a pre-configured Blueprint.
- ⚡ **Free Tier Optimized:** Pre-tuned for Render's free tier:
  - **Memory & Concurrency:** Optimized settings for stable operation on 512MB RAM.
  - **Storage Stability:** Disk-offloaded binary data to prevent memory-related crashes.
  - **Lean Background:** Disabled non-essential features (templates, banners, onboarding) and optimized shutdown for maximum efficiency.
  - **Auto-maintenance:** Automated execution and history pruning to keep the database lean.
- 💾 **Persistent Storage:** Includes a Render Postgres database (1GB limit on Free Tier) to securely store your workflows and credentials.
- 🛠️ **Zero-Downtime Deploys:** Includes a health check endpoint to ensure your service is always available.

---
[↑ Back to top](#deploy-n8n-on-render)

## Post-deployment Setup

After your n8n instance is up and running, follow these steps in the [Render Dashboard](https://dashboard.render.com/) to finish setting up:

### 👤 1. Create your owner account
Visit your service URL to create your first owner account. This account will have full access to your n8n instance.

> [!TIP]
> **Find your URL:** You can find your service URL at the top of the service page or under the **Connect** button in the [Render Dashboard](https://dashboard.render.com/) (e.g., `https://n8n-service-q975.onrender.com`).

> [!TIP]
> If your service has spun down due to inactivity, it may take 1-2 minutes to start up. If you see a "Service Unavailable" message, wait a moment and refresh the page.

### 🪝 2. Configure Webhook URL
If you use webhook nodes or OAuth2 authentication (e.g., Google, Slack) in your workflows, you must set your service's `WEBHOOK_URL` environment variable manually. This ensures that external services can communicate with your n8n instance for webhooks and OAuth2 callbacks.

> [!IMPORTANT]
> The `WEBHOOK_URL` must not include a trailing slash or a port number. For example, use `https://n8n-service-q975.onrender.com` instead of `https://n8n-service-q975.onrender.com/` or `https://n8n-service-q975.onrender.com:5678`.

1. **Select your service:** In the [Render Dashboard](https://dashboard.render.com/), click on your n8n web service.
2. **Open Environment settings:** Navigate to your service's **Environment** tab in the left-hand sidebar.
3. **Add variable:** Click **Add Environment Variable**.
4. **Enter details:** Set the key to `WEBHOOK_URL` and paste your service URL as the value.
5. **Save:** Click **Save Changes**. Render will automatically restart your service with the new setting.

> [!TIP]
> **Use a Custom Domain:** For a more professional look and to avoid changing URLs in your external services if you ever redeploy, you can [add a custom domain](https://render.com/docs/custom-domains) to your n8n service for free on Render.

### 🌍 3. Set your Timezone (Optional)
To ensure your scheduled workflows run at the correct time, you should set the `GENERIC_TIMEZONE` environment variable.

> [!TIP]
> Note that scheduled workflows will only run while the service is active. On the Free Tier, your service will not "wake up" to run a scheduled workflow if it has spun down due to inactivity.

1. **Find your Timezone:** Look up your [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `Europe/Berlin` or `America/New_York`).
2. **Open Environment settings:** Navigate to your service's **Environment** tab.
3. **Add variable:** Click **Add Environment Variable**.
4. **Enter details:** Set the key to `GENERIC_TIMEZONE` and your TZ name as the value.
5. **Save:** Click **Save Changes**.

### ✅ 4. Verify your deployment
You can verify that your n8n instance is running correctly by visiting your service URL with the `/healthz` path appended (e.g., `https://n8n-service-q975.onrender.com/healthz`). A successful setup will return an `OK` response.

### 🔑 5. Backup your encryption key
Your credentials in n8n are encrypted with a unique key. If you ever need to migrate or restore your n8n instance, you will need this key. **If you lose this key, you will permanently lose access to all your stored credentials in n8n.**

1. **Open Environment settings:** Navigate to your service's **Environment** tab in the [Render Dashboard](https://dashboard.render.com/).
2. **Reveal and copy key:** Find the `N8N_ENCRYPTION_KEY` variable. Click the **eye icon** (or the **Reveal** button) to show the value, then copy it.
3. **Store safely:** Save this key in a secure location (like a password manager).

---
[↑ Back to top](#deploy-n8n-on-render)

## Troubleshooting

### 🐌 Service is slow to start
On Render's Free Tier, services spin down after 15 minutes of inactivity. When you visit your URL after it has spun down, it can take 1-2 minutes to "cold start." If you see a `503 Service Unavailable` error, wait a minute and refresh the page.

### 🪝 Webhook or OAuth2 errors
If your webhooks aren't receiving data or OAuth2 authentication (like Google or Slack) is failing:
- Ensure you have set the `WEBHOOK_URL` environment variable as described in Step 2.
- Double-check that the `WEBHOOK_URL` **does not** have a trailing slash (e.g., use `https://my-n8n.onrender.com` not `https://my-n8n.onrender.com/`).
- **Verify in n8n:** Open any **Webhook** node in the n8n editor, select the **Production** URL tab, and check the URL. It should correctly display your service URL (e.g., `https://my-n8n.onrender.com/webhook/...`). If it shows `http://localhost:5678`, your `WEBHOOK_URL` is not set correctly.

### 🐘 Database Connection Errors
During initial deployment, the database might take slightly longer to initialize than the web service. If the service fails to start initially, Render will automatically retry. You can check the service logs in the Render Dashboard to monitor the connection status.

### 📝 Viewing and Adjusting Logs
If you're troubleshooting an issue, you can check the service logs in the **Logs** tab of the Render Dashboard.

To get more detailed logs:
1. Navigate to the **Environment** tab.
2. Find the `N8N_LOG_LEVEL` variable.
3. Change its value from `warn` to `info` or `debug`.
4. **Save** your changes and Render will restart the service with the new log level.

---
[↑ Back to top](#deploy-n8n-on-render)

## Free Tier Limitations
> [!WARNING]
> This template uses Render's **Free instance type** by default.
> - 💤 **Spin down:** Free web services [spin down](https://render.com/docs/free#spinning-down) after 15 minutes of inactivity.
> - 🗓️ **Database expiry:** Free PostgreSQL databases expire and are permanently **DELETED** after **30 days** (see [Render's Free Tier documentation](https://render.com/docs/free#free-postgresql)).
> - ⏰ **Scheduled triggers:** Workflows using the Schedule or Cron nodes will not run while the service is [spun down](https://render.com/docs/free#spinning-down) due to inactivity.
>
> To avoid data loss and ensure your workflows run reliably, we recommend upgrading to a paid instance type for both the web service and the database.

---
[↑ Back to top](#deploy-n8n-on-render)

## Maintenance & Updates

- 🔄 **Updating n8n:** To update to the latest version, click **Clear Build Cache & Deploy** from the **Manual Deploy** dropdown in the [Render Dashboard](https://dashboard.render.com/).
- 💾 **Backups:** Regularly export your workflows and keep a secure backup of your `N8N_ENCRYPTION_KEY`.
- 📊 **Monitor Storage:** Keep an eye on your database usage in the Render Dashboard to ensure you stay within the 1GB free tier limit.

---
[↑ Back to top](#deploy-n8n-on-render)

## Next Steps

- 🧩 **Explore Templates:** Browse the [n8n workflow library](https://n8n.io/workflows/) for inspiration.
- 🔌 **Connect Apps:** Check out the [available integrations](https://n8n.io/integrations/).
- 💬 **Get Help:** Join the [n8n forum](https://community.n8n.io/) or read the [official docs](https://docs.n8n.io/).

---
[↑ Back to top](#deploy-n8n-on-render)
