export interface SunshineData {
  sunshineHours: number; // durchschnittliche Stunden pro Tag
  sunnyDays: number; // Anzahl Tage mit >= 4h Sonne
  regionalFactor: number; // Faktor für Solarkalkulation
}

export async function fetchSunshineData(plz: string): Promise<SunshineData | null> {
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${plz}&count=1&language=de`);
    const geoJson = await geoRes.json();
    const geo = geoJson.results?.[0];
    if (!geo) return null;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&daily=sunshine_duration&timezone=Europe/Berlin&past_days=7&forecast_days=0`
    );
    const weatherJson = await weatherRes.json();
    const durations: number[] = weatherJson.daily?.sunshine_duration || [];
    if (!durations.length) return null;

    const hoursArray = durations.map(sec => sec / 3600);
    const sunnyDays = hoursArray.filter(h => h >= 4).length;
    const avgSunshineHours = hoursArray.reduce((a, b) => a + b, 0) / hoursArray.length;
    const annualSunshineHours = avgSunshineHours * 365;
    const regionalFactor = annualSunshineHours / 1600; // 1600h als Basis

    return {
      sunshineHours: avgSunshineHours,
      sunnyDays,
      regionalFactor,
    };
  } catch (err) {
    console.error('Failed to fetch sunshine data', err);
    return null;
  }
}
