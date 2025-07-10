
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, DollarSign } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  onPriceFilter: (range: { min: number; max: number }) => void;
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  priceRange: { min: number; max: number };
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onCategoryFilter,
  onPriceFilter,
  categories,
  searchTerm,
  selectedCategory,
  priceRange
}) => {
  const handlePriceChange = (values: number[]) => {
    onPriceFilter({ min: values[0], max: values[1] });
  };

  return (
    <Card className="backdrop-blur-sm bg-white/5 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Filter className="h-5 w-5" />
          Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-gray-300">Search Products</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Category</Label>
          <Select value={selectedCategory} onValueChange={onCategoryFilter}>
            <SelectTrigger className="bg-white/10 border-gray-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white">
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-300 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Range
          </Label>
          <div className="px-2">
            <Slider
              value={[priceRange.min, priceRange.max]}
              onValueChange={handlePriceChange}
              min={0}
              max={100000}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>₹{priceRange.min.toLocaleString()}</span>
            <span>₹{priceRange.max.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
