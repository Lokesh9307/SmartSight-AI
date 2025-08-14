"use client"

import type { ComponentProps } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface DataChartProps {
  data: any[]
  type: "line" | "bar"
  dataKey: string
  xAxisKey: string
  chartConfig: ChartConfig
  className?: string
}

export function DataChart({
  data,
  type,
  dataKey,
  xAxisKey,
  chartConfig,
  className,
}: DataChartProps) {
  const ChartComponent = type === "line" ? LineChart : BarChart
  const ChartElement = type === "line" ? Line : Bar

  return (
    <ChartContainer config={chartConfig} className={cn("h-full w-full", className)}>
      <ChartComponent
        accessibilityLayer
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={3}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator={type === "line" ? "line" : "dot"} hideLabel />}
        />
        <ChartElement
          dataKey={dataKey}
          strokeWidth={2}
          fill={`var(--color-${dataKey})`}
          stroke={`var(--color-${dataKey})`}
          radius={type === "bar" ? 4 : 0}
        />
      </ChartComponent>
    </ChartContainer>
  )
}
