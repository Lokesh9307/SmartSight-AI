"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRecommendations } from "@/app/actions";
import { Lightbulb, Zap, Wrench, RefreshCw, Loader2 } from "lucide-react";
import type { GenerateEfficiencyRecommendationsOutput } from "@/ai/flows/generate-efficiency-recommendations";
import { Skeleton } from "@/components/ui/skeleton";

type Recommendation = {
    title: string;
    category: 'Energy' | 'Maintenance' | 'Operational';
}

const categoryIcons = {
    Energy: <Zap className="h-5 w-5 text-yellow-500" />,
    Maintenance: <Wrench className="h-5 w-5 text-blue-500" />,
    Operational: <Lightbulb className="h-5 w-5 text-green-500" />,
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<GenerateEfficiencyRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecommendations = async () => {
    setIsLoading(true);
    const data = await fetchRecommendations();
    setRecommendations(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Efficiency Recommendations</h2>
          <p className="text-muted-foreground">AI-driven suggestions to optimize building performance.</p>
        </div>
        <Button onClick={loadRecommendations} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? renderSkeletons() : (
          <>
            {recommendations?.recommendations.map((rec, index) => {
              const category = rec.includes("energy") ? "Energy" : rec.includes("maintenance") ? "Maintenance" : "Operational";
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rec}</CardTitle>
                      {categoryIcons[category]}
                    </div>
                    <CardDescription>{category} Suggestion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {recommendations.rationale.split('.')[index] || recommendations.rationale}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </>
        )}
      </div>
    </div>
  );
}
