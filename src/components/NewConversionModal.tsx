import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BackIcon from '~icons/ic/outline-arrow-back';
import LoadingIcon from '~icons/svg-spinners/ring-resize';
import ErrorIcon from '~icons/clarity/error-line';
import SearchIcon from '~icons/ic/baseline-search';
import Modal, { ModalProps } from './Modal';
import useCurrencies from '../hooks/useCurrencies';
import CurrencyCard from './CurrencyCard';
import type { Conversion } from '../types';
import { useConversionRates } from '../contexts/conversion';
import ConversionCard from './ConversionCard';

type NewConversionModalProps = Pick<ModalProps, 'isShow' | 'onClose'>;

const PRIMARY_ACTION = {
  source: 'Select Crypto Currency',
  target: 'Select Fiat Currency',
  amount: 'Convert',
  rate: 'Close',
};

const NewConversionModal = ({ isShow, onClose }: NewConversionModalProps) => {
  const [step, setStep] = useState<'source' | 'amount' | 'target' | 'rate'>(
    'source'
  );
  const [keywords, setKeywords] = useState('');
  const [conversionError, setConversionError] = useState('');
  const [conversion, setConversion] = useState<Partial<Conversion>>();
  const {
    cryptoCurrencies,
    fiatCurrencies,
    isLoadingCurrencies,
    currencyError,
  } = useCurrencies();
  const { getConversionRate, addNewConversion, isLoadingConversion } =
    useConversionRates();

  const { cryptos, fiats } = useMemo(() => {
    if (!keywords) return { cryptos: cryptoCurrencies, fiats: fiatCurrencies };
    return {
      cryptos: cryptoCurrencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(keywords.toLowerCase()) ||
          currency.symbol.toLowerCase().includes(keywords.toLowerCase())
      ),
      fiats: fiatCurrencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(keywords.toLowerCase()) ||
          currency.symbol.toLowerCase().includes(keywords.toLowerCase())
      ),
    };
  }, [keywords, cryptoCurrencies, fiatCurrencies]);

  const handlePrimaryAction = useCallback(async () => {
    setConversionError('');
    switch (step) {
      case 'source': {
        if (!conversion?.source) {
          setConversionError('Please select a crypto currency.');
          break;
        }
        setStep('target');
        break;
      }
      case 'target': {
        if (!conversion?.target) {
          setConversionError('Please select a fiat currency.');
          break;
        }
        setStep('amount');
        break;
      }
      case 'amount': {
        if (!conversion?.source || !conversion?.target || !conversion?.amount) {
          setConversionError('Please enter amount.');
          break;
        }
        const rate = await getConversionRate({
          source: conversion?.source?.symbol,
          target: conversion?.target?.symbol,
          amount: conversion?.amount,
        });
        setConversion((prev) => ({
          ...prev,
          rate,
          id: Date.now(),
          lastSynced: Date.now(),
        }));
        setStep('rate');
        addNewConversion({
          ...(conversion as Conversion),
          id: Date.now(),
          lastSynced: Date.now(),
          rate,
        });
        break;
      }
      case 'rate':
      default: {
        onClose();
        break;
      }
    }
  }, [conversion, step, addNewConversion, getConversionRate]);

  useEffect(() => {
    setStep('source');
  }, [isShow]);

  return (
    <>
      <Modal
        title="New Conversion"
        isShow={isShow}
        onClose={onClose}
        primaryActionText={PRIMARY_ACTION[step]}
        onPrimaryAction={handlePrimaryAction}
        className="w-full max-w-[900px] h-full md:max-h-[90vh]"
      >
        <div className="w-full h-full flex flex-col gap-2.5">
          <div className="w-full flex items-center gap-5">
            <button
              type="button"
              className="disabled:opacity-40 disabled:scale-100 flex items-center gap-1 duration-200 transition-all active:scale-90 cursor-pointer hover:text-blue-500 text-blue-700 py-2.5"
              onClick={() => {
                setStep((prev) => {
                  switch (prev) {
                    case 'rate':
                      return 'amount';
                    case 'amount':
                      return 'target';
                    case 'source':
                    case 'target':
                    default:
                      return 'source';
                  }
                });
              }}
              disabled={step === 'source'}
            >
              <BackIcon /> Back
            </button>
            {['source', 'target'].includes(step) ? (
              <div className="w-full relative">
                <input
                  type="text"
                  className="w-full h-10 border pl-10 py-0 rounded outline-none hover:border-blue-700 focus:border-blue-700"
                  placeholder="Search..."
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <span className="absolute left-2.5 text-gray-400 top-1/2 -translate-y-1/2">
                  <SearchIcon style={{ fontSize: 20 }} />
                </span>
              </div>
            ) : null}
          </div>
          <h2 className="w-full text-2xl">
            {['source', 'target'].includes(step)
              ? PRIMARY_ACTION[step]
              : step === 'amount'
                ? 'Enter Amount'
                : 'Converted Value Is:'}
          </h2>
          {conversionError || currencyError ? (
            <p className="text-red-500 rounded inline-flex items-center gap-1 py-2 px-2.5 border border-red-500 bg-red-50">
              <ErrorIcon style={{ fontSize: 20 }} />{' '}
              {conversionError || currencyError}
            </p>
          ) : null}
          {isLoadingCurrencies || isLoadingConversion ? (
            <div className="text-blue-700 bg-white rounded bg-opacity-60 absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
              <LoadingIcon style={{ fontSize: 50 }} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {step === 'source' && (
                <>
                  {cryptos.map((currency) => (
                    <CurrencyCard
                      key={currency.id}
                      type="crypto"
                      id={currency.id}
                      name={currency.name}
                      logo={currency.logo}
                      symbol={currency.symbol}
                      onSelect={() =>
                        setConversion((prev) => ({ ...prev, source: currency }))
                      }
                    />
                  ))}
                </>
              )}
              {step === 'target' && (
                <>
                  {fiats.map((currency) => (
                    <CurrencyCard
                      key={currency.id}
                      type="fiat"
                      id={currency.id}
                      name={currency.name}
                      sign={currency.sign}
                      symbol={currency.symbol}
                      onSelect={() =>
                        setConversion((prev) => ({ ...prev, target: currency }))
                      }
                    />
                  ))}
                </>
              )}
              {step === 'amount' && (
                <div className="col-span-2 relative">
                  <span className="inline-flex justify-center items-center absolute right-5 top-1/2 -translate-y-1/2 rounded-full text-2xl font-bold w-16 aspect-square">
                    {conversion?.source?.symbol}
                  </span>
                  <input
                    type="number"
                    placeholder="250"
                    onBlur={(e) =>
                      setConversion((prev) => ({
                        ...prev,
                        amount: Number(e.target.value),
                      }))
                    }
                    className="h-20 border-2 w-full pr-24 pl-5 text-3xl rounded outline-none hover:border-blue-700 focus:border-blue-700"
                  />
                </div>
              )}
              {step === 'rate' && (
                <ul className="col-span-2 flex justify-center items-center">
                  <ConversionCard conversion={conversion as Conversion} />
                </ul>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default React.memo(NewConversionModal);
