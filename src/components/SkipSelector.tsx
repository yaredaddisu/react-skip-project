import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SkipOption } from '@/types/skip';
import SkipCard from './SkipCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Filter, Grid3X3, List, Sparkles } from 'lucide-react';

interface SkipSelectorProps {
  skipOptions: SkipOption[];
  onContinue: (selectedSkip: SkipOption) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const SkipSelector: React.FC<SkipSelectorProps> = ({
  skipOptions,
  onContinue,
  onBack,
  isLoading,
  error
}) => {
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSkipSelect = (skip: SkipOption) => {
    if (selectedSkip?.id === skip.id) {
      setSelectedSkip(null); // Deselect if already selected
    } else {
      setSelectedSkip(skip); // Otherwise, select
    }
  };

  console.log(skipOptions)
  const handleContinue = () => {
    if (selectedSkip) {
      onContinue(selectedSkip);
    }
  };
  {
    isLoading && (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
        <span className="ml-4 text-indigo-600 font-medium text-lg">Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="h-6 w-px bg-slate-300" />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>

              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1 rounded-md transition-all duration-200",
                    viewMode === 'grid'
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1 rounded-md transition-all duration-200",
                    viewMode === 'list'
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-indigo-500 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Perfect Skip
              </h1>
            </div>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Select the ideal skip size for your project. Compare features, pricing, and specifications to find the perfect match.
            </p>
          </div>


          {/* Bottom Overlay Summary */}
          {selectedSkip && (
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transform transition-all duration-300 animate-fade-in-up z-50">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Skip Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {selectedSkip.size} Yard Skip Selected
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        {selectedSkip.hire_period_days} day hire
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        Road: {selectedSkip.allowed_on_road ? "Yes" : "No"}
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        Heavy waste: {selectedSkip.allows_heavy_waste ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-indigo-600">
                        £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedSkip.hire_period_days} days • inc. VAT
                      </div>
                    </div>
                    <Button
                      onClick={handleContinue}
                      className={cn(
                        "whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all",
                        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
                      )}
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skip Options Grid/List */}
          <div className={cn(
            "gap-6 mb-8",
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
              : "flex flex-col space-y-4"
          )}>
            {skipOptions.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
                viewMode={viewMode}
                
                handleContinue={handleContinue}
              />
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between max-w-md mx-auto">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center justify-center px-8 py-3 text-gray-600 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedSkip}
              className={cn(
                "flex items-center justify-center px-8 py-3 rounded-xl font-semibold transition-all duration-300",
                selectedSkip
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Imagery and information shown throughout this website may not reflect the exact shape or size specification, 
            colours may vary, options and/or accessories may be featured at additional cost.
            </p>
          </div>
        </div>
      </div></div>
  );
};

export default SkipSelector;
