import { LIST_CURRENCIES_PATH } from '../consts/urls';

export const listCurrencies = async () => {
  try {
    const res = await fetch(LIST_CURRENCIES_PATH);
    const result = await res.json();
    return result;
  } catch (err) {
    return { error: 'Something went wrong!' };
  }
};
