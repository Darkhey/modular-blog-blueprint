
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPost } from '@/hooks/useBlogPosts';

interface QuickFactsProps {
    post: Pick<BlogPost, 'difficulty' | 'read_time' | 'topic'>;
}

const QuickFacts = ({ post }: QuickFactsProps) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg">Schnelle Fakten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">Schwierigkeit</span>
                <div className="flex space-x-1">
                    {[...Array(post.difficulty || 2)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ))}
                     {[...Array(3 - (post.difficulty || 2))].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">Lesezeit</span>
                <span className="text-sm font-medium">{post.read_time} Min.</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">Kategorie</span>
                <span className="text-sm font-medium text-green-600">{post.topic}</span>
            </div>
        </CardContent>
    </Card>
);

export default QuickFacts;
