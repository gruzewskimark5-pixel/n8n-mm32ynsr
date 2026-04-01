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

## 2026-03-15 - Optimizing Memory and Overhead with Binary Data Mode and Version Checks
**Learning:** n8n's default in-memory binary data storage is a major OOM risk on Render's 512MB free tier when processing files or large payloads. Additionally, background version checks add unnecessary CPU and network overhead.
**Action:** Set `N8N_DEFAULT_BINARY_DATA_MODE: filesystem` to offload large payloads to ephemeral disk and `N8N_VERSION_NOTIFICATIONS_ENABLED: false` to minimize idle resource consumption.

## 2026-03-20 - Optimizing I/O and CPU with Log Level Verbosity
**Learning:** For n8n on Render's free tier (512MB RAM), high log verbosity (like the default 'info') can cause unnecessary CPU and I/O overhead during frequent workflow executions, which can impact overall performance and responsiveness in such a resource-constrained environment.
**Action:** Set 'N8N_LOG_LEVEL: warn' in 'render.yaml' to suppress non-critical information logs while still capturing errors and warnings for troubleshooting.

## 2026-03-21 - Security Over Performance: Re-enabling Version Notifications
**Learning:** While disabling version check notifications reduces idle resource consumption on Render's free tier, it creates a security vulnerability by preventing users from receiving critical update alerts. Security maintenance and update awareness take precedence over minor performance gains.
**Action:** Re-enabled 'N8N_VERSION_NOTIFICATIONS_ENABLED: true' in 'render.yaml' to ensure users are promptly notified of security patches and new releases.

## 2026-03-22 - Managing Database Bloat with Workflow History Pruning
**Learning:** n8n v1+ includes a workflow history feature that saves a version of the workflow every time it is saved. In environments with strict database storage limits (like Render's 1GB free tier), this can lead to rapid database bloat, increased query latency, and potential disk exhaustion.
**Action:** Set `N8N_WORKFLOW_HISTORY_PRUNE_TIME` in `render.yaml` to a reasonable limit (e.g., 168 hours / 7 days) to ensure the `workflow_history` table remains lean and performant.

## 2026-03-23 - Avoiding Ambiguous Diffs in Performance PRs
**Learning:** Combining unrelated configuration cleanups with performance optimizations can lead to confusing diffs and review rejections. A previous attempt to remove a duplicate security-critical setting while adding workflow history pruning was misinterpreted as an accidental deletion and a regression.
**Action:** Always ensure that any "cleanup" performed alongside an optimization is clearly documented or, better yet, consolidate the related configuration into a single unmistakable block to avoid misinterpretation of intent during code review.

## 2026-03-24 - Strengthening Database Efficiency with Workflow History Limits
**Learning:** While n8n execution data pruning is well-documented, workflow history pruning is often overlooked. On Render's 1GB free tier database, the `workflow_history` table can grow rapidly as users iterate on complex workflows. Time-based pruning (`N8N_WORKFLOW_HISTORY_PRUNE_TIME`) is good, but adding a count-based limit (`N8N_WORKFLOW_HISTORY_PRUNE_LIMIT`) provides a critical secondary safeguard against database bloat for high-frequency savers.
**Action:** Always combine `N8N_WORKFLOW_HISTORY_PRUNE_TIME` and `N8N_WORKFLOW_HISTORY_PRUNE_LIMIT` in resource-constrained environments to ensure the `workflow_history` table remains lean and performant.

## 2026-03-25 - Reducing Background Overhead by Disabling Personalization
**Learning:** n8n's personalization flow, which includes initial setup questions and periodic background requests for personalized content, adds unnecessary CPU and network overhead. In resource-constrained environments like Render's 512MB free tier, every reduction in background processing improves stability and performance.
**Action:** Set `N8N_PERSONALIZATION_ENABLED: "false"` in `render.yaml` to eliminate this overhead and provide a leaner, more efficient "production-ready" setup.

## 2026-03-26 - Reducing Startup Noise and Minor Overhead
**Learning:** n8n's hiring banner is enabled by default and outputs to the console. While minor, disabling it reduces log noise and eliminates the small processing step required to display it, aligning with the "every millisecond counts" philosophy for resource-constrained environments.
**Action:** Set `N8N_HIRING_BANNER_ENABLED: "false"` in `render.yaml`.

## 2026-03-27 - Optimizing UI and Production Readiness with Release Type
**Learning:** By default, n8n may display a '[DEV]' prefix in the browser tab, which can indicate it's not running in its most optimized production state. In resource-constrained environments like Render's 512MB free tier, every reduction in unnecessary UI processing or development-related checks is a win.
**Action:** Set `N8N_RELEASE_TYPE: stable` in `render.yaml` to ensure the instance is explicitly configured for production use, providing a cleaner UI and ensuring n8n uses its most efficient execution paths.

## 2026-03-28 - Minimizing Database I/O with Execution Data Settings
**Learning:** For n8n on Render's free tier, database I/O is a significant performance bottleneck. By default, n8n attempts to save progress for every node execution and keep a history of manual "test" runs. These writes add unnecessary latency and consume limited storage.
**Action:** Set `EXECUTIONS_DATA_SAVE_ON_PROGRESS: "false"` and `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS: "false"` in `render.yaml` to ensure only essential production execution failures are persisted, significantly reducing database write pressure.

## 2026-03-29 - Preventing Resource Exhaustion with Global Execution Timeouts
**Learning:** In resource-constrained environments like Render's 512MB free tier, runaway workflows (e.g., infinite loops or hung HTTP requests) can indefinitely consume CPU and RAM, leading to OOM kills or severe platform throttling. n8n does not have a global execution timeout enabled by default.
**Action:** Set `N8N_EXECUTIONS_TIMEOUT` and `N8N_EXECUTIONS_TIMEOUT_MAX` to a sensible default (e.g., 3600 seconds) in `render.yaml` to provide a critical stability safety net that automatically reclaims resources from stalled or inefficient workflows.

## 2026-03-30 - Reducing Database Lookups with Workflow Caching
**Learning:** For frequently triggered workflows, n8n's default behavior of fetching the workflow definition from the database for every execution adds unnecessary I/O overhead and latency. In resource-constrained environments like Render's free tier, this can lead to database connection exhaustion and slower response times.
**Action:** Set `N8N_WORKFLOW_RUN_LOCAL_CACHE: "true"` in `render.yaml` to cache workflow definitions in memory, significantly reducing database pressure and improving execution startup performance.

## 2026-03-31 - Improving Connection Headroom with Larger Pool Size
**Learning:** Setting the database connection pool size equal to the production concurrency limit can lead to contention. n8n requires connections for background heartbeats, UI requests, and metadata updates in addition to workflow executions. Contrary to previous assumptions of a strict 5-connection limit on Render Free Tier, modern Render Postgres supports up to 97 connections.
**Action:** Increase `DB_POSTGRESDB_POOL_SIZE` (e.g., to 10) while keeping `N8N_CONCURRENCY_PRODUCTION_LIMIT` lower (e.g., 5). This provides a performance buffer for system tasks and UI responsiveness without exceeding platform limits or impacting memory.

## 2026-04-01 - Reducing Background Database Heartbeat Overhead
**Learning:** By default, n8n heartbeats the database every 2 seconds to verify reachability. In resource-constrained environments like Render Free Tier (512MB RAM), this high-frequency heartbeat creates constant background network and CPU activity that can interfere with execution performance and startup times. Increasing this interval reduces idle overhead without sacrificing stability.
**Action:** Set `DB_PING_INTERVAL_SECONDS` (added in n8n v1.92.2) to a higher value (e.g., 60 seconds) in `render.yaml` to minimize background I/O pressure.
