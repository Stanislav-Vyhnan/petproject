import React, { useEffect, useState } from 'react';
import { addSetTimeout, deleteSetTimeout } from '../../helpers/setTimeout';

const InputName = ({
  name,
  setName,
  classStyle,
}: {
  name: { value: string; isStorage: boolean };
  setName: ({
    value,
    isStorage,
  }: {
    value: string;
    isStorage: boolean;
  }) => void;
  classStyle: string;
}) => {
  const [requiredName, setRequiredName] = useState(name.value);

  const requiredNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRequiredName(value);
  };

  useEffect(() => {
    if (name.isStorage) {
      setName({ ...name, isStorage: false });
    } else {
      const timeoutId: ReturnType<typeof setTimeout> = addSetTimeout(
        requiredName,
        setName,
      );
      return () => deleteSetTimeout(timeoutId);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredName]);

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={event => requiredNameOnChange(event)}
      value={requiredName}
      className={classStyle}
    />
  );
};

export default InputName;
