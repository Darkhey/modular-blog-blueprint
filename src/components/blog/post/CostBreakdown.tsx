
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPost } from '@/hooks/useBlogPosts';

interface CostBreakdownProps {
    post: Pick<BlogPost, 'costs'>;
}

const CostBreakdown = ({ post }: CostBreakdownProps) => {
    if (!post.costs || post.costs.length === 0) return null;

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Kostenübersicht</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-4">Maßnahme</th>
                                <th className="text-left py-2 px-4">Kosten pro m²</th>
                                <th className="text-left py-2 px-4">Gesamtkosten (EFH)</th>
                                <th className="text-left py-2 px-4">Förderung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.costs.map((cost: any, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4 font-medium">{cost.item}</td>
                                    <td className="py-2 px-4">{cost.costPerSqm}</td>
                                    <td className="py-2 px-4">{cost.totalCost}</td>
                                    <td className="py-2 px-4 text-green-600">{cost.funding}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default CostBreakdown;
