
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";

interface SmartHomeCategoryCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  product?: {
    name: string;
    description: string;
    link: string;
  };
  onAffiliateClick: () => void;
}

const SmartHomeCategoryCard: React.FC<SmartHomeCategoryCardProps> = ({
  id, title, description, image, alt, product, onAffiliateClick,
}) => {
  return (
    <Card id={id} className="flex flex-col hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{description}</p>
        {product && (
          <div className="mt-4">
            <h4 className="font-semibold text-base mb-2">Produktempfehlung:</h4>
            <div className="text-gray-700 text-sm">{product.name}</div>
            <div className="text-gray-500 mb-2">{product.description}</div>
          </div>
        )}
      </CardContent>
      {product && (
        <CardFooter>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full"
            onClick={onAffiliateClick}
          >
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <LinkIcon className="mr-2 h-4 w-4" />
              Bei Amazon ansehen*
            </Button>
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default SmartHomeCategoryCard;

