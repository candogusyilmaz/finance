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

export const FormatPrice = (price: number | undefined, currencyCode = 'TRY') => {
  if (!price) {
    return '';
  }

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currencyCode
  }).format(price);
};

export const FormatPercentage = (value: number | undefined) => {
  if (!value || Number.isNaN(value)) {
    return '';
  }

  return `%${value.toFixed(2)}`;
};
