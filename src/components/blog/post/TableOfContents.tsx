
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TableOfContentsProps {
    tableOfContents: any[];
}

const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
    if (!tableOfContents || tableOfContents.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
            </CardHeader>
            <CardContent>
                <nav className="space-y-2">
                    {tableOfContents.map((item, index) => (
                        <a 
                            key={index} 
                            href={`#${item.id}`} 
                            className="block text-sm text-gray-600 hover:text-green-600 py-1 border-l-2 border-transparent hover:border-green-600 pl-3 transition-colors"
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>
            </CardContent>
        </Card>
    );
};

export default TableOfContents;
