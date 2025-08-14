'use server';

/**
 * @fileOverview Implements the Genkit flow for answering questions about building procedures and specifications.
 *
 * - answerBuildingQuery - A function that handles the process of answering building-related queries.
 * - AnswerBuildingQueryInput - The input type for the answerBuildingQuery function.
 * - AnswerBuildingQueryOutput - The return type for the answerBuildingQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerBuildingQueryInputSchema = z.object({
  question: z.string().describe('The question about the building.'),
  buildingId: z.string().describe('The ID of the building.'),
  retrievedChunks: z.array(z.string()).describe('The chunks retrieved from the knowledge base.'),
  sensorSummary: z.string().describe('A summary of recent sensor data.'),
});
export type AnswerBuildingQueryInput = z.infer<typeof AnswerBuildingQueryInputSchema>;

const AnswerBuildingQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type AnswerBuildingQueryOutput = z.infer<typeof AnswerBuildingQueryOutputSchema>;

export async function answerBuildingQuery(input: AnswerBuildingQueryInput): Promise<AnswerBuildingQueryOutput> {
  return answerBuildingQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerBuildingQueryPrompt',
  input: {schema: AnswerBuildingQueryInputSchema},
  output: {schema: AnswerBuildingQueryOutputSchema},
  prompt: `You are a building operations expert. Answer the following question based on the provided building documents and sensor data.

Question: {{{question}}}

Building Documents:
{{#each retrievedChunks}}
---\n{{{this}}}
{{/each}}

Sensor Data Summary: {{{sensorSummary}}}

Answer:`, // Constrain the prompt and cite documents used
});

const answerBuildingQueryFlow = ai.defineFlow(
  {
    name: 'answerBuildingQueryFlow',
    inputSchema: AnswerBuildingQueryInputSchema,
    outputSchema: AnswerBuildingQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
