
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface KeyBenefitsProps {
    post: Pick<BlogPost, 'key_benefits'>;
}

const KeyBenefits = ({ post }: KeyBenefitsProps) => {
    if (!post.key_benefits || post.key_benefits.length === 0) return null;

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={24} />
                    <span>Hauptvorteile</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.key_benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                            <span className="text-gray-700">{benefit}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default KeyBenefits;
