export const addSetTimeout = (
  requiredName: string,
  setRequiredName: (value: string) => void,
) => {
  return setTimeout(() => setRequiredName(requiredName), 500);
};

export const deleteSetTimeout = (timeoutId: ReturnType<typeof setTimeout>) =>
  window.clearTimeout(timeoutId);
