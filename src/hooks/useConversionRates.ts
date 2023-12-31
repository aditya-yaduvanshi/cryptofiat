import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const useConversionRates = () => {
  const [conversions, setConversions] = useLocalStorage(
    'recent-conversions',
    []
  );

  const addNewConversion = useCallback(() => {}, []);

  const syncConversion = useCallback(() => {}, []);

  const removeConversion = useCallback(() => {}, []);

  return {
    conversions,
    setConversions,
    addNewConversion,
    syncConversion,
    removeConversion,
  };
};

export default useConversionRates;
