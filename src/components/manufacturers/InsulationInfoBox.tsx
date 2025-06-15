
const InsulationInfoBox = () => {
    return (
        <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    💡 Welcher Dämmstoff passt zu Ihrem Projekt?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                    Die Wahl des richtigen Dämmstoffs hängt von vielen Faktoren ab: Einsatzbereich,
                    Budget, ökologische Anforderungen und bauphysikalische Eigenschaften.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                        <div className="text-4xl mb-2">🌱</div>
                        <h4 className="font-bold text-green-600">Ökologisch</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Holzfaser, Zellulose, Naturdämmstoffe</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-2">🔥</div>
                        <h4 className="font-bold text-red-600">Brandschutz</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Steinwolle, Mineralwolle</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-2">💰</div>
                        <h4 className="font-bold text-blue-600">Preis-Leistung</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Glaswolle, EPS, Einblasdämmung</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsulationInfoBox;
