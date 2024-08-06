import { formatISO } from 'date-fns';

export const FormatDate = (params: string) => {
  if (params === undefined) {
    return '';
  }

  const date = new Date(params);
  return `${date.toLocaleString('tr-TR', {
    dateStyle: 'long'
  })}`;
};

export const FormatDateTime = (params: string) => {
  if (params === undefined) {
    return '';
  }

  const date = new Date(params);
  return `${date.toLocaleString('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short'
  })}`;
};

export const FormatPrice = (price: number | undefined, currencyCode: string | undefined = undefined) => {
  if (!price) {
    return '';
  }

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currencyCode === undefined || currencyCode.length !== 3 ? 'TRY' : currencyCode
  }).format(price);
};

export const FormatPercentage = (value: number | undefined) => {
  console.log(value);
  if (value === undefined || Number.isNaN(value)) {
    return '';
  }

  return `%${value.toFixed(2)}`;
};

export const FormatISODate = (value: string | number | Date) => {
  return formatISO(value, { representation: 'date' });
};

export const FormatISODateTime = (value: string | number | Date) => {
  return formatISO(value, { representation: 'complete' });
};
