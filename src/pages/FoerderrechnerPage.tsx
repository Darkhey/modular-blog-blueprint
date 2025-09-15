import { useEffect, useState } from 'react';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import { getFederalPrograms, FederalProgram } from '@/integrations/govdata';

const FoerderrechnerPage = () => {
  const [programs, setPrograms] = useState<FederalProgram[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFederalPrograms()
      .then(setPrograms)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <BreadcrumbNavigation
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Rechner & Tools', href: '/wissenswertes/tools' },
              { label: 'Förderrechner' }
            ]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Förderrechner</h1>
          <p className="text-gray-600 text-lg mb-8">
            Aktuelle Bundesförderprogramme aus dem offenen GovData-Portal.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-4">
            {programs.map((program, index) => (
              <li key={index} className="p-4 border rounded">
                <a
                  href={program.url}
                  className="font-semibold text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {program.title}
                </a>
                {program.description && (
                  <p className="text-sm text-gray-600">{program.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default FoerderrechnerPage;
