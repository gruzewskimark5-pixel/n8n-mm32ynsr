# Deploy n8n on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/n8n "Deploy n8n to Render")

> [!IMPORTANT]
> **View full deployment instructions in [Render's n8n deployment guide](https://render.com/docs/deploy-n8n).**

## Table of Contents
- [🚀 Getting Started](#getting-started)
- [✨ Features](#features)
- [⚙️ Post-deployment Setup](#post-deployment-setup)
  - [👤 1. Create your owner account](#1-create-your-owner-account)
  - [🪝 2. Configure Webhook URL (Required)](#2-configure-webhook-url-required)
  - [🌍 3. Update your Timezone (Optional)](#3-update-your-timezone-optional)
  - [✅ 4. Verify your deployment](#4-verify-your-deployment)
  - [🔑 5. Backup your encryption key](#5-backup-your-encryption-key)
- [⚠️ Free Tier Limitations](#free-tier-limitations)
- [🔄 Maintenance & Updates](#maintenance--updates)
- [🔍 Troubleshooting](#troubleshooting)
  - [💤 Service is slow to start](#service-is-slow-to-start)
  - [🪝 Webhook or OAuth2 errors](#webhook-or-oauth2-errors)
  - [🐘 Database Connection Errors](#database-connection-errors)
  - [🧩 Missing "Templates" tab](#missing-templates-tab)
  - [✅ Successful executions not showing](#successful-executions-not-showing)
  - [⏱️ Workflows timing out](#workflows-timing-out)
  - [📝 Viewing and Adjusting Logs](#viewing-and-adjusting-logs)
- [🏁 Next Steps](#next-steps)

## 🚀 Getting Started

This template defines a [`render.yaml`](./render.yaml) file you can use to deploy [n8n](https://n8n.io/) on Render. Click **Use this template** in the upper right to copy this template into your account as a new repo.

The `render.yaml` file defines the following resources:

- A web service that pulls and runs the official n8n Docker image
- A Render Postgres database that stores n8n data

Each of the above uses a free instance type by default.

> [!WARNING]
> Render's **Free instance type** for PostgreSQL databases has a critical limitation: the database and all its data are **PERMANENTLY DELETED** after **30 days** of usage. For production workflows, upgrading to a paid database plan is highly recommended.

---
[↑ Back to top](#deploy-n8n-on-render)

## ✨ Features

- 🚀 **One-Click Deploy:** Get up and running in minutes with a pre-configured Blueprint.
- ⚡ **Free Tier Optimized:** Pre-tuned for Render's free tier:
  - **Memory & Concurrency:** Optimized settings for stable operation on 512MB RAM, including forced main-process execution and disabled task runners.
  - **Storage Stability:** Disk-offloaded binary data to prevent memory-related crashes.
  - **Lean Background:** Optimized for stability and speed by disabling non-essential features and background tasks:
    - **Disabled Features:** Templates, community nodes, task runners, personalization, onboarding, telemetry, hiring banners, and external icons.
    - **Operational Efficiency:** Reduced database heartbeat overhead, automatic deactivation of failing workflows, and optimized shutdown for faster container lifecycle.
  - **Auto-maintenance:** Automated execution and history pruning to keep the database lean.
- 💾 **Persistent Storage:** Includes a Render Postgres database (1GB limit on Free Tier) to securely store your workflows and credentials.
- 🛠️ **Zero-Downtime Deploys:** Includes a health check endpoint to ensure your service is always available.

---
[↑ Back to top](#deploy-n8n-on-render)

## ⚙️ Post-deployment Setup

After your n8n instance is up and running, follow these steps in the [Render Dashboard](https://dashboard.render.com/) to finish setting up:

### 👤 1. Create your owner account
Visit your service URL to create your first owner account. This account will have full access to your n8n instance.

> [!TIP]
> **Find your URL:** You can find your service URL at the top of the service page or under the **Connect** button in the [Render Dashboard](https://dashboard.render.com/) (e.g., `https://n8n-service-q975.onrender.com`).

> [!TIP]
> 💤 If your service has spun down due to inactivity, it may take 1-2 minutes to start up. If you see a `503 Service Unavailable` message, wait a moment and refresh the page.

### 🪝 2. Configure Webhook URL (Required)
If you use webhook nodes or OAuth2 authentication (e.g., Google, Slack) in your workflows, you must set your service's `WEBHOOK_URL` environment variable manually. This ensures that external services can communicate with your n8n instance for webhooks and OAuth2 callbacks.

> [!IMPORTANT]
> The `WEBHOOK_URL` must not include a trailing slash or a port number:
> - ✅ `https://n8n-service-q975.onrender.com`
> - ❌ `https://n8n-service-q975.onrender.com/`
> - ❌ `https://n8n-service-q975.onrender.com:5678`

1. **Select your service:** In the [Render Dashboard](https://dashboard.render.com/), click on your n8n web service.
2. **Open Environment settings:** Navigate to your service's **Environment** tab in the left-hand sidebar.
3. **Update variable:** Find the existing `WEBHOOK_URL` variable. Click the **Edit** button (or the value field) to update it.
4. **Enter details:** Paste your unique service URL as the value (e.g., `https://n8n-service-q975.onrender.com`).
5. **Save:** Click **Save Changes**. Render will automatically restart your service with the new setting.
6. **Verify:** Once the service restarts, open any **Webhook** node in n8n, select the **Production** tab, and confirm the displayed URL matches your service URL (e.g., `https://n8n-service-q975.onrender.com/webhook/...`).

> [!TIP]
> **Test vs. Production Tabs:** In n8n's Webhook node, the **Test** tab displays a URL for manual testing, while the **Production** tab displays the URL used for active, saved workflows. You must select the **Production** tab to verify that your `WEBHOOK_URL` environment variable has been applied correctly.

> [!TIP]
> **Use a Custom Domain:** For a more professional look and to avoid changing URLs in your external services if you ever redeploy, you can [add a custom domain](https://render.com/docs/custom-domains) to your n8n service for free on Render.

### 🌍 3. Update your Timezone (Optional)
To ensure your scheduled workflows run at the correct time, you should update the `GENERIC_TIMEZONE` environment variable.

> [!TIP]
> Note that scheduled workflows will only run while the service is active. On the Free Tier, your service will not "wake up" to run a scheduled workflow if it has spun down due to inactivity.

1. **Find your Timezone:** Look up your [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `Europe/Berlin` or `America/New_York`).
2. **Open Environment settings:** Navigate to your service's **Environment** tab in the left-hand sidebar.
3. **Update variable:** Find the existing `GENERIC_TIMEZONE` variable. Click the **Edit** button (or the value field) to update it.
4. **Enter details:** Change the value from `UTC` to your preferred TZ name (e.g., `America/New_York`).
5. **Save:** Click **Save Changes**.
6. **Verify:** To confirm the change, create a new workflow in n8n, select the **horizontal ellipsis (three dots)** in the top-right corner, click **Settings**, and confirm the **Timezone** field matches your choice.

### ✅ 4. Verify your deployment
You can verify that your n8n instance and database are correctly connected by visiting your service URL with the `/healthz/readiness` path appended (e.g., `https://n8n-service-q975.onrender.com/healthz/readiness`). A successful setup will return a plain-text `OK` response.

> [!TIP]
> This endpoint confirms that both the n8n service and its database are fully connected and ready. To perform a basic reachability check for just the web service, you can use the `/healthz` path instead (e.g., `https://n8n-service-q975.onrender.com/healthz`).

### 🔑 5. Backup your encryption key
Your credentials in n8n are encrypted with a unique key. If you ever need to migrate or restore your n8n instance, you will need this key. **If you lose this key, you will permanently lose access to all your stored credentials in n8n. Treat this key like a password.**

1. **Open Environment settings:** Navigate to your service's **Environment** tab in the left-hand sidebar of the [Render Dashboard](https://dashboard.render.com/).
2. **Reveal and copy key:** Find the `N8N_ENCRYPTION_KEY` variable. Click the **eye icon** (or the **Reveal** button) to show the value, then copy it.
3. **Store safely:** Save this key in a secure location (like a password manager).

---
[↑ Back to top](#deploy-n8n-on-render)

## ⚠️ Free Tier Limitations
> [!WARNING]
> This template uses Render's **Free instance type** by default.
> - 💤 **Spin down:** Free web services [spin down](https://render.com/docs/free#spinning-down) after 15 minutes of inactivity.
> - 🗓️ **Database expiry:** Free PostgreSQL databases expire and are permanently **DELETED** after **30 days** (see [Render's Free Tier documentation](https://render.com/docs/free#free-postgresql)).
> - ⏰ **Scheduled triggers:** Workflows using the Schedule or Cron nodes will not run while the service is [spun down](https://render.com/docs/free#spinning-down) due to inactivity.
>
> To avoid data loss and ensure your workflows run reliably, we recommend upgrading to a paid instance type for both the web service and the database.

---
[↑ Back to top](#deploy-n8n-on-render)

## 🔄 Maintenance & Updates

- 🔄 **Updating n8n:** To update to the latest version, click **Clear Build Cache & Deploy** from the **Manual Deploy** dropdown (top-right corner) in the [Render Dashboard](https://dashboard.render.com/).
- 💾 **Backups:** Regularly export your workflows (open a workflow, click the **horizontal ellipsis (three dots)** in the top-right corner, and select **Download**) and keep a secure backup of your `N8N_ENCRYPTION_KEY`.
- 📊 **Monitor Storage:** Keep an eye on your database usage in the Render Dashboard to ensure you stay within the 1GB free tier limit.
- 🔔 **Security Alerts:** n8n version check notifications are enabled by default (`N8N_VERSION_NOTIFICATIONS_ENABLED: "true"`) to ensure you're alerted to security updates and new releases directly in the dashboard.

---
[↑ Back to top](#deploy-n8n-on-render)

## 🔍 Troubleshooting

### 💤 Service is slow to start
On Render's Free Tier, services spin down after 15 minutes of inactivity. When you visit your URL after it has spun down, it can take 1-2 minutes to "cold start." If you see a `503 Service Unavailable` error, wait a minute and refresh the page.

### 🪝 Webhook or OAuth2 errors
If your webhooks aren't receiving data or OAuth2 authentication (like Google or Slack) is failing:
- Ensure you have set the `WEBHOOK_URL` environment variable as described in [Step 2](#2-configure-webhook-url-required).
- Double-check that the `WEBHOOK_URL` follows the correct format (no trailing slash).
- **Verify in n8n:** Follow the [in-app verification steps](#2-configure-webhook-url-required) to confirm your configuration is active.

### 🐘 Database Connection Errors
During initial deployment, the database might take slightly longer to initialize than the web service. If the service fails to start initially, Render will automatically retry. You can check the service logs in the Render Dashboard to monitor the connection status.

### 🧩 Missing "Templates" tab
To save memory on Render's free tier, the workflow template library is disabled by default (`N8N_TEMPLATES_ENABLED: "false"`). To re-enable it:
1. Navigate to the **Environment** tab in the left-hand sidebar.
2. Change `N8N_TEMPLATES_ENABLED` to `true`.
3. **Save Changes**. Note that this will increase your service's idle memory usage.

### 🧩 Missing Community Nodes
To save memory and reduce background overhead, community nodes are disabled by default (`N8N_COMMUNITY_PACKAGES_ENABLED: "false"`). To re-enable them:
1. Navigate to the **Environment** tab in the left-hand sidebar.
2. Change `N8N_COMMUNITY_PACKAGES_ENABLED` to `true`.
3. **Save Changes**. Note that this will increase your service's idle memory usage and background processing.

### ✅ Successful executions not showing
To keep the database lean, n8n is configured to only save data for failed production executions (`EXECUTIONS_DATA_SAVE_ON_SUCCESS: "none"`) by default.

To see successful executions, you have two options:

**Option 1: For specific workflows (Recommended)**
This is the most efficient way to save database space while still seeing successes for critical workflows.
1. Open your workflow in the n8n editor.
2. Click the **horizontal ellipsis (three dots)** in the top-right corner.
3. Select **Settings**.
4. Change **Save Successful Executions** to **Yes** and click **Save**.

**Option 2: For all workflows**
1. Navigate to the **Environment** tab in the left-hand sidebar of the Render Dashboard.
2. Change `EXECUTIONS_DATA_SAVE_ON_SUCCESS` to `all`.
3. **Save Changes**. Note that this will increase your database storage usage more quickly.

### ⏱️ Workflows timing out
To prevent runaway workflows from exhausting CPU and RAM on Render's 512MB free tier, a global execution timeout of 1 hour (3600 seconds) is enabled by default. If your workflows require more time:
1. Navigate to the **Environment** tab in the left-hand sidebar.
2. Update `N8N_EXECUTIONS_TIMEOUT` and `N8N_EXECUTIONS_TIMEOUT_MAX` to your desired value in seconds.
3. **Save Changes**. Note that very long executions may lead to service instability on the Free Tier.

### 📝 Viewing and Adjusting Logs
If you're troubleshooting an issue, you can check the service logs in the **Logs** tab of the Render Dashboard.

To get more detailed logs:
1. Navigate to the **Environment** tab in the left-hand sidebar.
2. Find the `N8N_LOG_LEVEL` variable.
3. Change its value from `warn` to `info` or `debug`.
4. **Save** your changes and Render will restart the service with the new log level.

---
[↑ Back to top](#deploy-n8n-on-render)

## 🏁 Next Steps

> [!TIP]
> **Keyboard Shortcuts:** Press `?` anywhere in the n8n editor to view a complete list of keyboard shortcuts for faster workflow building.

- 🚀 **Quickstart Guide:** Follow n8n's [official quickstart](https://docs.n8n.io/try-it-out/quickstart/) to build your first workflow.
- 🧩 **Explore Templates:** Browse the [n8n workflow library](https://n8n.io/workflows/) for inspiration.
- 🔌 **Connect Apps:** Check out the [available integrations](https://n8n.io/integrations/).
- 💬 **Get Help:** Join the [n8n forum](https://community.n8n.io/) or read the [official docs](https://docs.n8n.io/).

---
[↑ Back to top](#deploy-n8n-on-render)
