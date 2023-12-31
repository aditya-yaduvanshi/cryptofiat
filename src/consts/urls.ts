export const API_URL = import.meta.env.VITE_API_URL ?? '';
export const LIST_CURRENCIES_PATH = `${API_URL}/api/v1/currencies`;
export const GET_CONVERSION_RATE_PATH = `${API_URL}/api/v1/currencies/crypto-to-fiat`;
