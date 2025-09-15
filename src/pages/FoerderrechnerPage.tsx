import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import { getFederalPrograms, FederalProgram } from '@/integrations/govdata';
import { useQuery } from '@tanstack/react-query';

const FoerderrechnerPage = () => {
  const { data: programs = [], error, isLoading } = useQuery<FederalProgram[], Error>({
    queryKey: ['federal-programs'],
    queryFn: getFederalPrograms,
  });

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
          {error && <p className="text-red-500">{error.message}</p>}
          <ul className="space-y-4">
            {!error && !isLoading && programs.length === 0 && (
              <li className="p-4 border rounded text-gray-600">Keine Programme gefunden.</li>
            )}
            {isLoading && (
              <li className="p-4 border rounded text-gray-600">Lade Programme…</li>
            )}
            {programs.map((program, i) => (
              <li
                key={program.url !== '#' ? program.url : `${program.title}-${i}`}
                className="p-4 border rounded"
              >
                {program.url === '#' ? (
                  <span className="font-semibold">{program.title}</span>
                ) : (
                  <a
                    href={program.url}
                    className="font-semibold text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {program.title}
                  </a>
                )}
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
