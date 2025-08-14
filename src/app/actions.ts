// src/app/actions.ts
'use server';

import {
  answerBuildingQuery,
  AnswerBuildingQueryInput,
  AnswerBuildingQueryOutput,
} from '@/ai/flows/answer-building-queries';
import {
  generateEfficiencyRecommendations,
  GenerateEfficiencyRecommendationsInput,
  GenerateEfficiencyRecommendationsOutput,
} from '@/ai/flows/generate-efficiency-recommendations';
import {
    summarizeAnomalousEvents,
    SummarizeAnomalousEventsInput,
    SummarizeAnomalousEventsOutput,
} from '@/ai/flows/summarize-anomalous-events';

// Mock data for flows that need it.
const MOCK_SENSOR_SUMMARY = "Average temperature: 22°C, Energy consumption: 512 kWh, Humidity: 45%, Air Quality Index: 30.";
const MOCK_KNOWLEDGE_BASE_CHUNKS = [
    "Section 3.1: HVAC unit must be serviced every 6 months. Filter model is XYZ-123.",
    "Section 5.2: Optimal operating temperature is between 20°C and 24°C.",
];
const MOCK_MAINTENANCE_EXCERPTS = "HVAC system efficiency drops by 15% if filters are not replaced every 3 months. Recommended filter: CleanAir-5000.";

export async function handleRagQuery(
  question: string
): Promise<AnswerBuildingQueryOutput> {
  const input: AnswerBuildingQueryInput = {
    question,
    buildingId: 'building-01',
    retrievedChunks: MOCK_KNOWLEDGE_BASE_CHUNKS,
    sensorSummary: MOCK_SENSOR_SUMMARY,
  };
  try {
    // Adding a delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await answerBuildingQuery(input);
    return result;
  } catch (error) {
    console.error('Error in RAG query:', error);
    return {
      answer: "Sorry, I encountered an error while processing your question. Please check the server logs for more details.",
      sources: [],
    };
  }
}

export async function fetchRecommendations(): Promise<GenerateEfficiencyRecommendationsOutput> {
  const input: GenerateEfficiencyRecommendationsInput = {
    buildingId: 'building-01',
    sensorDataSummary: MOCK_SENSOR_SUMMARY,
    maintenanceManualExcerpts: MOCK_MAINTENANCE_EXCERPTS,
  };
  try {
    // Adding a delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = await generateEfficiencyRecommendations(input);
    return result;
  } catch (error) {
      console.error('Error fetching recommendations:', error);
      return {
          recommendations: ["Could not fetch recommendations. An error occurred."],
          rationale: "There was an issue with the AI service. Please try again later.",
      }
  }
}
