
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  category: string;
  source: string;
}

interface DataExportProps {
  products: Product[];
}

export const DataExport: React.FC<DataExportProps> = ({ products }) => {
  const { toast } = useToast();

  const exportToJSON = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `web-radar-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Data exported as JSON file",
    });
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Description', 'Price', 'Category', 'Source', 'Link'];
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        `"${product.title.replace(/"/g, '""')}"`,
        `"${product.description.replace(/"/g, '""')}"`,
        `"${product.price}"`,
        `"${product.category}"`,
        `"${product.source}"`,
        `"${product.link}"`
      ].join(','))
    ].join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `web-radar-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Data exported as CSV file",
    });
  };

  return (
    <Card className="backdrop-blur-sm bg-white/5 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={exportToJSON}
          variant="outline"
          className="w-full bg-white/10 border-gray-600 text-white hover:bg-white/20"
          disabled={products.length === 0}
        >
          <FileJson className="h-4 w-4 mr-2" />
          Export as JSON
        </Button>
        
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="w-full bg-white/10 border-gray-600 text-white hover:bg-white/20"
          disabled={products.length === 0}
        >
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </Button>
        
        <p className="text-xs text-gray-400 text-center">
          {products.length} products ready for export
        </p>
      </CardContent>
    </Card>
  );
};
