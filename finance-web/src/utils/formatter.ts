export const FormatDate = (params: string) => {
  if (!params) {
    return '';
  }

  const date = new Date(params);
  return `${date.toLocaleString('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short'
  })}`;
};
