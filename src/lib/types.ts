export interface SensorDataPoint {
  time: string;
  value: number;
}

export interface Sensor {
  id: string;
  name: string;
  type: 'temperature' | 'energy' | 'air_quality' | 'vibration';
  unit: string;
  data: SensorDataPoint[];
  status: 'ok' | 'warning' | 'critical';
  currentValue: number;
}

export interface Anomaly {
  id: string;
  timestamp: string;
  sensor: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  category: 'Energy' | 'Maintenance' | 'Operational';
}

export interface BuildingDocument {
  id: string;
  name: string;
  type: 'Maintenance Manual' | 'Building Specification';
  uploadDate: string;
  size: string;
}

export interface RagMessage {
    id: string;
    type: 'user' | 'ai';
    text: string;
    sources?: string[];
}
