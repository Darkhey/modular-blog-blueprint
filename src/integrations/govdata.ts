export interface FederalProgram {
  title: string;
  description?: string;
  url: string;
}

interface GovDataPackage {
  title: string;
  notes?: string;
  url?: string;
  resources?: { url: string }[];
}

export async function getFederalPrograms(): Promise<FederalProgram[]> {
  const url =
    'https://ckan.govdata.de/api/3/action/package_search?q=f%C3%B6rderprogramm%20bund&rows=50';

  const sanitizeUrl = (raw?: string): string => {
    try {
      const u = new URL(raw ?? '');
      return u.protocol === 'http:' || u.protocol === 'https:' ? u.toString() : '#';
    } catch {
      return '#';
    }
  };

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GovData request failed: ${res.status}`);
  }
  const json = await res.json();
  if (!json.success) {
    throw new Error('GovData API returned success=false');
  }
  const packages: GovDataPackage[] = json.result?.results ?? [];
  return packages.map((pkg) => ({
    title: pkg.title,
    description: pkg.notes,
    url: sanitizeUrl(pkg.url ?? pkg.resources?.[0]?.url)
  }));
}
