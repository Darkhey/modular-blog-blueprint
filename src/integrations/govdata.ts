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

  interface CkanSearchResponse {
    success: boolean;
    result?: { results?: GovDataPackage[] };
  }

export interface FederalProgram {
  title: string;
  description?: string;
  url?: string | null;
}

const sanitizeUrl = (raw?: string): string | null => {
  try {
    const u = new URL(raw ?? '');
    return u.protocol === 'https:' ? u.toString() : null;
  } catch {
    return null;
  }
};

    url: sanitizeUrl(pkg.url ?? pkg.resources?.[0]?.url)

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal });
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('GovData request timed out after 10s');
    }
    throw e;
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    throw new Error(`GovData request failed: ${res.status}`);
  }
  const json: CkanSearchResponse = await res.json();
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
