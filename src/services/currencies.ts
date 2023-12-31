import { GET_CONVERSION_RATE_PATH, LIST_CURRENCIES_PATH } from '../consts/urls';

export const listCurrencies = async () => {
  try {
    const res = await fetch(LIST_CURRENCIES_PATH);
    const result = await res.json();
    return result;
  } catch (err) {
    return { error: 'Something went wrong!' };
  }
};

export const getConversionRate = async ({
  source,
  amount,
  target,
}: {
  source: string;
  amount: number;
  target: string;
}) => {
  try {
    const res = await fetch(
      `${GET_CONVERSION_RATE_PATH}?source=${source}&amount=${amount}&target=${target}`
    );
    const result = await res.json();
    return result;
  } catch (err) {
    return { error: 'Something went wrong!' };
  }
};
