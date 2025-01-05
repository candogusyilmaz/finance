export const sleep = (ms = 1) => {
  return new Promise((r) => setTimeout(r, ms));
};
