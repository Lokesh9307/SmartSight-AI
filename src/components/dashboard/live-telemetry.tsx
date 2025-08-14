"use client";

import React, { useState, useEffect } from "react";
import { Thermometer, Zap, Wind, Waves, Bell, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataChart } from "@/components/common/data-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockSensors, mockAnomalies } from "@/lib/data";
import type { Sensor, Anomaly } from "@/lib/types";
import type { ChartConfig } from "@/components/ui/chart";

const iconMap = {
  temperature: Thermometer,
  energy: Zap,
  air_quality: Wind,
  vibration: Waves,
};

const chartConfigMap: { [key in Sensor['type']]: ChartConfig } = {
  temperature: { value: { label: "Temp (°C)", color: "hsl(var(--chart-1))" } },
  energy: { value: { label: "Energy (kWh)", color: "hsl(var(--chart-2))" } },
  air_quality: { value: { label: "AQI", color: "hsl(var(--chart-1))" } },
  vibration: { value: { label: "Vibration (mm/s)", color: "hsl(var(--chart-2))" } },
};

export function LiveTelemetry() {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [anomalies] = useState<Anomaly[]>(mockAnomalies);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          const lastValue = sensor.data[sensor.data.length - 1].value;
          const fluctuation = lastValue * 0.05;
          const newValue = parseFloat((lastValue + (Math.random() - 0.5) * fluctuation).toFixed(2));
          const newPoint = {
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: newValue,
          };
          const newData = [...sensor.data.slice(1), newPoint];
          return { ...sensor, data: newData, currentValue: newValue };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { title: "Avg. Temperature", value: `${sensors.find(s=>s.type==='temperature')?.currentValue}°C`, icon: Thermometer },
    { title: "Energy Consumption", value: `${sensors.find(s=>s.type==='energy')?.currentValue} kWh`, icon: Zap },
    { title: "Avg. Air Quality", value: `${sensors.find(s=>s.type==='air_quality')?.currentValue} AQI`, icon: Wind },
    { title: "Active Alerts", value: anomalies.length, icon: Bell },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map(kpi => <StatCard key={kpi.title} {...kpi} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Anomalies</CardTitle>
            <CardDescription>Real-time alerts from the anomaly detection system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {anomalies.map(anomaly => (
              <Alert key={anomaly.id} variant={anomaly.severity === 'high' ? 'destructive' : 'default'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{anomaly.sensor}</AlertTitle>
                <AlertDescription>
                  {anomaly.description} ({anomaly.timestamp})
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
        
        {sensors.slice(0, 1).map((sensor) => (
          <Card key={sensor.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {React.createElement(iconMap[sensor.type], {className: "h-5 w-5"})}
                  {sensor.name}
                </div>
                <span className="text-sm font-normal text-muted-foreground ml-auto">
                  {sensor.currentValue} {sensor.unit}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] w-full">
              <DataChart
                type="line"
                data={sensor.data}
                dataKey="value"
                xAxisKey="time"
                chartConfig={chartConfigMap[sensor.type]}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sensors.slice(1).map((sensor) => (
          <Card key={sensor.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {React.createElement(iconMap[sensor.type], {className: "h-5 w-5"})}
                  {sensor.name}
                </div>
                <span className="text-sm font-normal text-muted-foreground ml-auto">
                  {sensor.currentValue} {sensor.unit}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[150px] w-full">
              <DataChart
                type="line"
                data={sensor.data}
                dataKey="value"
                xAxisKey="time"
                chartConfig={chartConfigMap[sensor.type]}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
