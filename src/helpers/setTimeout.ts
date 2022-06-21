export const addSetTimeout = (
  requiredName: string,
  setRequiredName: ({
    value,
    isStorage,
  }: {
    value: string;
    isStorage: boolean;
  }) => void,
) => {
  return setTimeout(
    () => setRequiredName({ value: requiredName, isStorage: false }),
    500,
  );
};

export const deleteSetTimeout = (timeoutId: ReturnType<typeof setTimeout>) =>
  window.clearTimeout(timeoutId);
