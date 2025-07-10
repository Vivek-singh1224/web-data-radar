import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { DataExport } from '@/components/DataExport';
import { CrawlForm } from '@/components/CrawlForm';
import { Header } from '@/components/Header';
import { StatsDisplay } from '@/components/StatsDisplay';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Radar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const { toast } = useToast();

  // Updated sample data with real website links
  const sampleProducts: Product[] = [
    {
      id: '1',
      title: 'NVIDIA RTX 4070 Super',
      description: 'High-performance graphics card for gaming and creative work',
      price: '₹58,000',
      link: 'https://www.nvidia.com/en-in/geforce/graphics-cards/40-series/rtx-4070-super/',
      category: 'Graphics Cards',
      source: 'NVIDIA'
    },
    {
      id: '2',
      title: 'AMD Ryzen 7 7800X3D',
      description: '8-core gaming processor with 3D V-Cache technology',
      price: '₹35,500',
      link: 'https://www.amd.com/en/products/cpu/amd-ryzen-7-7800x3d',
      category: 'Processors',
      source: 'AMD'
    },
    {
      id: '3',
      title: 'Samsung 980 PRO 2TB',
      description: 'PCIe 4.0 NVMe SSD with exceptional speed',
      price: '₹16,800',
      link: 'https://www.samsung.com/us/memory-storage/ssd/980-pro/',
      category: 'Storage',
      source: 'Samsung'
    },
    {
      id: '4',
      title: 'Corsair RM850x PSU',
      description: '850W 80+ Gold modular power supply',
      price: '₹12,200',
      link: 'https://www.corsair.com/us/en/Categories/Products/Power-Supply-Units/RMx-Series/p/CP-9020200-NA',
      category: 'Power Supply',
      source: 'Corsair'
    },
    {
      id: '5',
      title: 'ASUS ROG Strix B650E',
      description: 'Premium AM5 motherboard with WiFi 6E',
      price: '₹28,900',
      link: 'https://rog.asus.com/motherboards/rog-strix/rog-strix-b650e-e-gaming-wifi/',
      category: 'Motherboards',
      source: 'ASUS'
    },
    {
      id: '6',
      title: 'Intel Core i9-14900K',
      description: '24-core flagship processor for enthusiasts',
      price: '₹52,000',
      link: 'https://www.intel.com/content/www/us/en/products/sku/230496/intel-core-i9-processor-14900k-36m-cache-up-to-6-00-ghz/specifications.html',
      category: 'Processors',
      source: 'Intel'
    },
    {
      id: '7',
      title: 'RTX 4060 Ti 16GB',
      description: 'Mid-range gaming GPU with 16GB VRAM',
      price: '₹48,500',
      link: 'https://www.nvidia.com/en-in/geforce/graphics-cards/40-series/rtx-4060-4060ti/',
      category: 'Graphics Cards',
      source: 'NVIDIA'
    },
    {
      id: '8',
      title: 'G.Skill Trident Z5 32GB',
      description: 'DDR5-6000 high-performance RAM kit',
      price: '₹18,900',
      link: 'https://www.gskill.com/product/165/374/1562831348/F5-6000J3636F16GX2-TZ5RK',
      category: 'Memory',
      source: 'G.Skill'
    },
    {
      id: '9',
      title: 'WD Black SN850X 1TB',
      description: 'Gaming-focused NVMe SSD with heatsink',
      price: '₹9,800',
      link: 'https://www.westerndigital.com/products/internal-drives/wd-black-sn850x-nvme-ssd',
      category: 'Storage',
      source: 'Western Digital'
    },
    {
      id: '10',
      title: 'MSI MAG B650 Tomahawk',
      description: 'Feature-rich AM5 motherboard for gaming',
      price: '₹22,500',
      link: 'https://www.msi.com/Motherboard/MAG-B650-TOMAHAWK-WIFI',
      category: 'Motherboards',
      source: 'MSI'
    },
    {
      id: '11',
      title: 'EVGA SuperNOVA 750W',
      description: '80+ Gold fully modular power supply',
      price: '₹9,900',
      link: 'https://www.evga.com/products/product.aspx?pn=220-GA-0750-X1',
      category: 'Power Supply',
      source: 'EVGA'
    },
    {
      id: '12',
      title: 'AMD RX 7800 XT',
      description: 'High-performance 1440p gaming graphics card',
      price: '₹54,000',
      link: 'https://www.amd.com/en/products/graphics/amd-radeon-rx-7800-xt',
      category: 'Graphics Cards',
      source: 'AMD'
    },
    {
      id: '13',
      title: 'Corsair Vengeance 32GB',
      description: 'DDR5-5600 optimized for AMD platforms',
      price: '₹16,200',
      link: 'https://www.corsair.com/us/en/Categories/Products/Memory/VENGEANCE-DDR5/p/CMK32GX5M2B5600C36',
      category: 'Memory',
      source: 'Corsair'
    },
    {
      id: '14',
      title: 'Seagate FireCuda 2TB',
      description: 'High-speed NVMe SSD for gaming and content creation',
      price: '₹14,800',
      link: 'https://www.seagate.com/products/gaming-drives/pc-gaming/firecuda-nvme-ssd/',
      category: 'Storage',
      source: 'Seagate'
    },
    {
      id: '15',
      title: 'Intel Core i5-14600K',
      description: '14-core processor perfect for gaming builds',
      price: '₹28,500',
      link: 'https://www.intel.com/content/www/us/en/products/sku/230590/intel-core-i5-processor-14600k-24m-cache-up-to-5-30-ghz/specifications.html',
      category: 'Processors',
      source: 'Intel'
    },
    {
      id: '16',
      title: 'GIGABYTE Z790 AORUS',
      description: 'Premium Intel Z790 motherboard with RGB',
      price: '₹32,000',
      link: 'https://www.gigabyte.com/Motherboard/Z790-AORUS-ELITE-AX-rev-10',
      category: 'Motherboards',
      source: 'GIGABYTE'
    },
    {
      id: '17',
      title: 'be quiet! Pure Power 650W',
      description: 'Silent and efficient 80+ Gold PSU',
      price: '₹8,500',
      link: 'https://www.bequiet.com/en/powersupply/1394',
      category: 'Power Supply',
      source: 'be quiet!'
    },
    {
      id: '18',
      title: 'RTX 4080 Super',
      description: 'High-end gaming GPU for 4K performance',
      price: '₹98,000',
      link: 'https://www.nvidia.com/en-in/geforce/graphics-cards/40-series/rtx-4080-super/',
      category: 'Graphics Cards',
      source: 'NVIDIA'
    },
    {
      id: '19',
      title: 'Kingston Fury Beast 16GB',
      description: 'DDR4-3200 reliable gaming memory',
      price: '₹5,800',
      link: 'https://www.kingston.com/dataSheets/KF432C16BB_16.pdf',
      category: 'Memory',
      source: 'Kingston'
    },
    {
      id: '20',
      title: 'Crucial P3 Plus 1TB',
      description: 'Budget-friendly NVMe SSD with good performance',
      price: '₹6,900',
      link: 'https://www.crucial.com/ssd/p3-plus/CT1000P3PSSD8',
      category: 'Storage',
      source: 'Crucial'
    },
    {
      id: '21',
      title: 'AMD Ryzen 5 7600X',
      description: '6-core processor ideal for gaming and productivity',
      price: '₹24,000',
      link: 'https://www.amd.com/en/products/cpu/amd-ryzen-5-7600x',
      category: 'Processors',
      source: 'AMD'
    },
    {
      id: '22',
      title: 'RTX 4050 6GB',
      description: 'Entry-level gaming GPU for 1080p gaming',
      price: '₹28,500',
      link: 'https://www.nvidia.com/en-in/geforce/graphics-cards/40-series/rtx-4050/',
      category: 'Graphics Cards',
      source: 'NVIDIA'
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate refresh by reloading the sample data
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setRefreshing(false);
      
      toast({
        title: "Data Refreshed",
        description: "Product data has been updated successfully",
      });
    }, 1000);
  };

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
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <StatsDisplay products={filteredProducts} totalProducts={products.length} />
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  variant="outline"
                  size="sm"
                  className="ml-4 bg-white/10 border-gray-600 text-white hover:bg-white/20"
                >
                  {refreshing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>
              
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
