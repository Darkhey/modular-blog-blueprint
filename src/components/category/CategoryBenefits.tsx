
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Award } from 'lucide-react';
import { getBenefitsForCategory } from '@/data/categoryBenefits';

interface CategoryBenefitsProps {
    categoryId: string;
    color: string;
}

const CategoryBenefits = ({ categoryId, color }: CategoryBenefitsProps) => {
    const benefits = getBenefitsForCategory(categoryId);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: color }}>
                <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
                </CardHeader>
                <CardContent>
                <CardDescription className="text-gray-600">
                    {benefit.description}
                </CardDescription>
                {benefit.savings && (
                    <div className="mt-3 flex items-center space-x-2">
                    <Award className="text-orange-500 w-4 h-4" />
                    <span className="text-sm font-medium text-orange-600">
                        Einsparung: {benefit.savings}
                    </span>
                    </div>
                )}
                </CardContent>
            </Card>
            ))}
        </div>
    );
};

export default CategoryBenefits;
