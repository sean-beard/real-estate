/**
 * Converts a number to a string with commas as thousands separators.
 */
export const numberWithCommas = (num: number) => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
