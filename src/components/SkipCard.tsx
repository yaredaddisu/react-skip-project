
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkipOption } from '@/types/skip';
import { CheckCircle, Truck, Calendar, Shield, X, Check, Clock, MapPin, Weight, ArrowLeft, ArrowRight } from 'lucide-react';

interface SkipCardProps {
  skip: SkipOption;
  isSelected: boolean;
  onSelect: (skip: SkipOption) => void;
  viewMode?: 'grid' | 'list';
  handleContinue: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, viewMode, handleContinue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const finalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  if (viewMode === 'list') {
    return (
      <div
        className={cn(
          "bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer p-6",
          isSelected
            ? "border-emerald-500 shadow-lg ring-4 ring-emerald-100"
            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
        )}
        onClick={() => onSelect(skip)}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-6 mb-4 lg:mb-0">
            {/* Skip Visual */}
            <div className="flex-shrink-0">
              <div className={cn(
                "w-20 h-12 rounded-lg relative transition-colors duration-300",
                isSelected ? "bg-emerald-100" : "bg-slate-100"
              )}>
                <div className={cn(
                  "absolute inset-2 rounded-md transition-colors duration-300",
                  isSelected ? "bg-emerald-200" : "bg-slate-200"
                )}></div>
                <Badge className={cn(
                  "absolute -top-2 -right-2 text-xs",
                  isSelected ? "bg-emerald-600" : "bg-slate-600"
                )}>
                  {skip.size}Y
                </Badge>
              </div>
            </div>

            {/* Skip Info */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {skip.size} Yard Skip
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {skip.hire_period_days} days
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {skip.allowed_on_road ? (
                    <span className="text-emerald-600">Road OK</span>
                  ) : (
                    <span className="text-amber-600">Private only</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Weight className="w-4 h-4 mr-1" />
                  {skip.allows_heavy_waste ? (
                    <span className="text-emerald-600">Heavy waste OK</span>
                  ) : (
                    <span className="text-amber-600">Light waste only</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Price and Selection */}
          <div className="flex items-center justify-between lg:justify-end lg:space-x-6">
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900">
                £{finalPrice.toFixed(0)}
              </div>
              <div className="text-sm text-slate-500">inc. VAT</div>
            </div>

            <div className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              isSelected
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-slate-300 hover:border-emerald-400"
            )}>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
    className={cn(
      "w-full max-w-sm mx-auto bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-2xl flex flex-col", // Added flex-col
      isSelected
        ? "border-indigo-500 shadow-xl transform scale-[1.02] ring-4 ring-indigo-100"
        : "border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:transform hover:scale-[1.01]"
    )}
    onClick={() => onSelect(skip)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* Selection Indicator */}
    {isSelected && (
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-indigo-500 rounded-full p-2 shadow-lg animate-bounce">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      </div>
    )}
  
    {/* Skip Visual - Fixed height */}
    <div className="relative overflow-hidden rounded-t-2xl h-48"> {/* Added fixed height */}
      <div className={cn(
        "h-full bg-gradient-to-br transition-all duration-300 flex items-center justify-center", // Removed aspect-video
        isSelected
          ? "from-indigo-400 to-purple-500"
          : "from-orange-400 to-amber-500 group-hover:from-orange-500 group-hover:to-amber-600"
      )}>
        <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
          <div className={cn(
            "w-36 h-24 rounded-xl shadow-xl relative mx-auto transition-all duration-300",
            isSelected ? "bg-indigo-300" : "bg-amber-300"
          )}>
            <div className={cn(
              "absolute inset-3 rounded-lg transition-colors duration-300",
              isSelected ? "bg-indigo-200" : "bg-amber-200"
            )}></div>
            <div className={cn(
              "absolute top-2 left-2 right-2 h-3 rounded-t-lg transition-colors duration-300",
              isSelected ? "bg-indigo-400" : "bg-amber-400"
            )}></div>
            <div className="absolute bottom-3 left-6 right-6 text-xs font-bold text-gray-700">
              SKIP HIRE
            </div>
          </div>
        </div>
      </div>
  
      {/* Size Badge */}
      <Badge className={cn(
        "absolute top-4 right-4 px-3 py-1 text-sm font-bold transition-all duration-300",
        isSelected
          ? "bg-white text-indigo-600 shadow-lg"
          : "bg-white text-orange-600 group-hover:scale-105"
      )}>
        <Truck className="w-4 h-4 mr-1" />
        {skip.size} Yards
      </Badge>
    </div>
  
    {/* Content area - Flex-grow to take remaining space */}
    <div className="p-6 flex-grow flex flex-col"> {/* Added flex-grow and flex-col */}
      {/* Title and Duration */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {skip.size} Yard Skip
        </h3>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{skip.hire_period_days} day hire period</span>
        </div>
      </div>
  
      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className={cn(
            "text-4xl font-bold transition-colors duration-300",
            isSelected ? "text-indigo-600" : "text-gray-800 group-hover:text-indigo-600"
          )}>
            £{finalPrice.toFixed(0)}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            inc. VAT
          </span>
        </div>
        <p className="text-xs text-gray-400">
          £{skip.price_before_vat} + £{(finalPrice - skip.price_before_vat).toFixed(0)} VAT
        </p>
      </div>
  
      {/* Features - Flex-grow to push button to bottom */}
      <div className="mb-6 space-y-3 flex-grow"> {/* Added flex-grow */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Road placement</span>
          </div>
          <div className="flex items-center">
            {skip.allowed_on_road ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <X className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={cn(
              "text-sm font-medium",
              skip.allowed_on_road ? "text-emerald-600" : "text-red-600"
            )}>
              {skip.allowed_on_road ? "Allowed" : "Not allowed"}
            </span>
          </div>
        </div>
  
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Heavy waste</span>
          </div>
          <div className="flex items-center">
            {skip.allows_heavy_waste ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <X className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={cn(
              "text-sm font-medium",
              skip.allows_heavy_waste ? "text-emerald-600" : "text-red-600"
            )}>
              {skip.allows_heavy_waste ? "Allowed" : "Not allowed"}
            </span>
          </div>
        </div>
      </div>
  
      {/* Select Button - Margin-top auto to stick to bottom */}
      <div className="mt-auto">  
        <Button
          className={cn(
            "w-full py-3 font-semibold transition-all duration-300 rounded-xl",
            isSelected
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transform hover:scale-105"
              : "bg-gray-100 hover:bg-indigo-600 text-gray-700 hover:text-white border-2 border-transparent hover:border-indigo-600"
          )}
        >
          {isSelected ? "✓ Selected" : "Select This Skip"}
        </Button>
      </div>
    </div>
  </div>
  );
};

export default SkipCard;
