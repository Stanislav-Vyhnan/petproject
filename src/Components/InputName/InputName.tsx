import React, { useEffect, useState } from 'react';
import { addSetTimeout, deleteSetTimeout } from '../../helpers/setTimeout';

const InputName = ({
  name,
  setName,
  classStyle,
}: {
  name: string;
  setName: (value: string) => void;
  classStyle: string;
}) => {
  const [requiredName, setRequiredName] = useState(name);

  const requiredNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRequiredName(value);
  };

  useEffect(() => {
    const timeoutId: ReturnType<typeof setTimeout> = addSetTimeout(
      requiredName,
      setName,
    );
    return () => deleteSetTimeout(timeoutId);

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
