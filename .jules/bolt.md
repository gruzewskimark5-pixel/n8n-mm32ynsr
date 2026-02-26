# Bolt's Journal - n8n on Render

## 2025-05-15 - Optimizing n8n for Resource-Constrained Environments
**Learning:** Running n8n on Render's free tier (512MB RAM) is challenging. The default execution mode (`own`) spawns a new Node.js process for every workflow execution, which can easily exceed memory limits and adds significant overhead.
**Action:** Always prefer `EXECUTIONS_PROCESS=main` for low-memory environments to keep everything in a single process, reducing memory usage and improving execution start times.
