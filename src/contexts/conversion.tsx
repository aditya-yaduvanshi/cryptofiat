import {
  useCallback,
  useState,
  createContext,
  memo,
  PropsWithChildren,
  useContext,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Conversion, ConversionInput } from '../types';
import { getCryptoToFiatConversion } from '../services/currencies';

type IConversionContext = {
  conversions: Conversion[];
  addNewConversion: (conversion: Conversion) => void;
  getConversionRate: (conversionInput: ConversionInput) => Promise<number>;
  removeConversion: (id: number) => void;
  syncConversion: (conversion: Conversion) => Promise<void>;
  isLoadingConversion: boolean;
};

const ConversionContext = createContext<IConversionContext | null>(null);

export const useConversionRates = () => {
  return useContext(ConversionContext) as IConversionContext;
};

const ConversionProvider = ({ children }: PropsWithChildren) => {
  const [conversions, setConversions] = useLocalStorage<Conversion[]>(
    'recent-conversions',
    []
  );
  const [isLoadingConversion, setLoadingConversion] = useState(false);

  const addNewConversion = useCallback((conversion: Conversion) => {
    setConversions((prev) => [conversion, ...prev]);
  }, []);

  const getConversionRate = useCallback(
    async (conversionInput: ConversionInput) => {
      setLoadingConversion(true);
      const res = await getCryptoToFiatConversion(conversionInput);
      setLoadingConversion(false);
      return res.data;
    },
    []
  );

  const syncConversion = useCallback(
    async (conversion: Conversion) => {
      const rate = await getConversionRate({
        source: conversion.source.symbol,
        target: conversion.target.symbol,
        amount: conversion.amount,
      });
      setConversions((prev) =>
        prev.map((conv) =>
          conv.id === conversion.id
            ? { ...conv, rate, lastSynced: Date.now() }
            : conv
        )
      );
    },
    [getConversionRate]
  );

  const removeConversion = useCallback((id: number) => {
    setConversions((prev) => prev.filter((conversion) => conversion.id !== id));
  }, []);

  return (
    <>
      <ConversionContext.Provider
        value={{
          conversions,
          addNewConversion,
          getConversionRate,
          removeConversion,
          syncConversion,
          isLoadingConversion,
        }}
      >
        {children}
      </ConversionContext.Provider>
    </>
  );
};

export default memo(ConversionProvider);
