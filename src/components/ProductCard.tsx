
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Tag, Store } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  category: string;
  source: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group backdrop-blur-sm bg-white/5 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
              {product.title}
            </h3>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 shrink-0">
              {product.category}
            </Badge>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-400">
              {product.price}
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Store className="h-3 w-3" />
              {product.source}
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
            onClick={() => window.open(product.link, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
