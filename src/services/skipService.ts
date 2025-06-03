// src/services/skipService.ts
import { SkipOption } from '@/types/skip';

export const fetchSkipsByLocation = async (postcode: string, area: string = ''): Promise<SkipOption[]> => {
  try {
    const response = await fetch(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch skip data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};