export interface HouseholdEnergyConsumption {
  year: string;
  valueTJ: number;
}

export async function fetchHouseholdEnergyConsumption(): Promise<HouseholdEnergyConsumption> {
  const url = 'https://www-genesis.destatis.de/genesis-old/downloads/00/tables/85121-0001_00.csv';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch energy consumption data');
  }
  const text = await res.text();
  const lines = text.split('\n');
  const yearLine = lines.find((line) => line.startsWith(';;'));
  const dataLine = lines.find((line) => line.startsWith('PRIVATHH'));
  if (!yearLine || !dataLine) {
    throw new Error('Unexpected CSV format');
  }
  const years = yearLine.split(';').slice(2).map((y) => y.trim());
  const values = dataLine
    .split(';')
    .slice(2)
    .map((v) => Number(v.replace(',', '.')));
  const year = years[years.length - 1];
  const valueTJ = values[values.length - 1];
  return { year, valueTJ };
}
