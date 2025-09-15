export interface ElectricityPrice {
  date: string;
  eurPerKwh: number;
}

interface EnergyChartsResponse {
  price: number[];
  unix_seconds: number[];
}

export async function fetchLatestElectricityPrice(): Promise<ElectricityPrice> {
  const today = new Date().toISOString().split('T')[0];
  const url = `https://api.energy-charts.info/price?start=${today}&end=${today}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch electricity price');
  }
  const data: EnergyChartsResponse = await res.json();
  const { price, unix_seconds } = data;
  if (!price?.length || !unix_seconds?.length) {
    throw new Error('Malformed price data');
  }
  const latestIndex = price.length - 1;
  return {
    date: new Date(unix_seconds[latestIndex] * 1000).toISOString(),
    eurPerKwh: price[latestIndex] / 1000
  };
}
