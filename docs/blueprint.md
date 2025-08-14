# **App Name**: SmartSight AI

## Core Features:

- Real-Time Data Ingestion: Ingest and process real-time IoT sensor data from MQTT streams, focusing on building telemetry.
- Document Knowledge Base: Enable users to upload maintenance manuals and building specifications (PDFs). Chunk documents by sections and create embeddings for a RAG knowledge base using Chroma.
- Efficiency Recommendations: Generate actionable operational efficiency optimization recommendations based on sensor data and knowledge base information. LLM acts as a tool to correlate.
- Anomaly Detection: Detect anomalies in real-time sensor data using Isolation Forest to flag unusual events.
- Real-time Dashboard: Present current sensor readings, building performance KPIs, and system status on a single-page dashboard.
- RAG Chat Interface: Integrate a chat panel with RAG to provide document-grounded responses to user questions about the building or systems, citing document references.
- Environment Configuration: Configuration settings stored via python-dotenv with sensible defaults and the option of optional external AI provider API keys.

## Style Guidelines:

- Primary color: Soft blue (#74A3B7) to evoke a sense of calm and intelligence, reflecting the data-driven nature of the application.
- Background color: Light gray (#F0F4F5), a desaturated variant of the primary, for a clean and professional look.
- Accent color: Warm orange (#D98E5B), analogous to the primary hue, to draw attention to alerts, important metrics and actionable items.
- Body and headline font: 'Inter' sans-serif for a neutral and modern look. Its clear readability supports data-heavy displays.
- Use simple, line-based icons to represent sensors, equipment, and metrics.
- Dashboard layout should be modular with expandable sections for focusing on key data points. Integrate prominent alert display area.
- Subtle transitions when sensor values change or alerts are triggered, with non-intrusive loading indicators.