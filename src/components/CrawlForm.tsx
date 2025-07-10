
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Globe, Database } from 'lucide-react';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  category: string;
  source: string;
}

interface CrawlFormProps {
  onDataFetched: (products: Product[]) => void;
}

export const CrawlForm: React.FC<CrawlFormProps> = ({ onDataFetched }) => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to crawl",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Setup Required",
        description: "Please enter your Firecrawl API key to fetch real data",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      FirecrawlService.saveApiKey(apiKey);
      console.log('Starting crawl for URL:', url);
      
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success && result.data) {
        // Extract product data from crawled content
        const extractedProducts = extractProductsFromCrawlData(result.data, url);
        
        if (extractedProducts.length > 0) {
          onDataFetched(extractedProducts);
          toast({
            title: "Success",
            description: `Successfully extracted ${extractedProducts.length} products`,
          });
        } else {
          toast({
            title: "No Products Found",
            description: "Could not extract product data from the crawled content",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Crawl Failed",
          description: result.error || "Failed to crawl website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website. Please check your API key and URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractProductsFromCrawlData = (crawlData: any, sourceUrl: string): Product[] => {
    // This is a simplified extraction - in a real app, you'd have more sophisticated parsing
    const products: Product[] = [];
    
    try {
      if (crawlData.data && Array.isArray(crawlData.data)) {
        crawlData.data.forEach((page: any, index: number) => {
          if (page.markdown) {
            const lines = page.markdown.split('\n');
            let currentProduct: Partial<Product> = {};
            
            lines.forEach((line: string) => {
              if (line.includes('₹') || line.includes('$') || line.includes('price')) {
                currentProduct.price = extractPrice(line);
              }
              if (line.length > 10 && line.length < 100 && !currentProduct.title) {
                currentProduct.title = line.trim();
              }
              if (line.length > 20 && !currentProduct.description) {
                currentProduct.description = line.trim().substring(0, 150);
              }
            });
            
            if (currentProduct.title) {
              products.push({
                id: `crawled-${index}`,
                title: currentProduct.title || 'Unknown Product',
                description: currentProduct.description || 'No description available',
                price: currentProduct.price || 'Price not found',
                link: page.sourceURL || sourceUrl,
                category: 'Crawled Data',
                source: new URL(sourceUrl).hostname
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error extracting products:', error);
    }
    
    return products.slice(0, 20); // Limit to first 20 products
  };

  const extractPrice = (text: string): string => {
    const priceMatch = text.match(/[₹$€£]\s*[\d,]+(\.\d{2})?/);
    return priceMatch ? priceMatch[0] : 'Price not found';
  };

  return (
    <Card className="backdrop-blur-sm bg-white/5 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Database className="h-5 w-5" />
          Web Data Crawler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-gray-300">Firecrawl API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Firecrawl API key"
              className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-400">
              Get your API key from{' '}
              <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                firecrawl.dev
              </a>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url" className="text-gray-300">Website URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example-ecommerce.com"
              className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Crawling...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                Fetch Live Data
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
