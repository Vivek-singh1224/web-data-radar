
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Filter, TrendingUp, Globe } from 'lucide-react';

interface StatsDisplayProps {
  products: any[];
  totalProducts: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ products, totalProducts }) => {
  const categories = new Set(products.map(p => p.category)).size;
  const sources = new Set(products.map(p => p.source)).size;
  const avgPrice = products.length > 0 ? 
    products.reduce((sum, p) => {
      const price = parseInt(p.price.replace(/[₹,]/g, '')) || 0;
      return sum + price;
    }, 0) / products.length : 0;

  const stats = [
    { icon: Package, label: 'Total Products', value: totalProducts, color: 'text-blue-400' },
    { icon: Filter, label: 'Filtered Results', value: products.length, color: 'text-green-400' },
    { icon: Globe, label: 'Categories', value: categories, color: 'text-purple-400' },
    { icon: TrendingUp, label: 'Avg Price', value: `₹${avgPrice.toLocaleString()}`, color: 'text-yellow-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="backdrop-blur-sm bg-white/5 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
