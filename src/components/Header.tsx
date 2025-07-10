
import React from 'react';
import { Github, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="relative backdrop-blur-sm bg-black/20 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Radar</h2>
              <p className="text-xs text-gray-400">Real-time web insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Live Data
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
