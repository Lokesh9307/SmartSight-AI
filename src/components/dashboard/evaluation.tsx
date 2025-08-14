"use client";

import { BarChart, BrainCircuit, BotMessageSquare, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/stat-card";
import { mockEvaluationMetrics } from "@/lib/data";
import { DataChart } from "@/components/common/data-chart";
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { metric: "Retrieval", value: 0.92, fill: "var(--color-retrieval)" },
  { metric: "MRR", value: 0.89, fill: "var(--color-mrr)" },
  { metric: "Model AUC", value: 0.88, fill: "var(--color-auc)" },
];

const chartConfig = {
  value: {
    label: "Score",
  },
  retrieval: {
    label: "Retrieval Acc.",
    color: "hsl(var(--chart-1))",
  },
  mrr: {
    label: "MRR",
    color: "hsl(var(--chart-2))",
  },
  auc: {
    label: "Model AUC",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function Evaluation() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Retrieval Accuracy" value={`${(mockEvaluationMetrics.retrievalAccuracy * 100).toFixed(0)}%`} icon={BotMessageSquare} />
        <StatCard title="Query Latency (p95)" value={`${mockEvaluationMetrics.queryLatency}ms`} icon={Gauge} />
        <StatCard title="Ingestion Lag" value={`${mockEvaluationMetrics.ingestionLag}s`} icon={Gauge} />
        <StatCard title="Predictive Model AUC" value={mockEvaluationMetrics.modelAuc.toFixed(2)} icon={BrainCircuit} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
            <DataChart 
              type="bar"
              data={chartData}
              dataKey="value"
              xAxisKey="metric"
              chartConfig={chartConfig}
            />
        </CardContent>
      </Card>
    </div>
  );
}
