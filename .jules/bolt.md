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

## 2026-03-02 - Optimizing Database Efficiency with Execution Data Pruning
**Learning:** On platforms with restricted database storage (like Render's 1GB free tier), workflow execution history can quickly consume disk space, leading to increased index sizes, slower queries, and potential service failures once the hard limit is reached.
**Action:** Implement aggressive execution data pruning by setting `EXECUTIONS_DATA_PRUNE: true`, `EXECUTIONS_DATA_MAX_AGE: 168` (7 days), and `EXECUTIONS_DATA_PRUNE_MAX_COUNT: 1000` to keep the database lean and maintain high query performance.

## 2026-03-05 - Reducing Database Connection Latency
**Learning:** n8n defaults to a Postgres connection pool size of 2. In scenarios with concurrent workflow executions, this small pool can become a bottleneck. However, Render's free tier Postgres limits connections to 5.
**Action:** Increase `DB_POSTGRESDB_POOL_SIZE` to 5 in `render.yaml` to maximize concurrency while staying within platform constraints, reducing connection acquisition wait times.

## 2026-03-10 - Preventing Service Unresponsiveness with Concurrency Limits
**Learning:** In resource-constrained environments (like Render's 512MB free tier), an unexpected surge in production workflow triggers can lead to event loop thrashing, causing the service to become unresponsive or crash due to resource exhaustion (CPU/RAM).
**Action:** Set `N8N_CONCURRENCY_PRODUCTION_LIMIT` in `render.yaml` to a small value (e.g., 5) to queue concurrent production executions, ensuring the service remains stable and responsive under load while aligning with database connection limits.
