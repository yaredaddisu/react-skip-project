
import React, { useEffect, useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import SkipSelector from '@/components/SkipSelector';
import { SkipOption } from '@/types/skip';
import { skipData } from '@/data/skipData';
import { useToast } from '@/hooks/use-toast';
import { fetchSkipsByLocation } from '@/services/skipService';

const Index = () => {
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
  const { toast } = useToast();
  const [skipOptions, setSkipOptions] = useState<SkipOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postcode = 'NR32';
  const area = 'Lowestoft';
  
  useEffect(() => {
    const loadSkips = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSkipsByLocation(postcode, area);
        setSkipOptions(data);
      } catch (err) {
        setError('Failed to load skip options. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkips();
  }, [postcode, area]);
  const handleSkipContinue = (skip: SkipOption) => {
    setSelectedSkip(skip);
    toast({
      title: "🎉 Skip Selected Successfully!",
      description: `You've chosen a ${skip.size} yard skip for £${(skip.price_before_vat * (1 + skip.vat / 100)).toFixed(0)}. Great choice!`,
    });
    console.log('Selected skip:', skip);
  };

  const handleBack = () => {
    console.log('Going back to previous step');
    toast({
      title: "↩️ Going Back",
      description: "Returning to the previous step of your booking",
    });
  };

  return (
    <div className="min-h-screen">
      <StepIndicator currentStep="select-skip" />


      <SkipSelector
        skipOptions={skipOptions}
        isLoading={isLoading}
        error={error}
        onContinue={handleSkipContinue}
        onBack={handleBack}
      />
    </div>
  );
};

export default Index;
