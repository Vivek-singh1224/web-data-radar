
import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { DataExport } from '@/components/DataExport';
import { CrawlForm } from '@/components/CrawlForm';
import { Header } from '@/components/Header';
import { StatsDisplay } from '@/components/StatsDisplay';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Radar } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  category: string;
  source: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const { toast } = useToast();

  // Sample data to demonstrate the interface
  const sampleProducts: Product[] = [
    {
      id: '1',
      title: 'NVIDIA RTX 4070 Super',
      description: 'High-performance graphics card for gaming and creative work',
      price: '₹58,000',
      link: 'https://example.com/rtx-4070',
      category: 'Graphics Cards',
      source: 'TechShop'
    },
    {
      id: '2',
      title: 'AMD Ryzen 7 7800X3D',
      description: '8-core gaming processor with 3D V-Cache technology',
      price: '₹35,500',
      link: 'https://example.com/ryzen-7800x3d',
      category: 'Processors',
      source: 'ComponentHub'
    },
    {
      id: '3',
      title: 'Samsung 980 PRO 2TB',
      description: 'PCIe 4.0 NVMe SSD with exceptional speed',
      price: '₹16,800',
      link: 'https://example.com/samsung-980-pro',
      category: 'Storage',
      source: 'TechMart'
    },
    {
      id: '4',
      title: 'Corsair RM850x PSU',
      description: '850W 80+ Gold modular power supply',
      price: '₹12,200',
      link: 'https://example.com/corsair-rm850x',
      category: 'Power Supply',
      source: 'PowerStore'
    },
    {
      id: '5',
      title: 'ASUS ROG Strix B650E',
      description: 'Premium AM5 motherboard with WiFi 6E',
      price: '₹28,900',
      link: 'https://example.com/asus-b650e',
      category: 'Motherboards',
      source: 'MoBo World'
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  const handleCrawlComplete = (newProducts: Product[]) => {
    setProducts(newProducts);
    setFilteredProducts(newProducts);
    toast({
      title: "Data Updated",
      description: `Successfully fetched ${newProducts.length} products`,
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory, priceRange);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category, priceRange);
  };

  const handlePriceFilter = (range: { min: number; max: number }) => {
    setPriceRange(range);
    filterProducts(searchTerm, selectedCategory, range);
  };

  const filterProducts = (term: string, category: string, range: { min: number; max: number }) => {
    let filtered = products;

    if (term) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    filtered = filtered.filter(product => {
      const price = parseInt(product.price.replace(/[₹,]/g, ''));
      return price >= range.min && price <= range.max;
    });

    setFilteredProducts(filtered);
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23334155" stroke-width="1" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Radar className="h-12 w-12 text-blue-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Web Data Radar
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover trending tech products with real-time web data gathering and smart filtering
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1 space-y-6">
              <CrawlForm onDataFetched={handleCrawlComplete} />
              <SearchAndFilter
                onSearch={handleSearch}
                onCategoryFilter={handleCategoryFilter}
                onPriceFilter={handlePriceFilter}
                categories={categories}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
              />
              <DataExport products={filteredProducts} />
            </div>

            <div className="lg:col-span-3">
              <StatsDisplay products={filteredProducts} totalProducts={products.length} />
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  <span className="ml-2 text-gray-300">Fetching data...</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-lg">
                    No products found matching your criteria
                  </div>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
