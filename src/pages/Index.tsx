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

  // Expanded sample data with 20+ products
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
    },
    {
      id: '6',
      title: 'Intel Core i9-14900K',
      description: '24-core flagship processor for enthusiasts',
      price: '₹52,000',
      link: 'https://example.com/i9-14900k',
      category: 'Processors',
      source: 'ComponentHub'
    },
    {
      id: '7',
      title: 'RTX 4060 Ti 16GB',
      description: 'Mid-range gaming GPU with 16GB VRAM',
      price: '₹48,500',
      link: 'https://example.com/rtx-4060ti',
      category: 'Graphics Cards',
      source: 'TechShop'
    },
    {
      id: '8',
      title: 'G.Skill Trident Z5 32GB',
      description: 'DDR5-6000 high-performance RAM kit',
      price: '₹18,900',
      link: 'https://example.com/gskill-ram',
      category: 'Memory',
      source: 'RAMStore'
    },
    {
      id: '9',
      title: 'WD Black SN850X 1TB',
      description: 'Gaming-focused NVMe SSD with heatsink',
      price: '₹9,800',
      link: 'https://example.com/wd-black',
      category: 'Storage',
      source: 'TechMart'
    },
    {
      id: '10',
      title: 'MSI MAG B650 Tomahawk',
      description: 'Feature-rich AM5 motherboard for gaming',
      price: '₹22,500',
      link: 'https://example.com/msi-tomahawk',
      category: 'Motherboards',
      source: 'MoBo World'
    },
    {
      id: '11',
      title: 'EVGA SuperNOVA 750W',
      description: '80+ Gold fully modular power supply',
      price: '₹9,900',
      link: 'https://example.com/evga-750w',
      category: 'Power Supply',
      source: 'PowerStore'
    },
    {
      id: '12',
      title: 'AMD RX 7800 XT',
      description: 'High-performance 1440p gaming graphics card',
      price: '₹54,000',
      link: 'https://example.com/rx-7800xt',
      category: 'Graphics Cards',
      source: 'TechShop'
    },
    {
      id: '13',
      title: 'Corsair Vengeance 32GB',
      description: 'DDR5-5600 optimized for AMD platforms',
      price: '₹16,200',
      link: 'https://example.com/corsair-vengeance',
      category: 'Memory',
      source: 'RAMStore'
    },
    {
      id: '14',
      title: 'Seagate FireCuda 2TB',
      description: 'High-speed NVMe SSD for gaming and content creation',
      price: '₹14,800',
      link: 'https://example.com/seagate-firecuda',
      category: 'Storage',
      source: 'TechMart'
    },
    {
      id: '15',
      title: 'Intel Core i5-14600K',
      description: '14-core processor perfect for gaming builds',
      price: '₹28,500',
      link: 'https://example.com/i5-14600k',
      category: 'Processors',
      source: 'ComponentHub'
    },
    {
      id: '16',
      title: 'GIGABYTE Z790 AORUS',
      description: 'Premium Intel Z790 motherboard with RGB',
      price: '₹32,000',
      link: 'https://example.com/gigabyte-z790',
      category: 'Motherboards',
      source: 'MoBo World'
    },
    {
      id: '17',
      title: 'be quiet! Pure Power 650W',
      description: 'Silent and efficient 80+ Gold PSU',
      price: '₹8,500',
      link: 'https://example.com/bequiet-650w',
      category: 'Power Supply',
      source: 'PowerStore'
    },
    {
      id: '18',
      title: 'RTX 4080 Super',
      description: 'High-end gaming GPU for 4K performance',
      price: '₹98,000',
      link: 'https://example.com/rtx-4080s',
      category: 'Graphics Cards',
      source: 'TechShop'
    },
    {
      id: '19',
      title: 'Kingston Fury Beast 16GB',
      description: 'DDR4-3200 reliable gaming memory',
      price: '₹5,800',
      link: 'https://example.com/kingston-fury',
      category: 'Memory',
      source: 'RAMStore'
    },
    {
      id: '20',
      title: 'Crucial P3 Plus 1TB',
      description: 'Budget-friendly NVMe SSD with good performance',
      price: '₹6,900',
      link: 'https://example.com/crucial-p3',
      category: 'Storage',
      source: 'TechMart'
    },
    {
      id: '21',
      title: 'AMD Ryzen 5 7600X',
      description: '6-core processor ideal for gaming and productivity',
      price: '₹24,000',
      link: 'https://example.com/ryzen-7600x',
      category: 'Processors',
      source: 'ComponentHub'
    },
    {
      id: '22',
      title: 'RTX 4050 6GB',
      description: 'Entry-level gaming GPU for 1080p gaming',
      price: '₹28,500',
      link: 'https://example.com/rtx-4050',
      category: 'Graphics Cards',
      source: 'TechShop'
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
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:20px_20px]"></div>
      </div>
      
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
