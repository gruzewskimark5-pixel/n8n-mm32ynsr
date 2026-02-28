# Bolt's Journal - n8n on Render

## 2025-05-15 - Optimizing n8n for Resource-Constrained Environments
**Learning:** Running n8n on Render's free tier (512MB RAM) is challenging. The default execution mode (`own`) spawns a new Node.js process for every workflow execution, which can easily exceed memory limits and adds significant overhead.
**Action:** Always prefer `EXECUTIONS_PROCESS=main` for low-memory environments to keep everything in a single process, reducing memory usage and improving execution start times.

## 2025-05-16 - Disabling n8n Telemetry for Performance
**Learning:** Telemetry collection and transmission add background CPU and network overhead, which can be significant in resource-constrained environments like Render's free tier (512MB RAM).
**Action:** Set `N8N_DIAGNOSTICS_ENABLED: false` in `render.yaml` to ensure more resources are available for workflow execution.

## 2026-02-28 - Preventing OOM Kills with max-old-space-size
**Learning:** In environments with strict memory limits (like Render's 512MB free tier), Node.js may not garbage collect frequently enough, leading to OOM kills.
**Action:** Set `NODE_OPTIONS: --max-old-space-size=384` to force proactive garbage collection before reaching the platform's hard limit, leaving headroom for non-heap memory.
