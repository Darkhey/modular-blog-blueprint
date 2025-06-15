
import React, { useEffect, useState } from "react";
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

// Helper function to fetch open graph image from jsonlink.io
const fetchOpenGraphImage = async (url: string): Promise<string | null> => {
  try {
    const apiUrl = `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.images && data.images.length > 0) {
      return data.images[0];
    }
    if (data.thumbnail) {
      return data.thumbnail;
    }
    return null;
  } catch (_err) {
    return null;
  }
};

// Fallback stock photos for each category
const getStockPhoto = (id: string): string => {
  const stockPhotos: Record<string, string> = {
    'heizung': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    'beleuchtung': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'energiemanagement': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'sicherheit': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'haushalt': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'entertainment': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
  };
  
  return stockPhotos[id] || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop';
};

const SmartHomeCategoryCard: React.FC<SmartHomeCategoryCardProps> = ({
  id, title, description, image, alt, product, onAffiliateClick,
}) => {
  const [affiliateImage, setAffiliateImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const getOgImage = async () => {
      if (product?.link) {
        const img = await fetchOpenGraphImage(product.link);
        if (!ignore && img) {
          setAffiliateImage(img);
        }
      }
    };
    getOgImage();
    return () => { ignore = true; };
  }, [product?.link]);

  // Priority: OG image > original image > stock photo
  const getImageSrc = (): string => {
    if (affiliateImage && imageLoaded && !imageError) {
      return affiliateImage;
    }
    if (image && !image.includes('placeholder.svg')) {
      return image;
    }
    return getStockPhoto(id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Card
      id={id}
      className="flex flex-col h-full shadow-md border-green-100 hover:border-green-400 hover:shadow-lg transition-all group"
    >
      <CardHeader className="pb-3">
        <div className="w-full aspect-video rounded-lg overflow-hidden mb-0 bg-gray-100 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageSrc()}
            alt={alt}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            draggable={false}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ backgroundColor: "#e5e7eb" }}
          />
        </div>
        <CardTitle className="mt-4 text-lg sm:text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pb-1">
        <p className="text-sm text-gray-600">{description}</p>
        {product && (
          <div className="mt-4">
            <h4 className="font-semibold text-base mb-2 text-green-700">Produktempfehlung:</h4>
            <div className="text-gray-700 text-sm font-medium">{product.name}</div>
            <div className="text-gray-500 mb-2">{product.description}</div>
          </div>
        )}
      </CardContent>
      {product && (
        <CardFooter className="pt-0 mt-auto">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full"
            onClick={onAffiliateClick}
            aria-label={`Bei Amazon ansehen: ${product.name}`}
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
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
