import { useEffect, useState } from 'react';
import { listCurrencies } from '../services/currencies';
import type { CryptoCurrency, FiatCurrency } from '../types';

const useCurrencies = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([]);
  const [fiatCurrencies, setFiatCurrencies] = useState<FiatCurrency[]>([]);
  const [currencyError, setCurrencyError] = useState('');
  const [isLoadingCurrencies, setLoadingCurrencies] = useState(false);

  useEffect(() => {
    setLoadingCurrencies(true);
    listCurrencies()
      .then((res) => {
        if (res.error) setCurrencyError(res.error);
        else {
          setCryptoCurrencies(res.data.cryptoCurrencies);
          setFiatCurrencies(res.data.fiatCurrencies);
          setCurrencyError('');
        }
      })
      .catch((err) => {
        console.log('Error fetching currencies:', (err as Error).message);
        setCurrencyError('Facing problem list currencies.');
      })
      .finally(() => {
        setLoadingCurrencies(false);
      });
  }, []);

  return {
    cryptoCurrencies,
    fiatCurrencies,
    isLoadingCurrencies,
    currencyError,
  };
};

export default useCurrencies;
