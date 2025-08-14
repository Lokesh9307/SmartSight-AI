// src/ai/flows/generate-efficiency-recommendations.ts
'use server';

/**
 * @fileOverview Generates operational efficiency recommendations for smart buildings by analyzing real-time sensor data and maintenance manuals.
 *
 * - generateEfficiencyRecommendations - A function that generates operational efficiency recommendations.
 * - GenerateEfficiencyRecommendationsInput - The input type for the generateEfficiencyRecommendations function.
 * - GenerateEfficiencyRecommendationsOutput - The return type for the generateEfficiencyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEfficiencyRecommendationsInputSchema = z.object({
  buildingId: z.string().describe('The ID of the building to analyze.'),
  sensorDataSummary: z
    .string()
    .describe(
      'A summary of recent sensor data, including key metrics like temperature, humidity, and energy consumption.'
    ),
  maintenanceManualExcerpts: z
    .string()
    .describe(
      'Excerpts from maintenance manuals relevant to the building and its systems.'
    ),
});
export type GenerateEfficiencyRecommendationsInput = z.infer<
  typeof GenerateEfficiencyRecommendationsInputSchema
>;

const GenerateEfficiencyRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe(
      'A list of actionable recommendations for improving operational efficiency.'
    ),
  rationale: z
    .string()
    .describe(
      'A detailed explanation of the reasoning behind the recommendations, including references to sensor data and maintenance manuals.'
    ),
});
export type GenerateEfficiencyRecommendationsOutput = z.infer<
  typeof GenerateEfficiencyRecommendationsOutputSchema
>;

export async function generateEfficiencyRecommendations(
  input: GenerateEfficiencyRecommendationsInput
): Promise<GenerateEfficiencyRecommendationsOutput> {
  return generateEfficiencyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEfficiencyRecommendationsPrompt',
  input: {schema: GenerateEfficiencyRecommendationsInputSchema},
  output: {schema: GenerateEfficiencyRecommendationsOutputSchema},
  prompt: `You are an expert in building management and energy efficiency.

  Based on the following sensor data summary and maintenance manual excerpts, generate a list of actionable recommendations for improving operational efficiency in the building.

  Sensor Data Summary:
  {{sensorDataSummary}}

  Maintenance Manual Excerpts:
  {{maintenanceManualExcerpts}}

  Provide a detailed rationale for each recommendation, including references to the sensor data and maintenance manuals.

  Format your response as a JSON object with "recommendations" (an array of strings) and "rationale" (a string).
  `, // Ensure valid JSON format
});

const generateEfficiencyRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateEfficiencyRecommendationsFlow',
    inputSchema: GenerateEfficiencyRecommendationsInputSchema,
    outputSchema: GenerateEfficiencyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
