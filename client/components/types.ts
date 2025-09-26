// client/components/types.ts
export type CoffeeStatus = {
  id: number;
  cupsLeft: number;
  temperatureC: number;
  strength: number;
  waterPH: number;
  waterColor: string;
  creator: string;
  capacity?: number;
  updatedAt?: string;
};

export type CoffeeHistoryEntry = {
  id: number;
  timestamp: string;
  cupsServed: number;
  avgTempC: number;
  avgStrength: number;
  avgPH: number;
  wasteWaterColor: string;
};

export type TrendPoint = CoffeeHistoryEntry & { tLabel: string };
export type RangeKey = 'all' | '1h' | '3h';
