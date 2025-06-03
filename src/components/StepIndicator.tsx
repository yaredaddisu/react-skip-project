import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

interface StepIndicatorProps {
  currentStep: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      id: 'postcode',
      title: 'Postcode',
      icon: <MapPin className="w-4 h-4" />,
      completed: true,
      current: false,
    },
    {
      id: 'waste-type',
      title: 'Waste Type',
      icon: <Trash2 className="w-4 h-4" />,
      completed: true,
      current: false,
    },
    {
      id: 'select-skip',
      title: 'Select Skip',
      icon: <Truck className="w-4 h-4" />,
      completed: false,
      current: currentStep === 'select-skip',
    },
    {
      id: 'permit-check',
      title: 'Permit Check',
      icon: <Shield className="w-4 h-4" />,
      completed: false,
      current: false,
    },
    {
      id: 'choose-date',
      title: 'Choose Date',
      icon: <Calendar className="w-4 h-4" />,
      completed: false,
      current: false,
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: <CreditCard className="w-4 h-4" />,
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-gray-100 py-4 md:py-6 px-2 sm:px-4 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto">
        {/* Mobile View - Compact */}
        <div className="md:hidden flex items-center justify-center space-x-2">
          <div className="flex items-center">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2",
              steps.find(step => step.current)?.completed
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "bg-indigo-600 border-indigo-600 text-white"
            )}>
              <span className="text-xs font-bold">
                {steps.findIndex(step => step.current) + 1}
              </span>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {steps.find(step => step.current)?.title}
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            Step {steps.findIndex(step => step.current) + 1} of {steps.length}
          </span>
        </div>

        {/* Desktop/Tablet View - Full */}
        <div className="hidden md:flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-0">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 transform hover:scale-105",
                    step.completed
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg"
                      : step.current
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg animate-pulse"
                      : "bg-white border-gray-300 text-gray-400 hover:border-gray-400"
                  )}
                >
                  {step.completed ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.icon}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap text-center max-w-[80px]",
                    step.completed
                      ? "text-emerald-700"
                      : step.current
                      ? "text-indigo-700 font-semibold"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 transition-colors duration-300",
                    step.completed ? "bg-emerald-300" : "bg-gray-200"
                  )} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;