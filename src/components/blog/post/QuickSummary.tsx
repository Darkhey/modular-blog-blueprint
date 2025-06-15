
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, CheckCircle } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface QuickSummaryProps {
    post: Pick<BlogPost, 'savings_potential' | 'payback_time' | 'funding_available' | 'effort_level'>;
}

const QuickSummary = ({ post }: QuickSummaryProps) => (
  <Card className="mb-8 border-l-4 border-l-green-500">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center space-x-2 text-lg text-green-700">
        <Info size={20} />
        <span>Das Wichtigste auf einen Blick</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Einsparpotential:</h4>
          <p className="text-2xl font-bold text-green-600">{post.savings_potential || 'Bis zu 40%'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Amortisation:</h4>
          <p className="text-2xl font-bold text-blue-600">{post.payback_time || '8-12 Jahre'}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Förderung möglich:</h4>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-green-600 font-medium">{post.funding_available || 'Ja, bis zu 70%'}</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Aufwand:</h4>
          <p className="text-gray-700">{post.effort_level || 'Mittel'}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default QuickSummary;
