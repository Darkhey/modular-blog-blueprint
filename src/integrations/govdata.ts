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
  const response = await fetch(
    'https://www.govdata.de/ckan/api/3/action/package_search?q=f%C3%B6rderprogramm%20bund'
  );
  const json = await response.json();
  const packages: GovDataPackage[] = json.result?.results ?? [];
  return packages.map((pkg) => ({
    title: pkg.title,
    description: pkg.notes,
    url: pkg.url ?? pkg.resources?.[0]?.url ?? '#'
  }));
}
