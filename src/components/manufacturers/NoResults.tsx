
interface NoResultsProps {
    searchTerm: string;
}

const NoResults = ({ searchTerm }: NoResultsProps) => {
    return (
        <div className="text-center w-full col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 py-20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Keine Ergebnisse</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                Für Ihre Suche nach "{searchTerm}" konnten keine Hersteller gefunden werden.
            </p>
        </div>
    );
};

export default NoResults;
