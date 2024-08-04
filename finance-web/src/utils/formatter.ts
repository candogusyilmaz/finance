export const FormatDate = (params: string) => {
  if (!params) {
    return '';
  }

  const date = new Date(params);
  return `${date.toLocaleString('tr-TR', {
    dateStyle: 'long'
  })}`;
};

export const FormatDateTime = (params: string) => {
  if (!params) {
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

  let code = currencyCode;
  if (!code || code.length !== 3) code = 'TRY';

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: !currencyCode || currencyCode.length !== 3 ? 'TRY' : currencyCode
  }).format(price);
};

export const FormatPercentage = (value: number | undefined) => {
  if (!value || Number.isNaN(value)) {
    return '';
  }

  return `%${value.toFixed(2)}`;
};
