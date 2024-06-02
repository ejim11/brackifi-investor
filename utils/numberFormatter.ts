export const formatNumber = (val: number) => {
  const newVal = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(val);

  return newVal;
};
