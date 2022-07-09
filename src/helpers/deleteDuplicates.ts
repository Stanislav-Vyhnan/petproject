const deleteDuplicates = <T extends { id: number }>(
  data: T[],
  apiData: T[],
): T[] => {
  const dataWithoutDuplicates = new Map();
  const combinedData = data.concat(apiData);

  for (let i = 0; i < combinedData.length; i += 1) {
    const element = combinedData[i];
    if (!dataWithoutDuplicates.has(element.id)) {
      dataWithoutDuplicates.set(element.id, element);
    }
  }

  return Array.from(dataWithoutDuplicates.values());
};

export default deleteDuplicates;
