import { config } from 'dotenv';
config();

import '@/ai/flows/answer-building-queries.ts';
import '@/ai/flows/generate-efficiency-recommendations.ts';
import '@/ai/flows/summarize-anomalous-events.ts';