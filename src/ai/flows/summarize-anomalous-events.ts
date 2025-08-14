// SummarizeAnomalousEvents
'use server';
/**
 * @fileOverview Summarizes anomalous events in the building, including affected sensors and potential causes based on the knowledge base.
 *
 * - summarizeAnomalousEvents - A function that summarizes anomalous events.
 * - SummarizeAnomalousEventsInput - The input type for the summarizeAnomalousEvents function.
 * - SummarizeAnomalousEventsOutput - The return type for the summarizeAnomalousEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnomalousEventsInputSchema = z.object({
  buildingId: z.string().describe('The ID of the building to summarize anomalies for.'),
  anomalyData: z.string().describe('A summary of the recent anomaly data, including sensor names and anomaly scores.'),
  relevantKnowledgeBaseContent: z.string().describe('The content from the knowledge base relevant to the anomalies.'),
});
export type SummarizeAnomalousEventsInput = z.infer<typeof SummarizeAnomalousEventsInputSchema>;

const SummarizeAnomalousEventsOutputSchema = z.object({
  summary: z.string().describe('A summarized explanation of the detected anomalies, including potential causes.'),
});
export type SummarizeAnomalousEventsOutput = z.infer<typeof SummarizeAnomalousEventsOutputSchema>;

export async function summarizeAnomalousEvents(input: SummarizeAnomalousEventsInput): Promise<SummarizeAnomalousEventsOutput> {
  return summarizeAnomalousEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAnomalousEventsPrompt',
  input: {schema: SummarizeAnomalousEventsInputSchema},
  output: {schema: SummarizeAnomalousEventsOutputSchema},
  prompt: `You are an expert building engineer, summarizing anomalies detected in a building.

  Given the following anomaly data and relevant knowledge base content, provide a summarized explanation of the detected anomalies, including the affected sensors and potential causes. Your summary should be concise and easy to understand for building engineers.

  Anomaly Data:
  {{anomalyData}}

  Relevant Knowledge Base Content:
  {{relevantKnowledgeBaseContent}}`,
});

const summarizeAnomalousEventsFlow = ai.defineFlow(
  {
    name: 'summarizeAnomalousEventsFlow',
    inputSchema: SummarizeAnomalousEventsInputSchema,
    outputSchema: SummarizeAnomalousEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
