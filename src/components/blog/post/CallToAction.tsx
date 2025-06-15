
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CallToAction = () => (
    <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bereit für Ihre energetische Sanierung?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
                Lassen Sie sich von unseren Experten beraten und finden Sie die optimale Lösung für Ihr Zuhause. 
                Wir helfen Ihnen bei der Planung, Finanzierung und Umsetzung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    to="/kontakt"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                    Kostenlose Beratung anfragen
                </Link>
                <Link 
                    to="/foerdermittel"
                    className="inline-flex items-center justify-center px-8 py-4 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                >
                    Fördermittel prüfen
                </Link>
            </div>
        </CardContent>
    </Card>
);

export default CallToAction;
