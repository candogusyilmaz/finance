export const ConvertToNumber = (val: string | undefined) => {
  if (!val || Number.isNaN(val)) return undefined;

  return Number.parseInt(val);
};
