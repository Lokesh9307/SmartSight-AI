import type { Sensor, Anomaly, BuildingDocument, Recommendation } from './types';

function generateTimeSeriesData(points: number, startValue: number, fluctuation: number) {
  const data = [];
  let value = startValue;
  for (let i = 0; i < points; i++) {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (points - i));
    value += (Math.random() - 0.5) * fluctuation;
    data.push({ time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), value: parseFloat(value.toFixed(2)) });
  }
  return data;
}

export const mockSensors: Sensor[] = [
  {
    id: 'temp-1',
    name: 'HVAC Unit 1 Temperature',
    type: 'temperature',
    unit: '°C',
    data: generateTimeSeriesData(20, 22, 0.5),
    status: 'ok',
    currentValue: 22.1,
  },
  {
    id: 'energy-1',
    name: 'Main Power Consumption',
    type: 'energy',
    unit: 'kWh',
    data: generateTimeSeriesData(20, 510, 10),
    status: 'warning',
    currentValue: 512.5,
  },
  {
    id: 'air-1',
    name: 'Lobby Air Quality',
    type: 'air_quality',
    unit: 'AQI',
    data: generateTimeSeriesData(20, 30, 2),
    status: 'ok',
    currentValue: 31,
  },
  {
    id: 'vibration-1',
    name: 'Pump 2A Vibration',
    type: 'vibration',
    unit: 'mm/s',
    data: generateTimeSeriesData(20, 1.5, 0.8),
    status: 'critical',
    currentValue: 2.3,
  },
];

export const mockAnomalies: Anomaly[] = [
  {
    id: 'anomaly-1',
    timestamp: '2 minutes ago',
    sensor: 'Pump 2A Vibration',
    severity: 'high',
    description: 'Vibration levels exceed critical threshold. Potential bearing failure.',
  },
  {
    id: 'anomaly-2',
    timestamp: '15 minutes ago',
    sensor: 'Main Power Consumption',
    severity: 'medium',
    description: 'Unexpected spike in energy usage. Correlates with HVAC startup.',
  },
];

export const mockDocuments: BuildingDocument[] = [
    { id: 'doc-1', name: 'HVAC-Model-5000-Manual.pdf', type: 'Maintenance Manual', uploadDate: '2023-10-15', size: '2.5 MB' },
    { id: 'doc-2', name: 'Building-A-Specs.pdf', type: 'Building Specification', uploadDate: '2023-01-20', size: '8.1 MB' },
    { id: 'doc-3', name: 'Fire-Safety-Procedures.pdf', type: 'Maintenance Manual', uploadDate: '2022-07-30', size: '1.2 MB' },
];

export const mockInitialRecommendations: Recommendation[] = [
    {
      id: 'rec-1',
      title: "Adjust HVAC Setpoints",
      rationale: "Sensor data indicates the building is over-cooled during off-peak hours. Adjusting setpoints by 2°C can save up to 8% in energy costs.",
      category: "Energy",
    },
    {
      id: 'rec-2',
      title: "Schedule Predictive Maintenance for Pump 2A",
      rationale: "Vibration sensors on Pump 2A show increasing trends, suggesting a need for inspection within the next 30 days to prevent failure.",
      category: "Maintenance",
    },
];

export const mockEvaluationMetrics = {
    retrievalAccuracy: 0.92,
    mrr: 0.89,
    queryLatency: 850, // ms
    ingestionLag: 2.5, // seconds
    modelAuc: 0.88,
}
