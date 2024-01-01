export type CryptoCurrency = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
};
export type FiatCurrency = {
  id: number;
  name: string;
  symbol: string;
  sign: string;
};
export type Conversion = {
  id: number;
  source: CryptoCurrency;
  amount: number;
  target: FiatCurrency;
  rate: number;
  lastSynced: number;
};
export type ConversionInput = {
  source: string;
  amount: number;
  target: string;
};
