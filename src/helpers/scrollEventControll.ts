import { RefObject } from 'react';

const scrollEventControll = (
  ulListRef: RefObject<HTMLUListElement>,
  fetching: boolean,
  setFetching: (value: boolean) => void,
) => {
  const scrollHandler = (event: Event, setFetch: (value: boolean) => void) => {
    const e = event.target as HTMLInputElement;
    if (
      e.scrollHeight - (e.scrollTop + window.innerHeight) < 300 &&
      !fetching
    ) {
      setFetch(true);
    }
  };

  if (ulListRef && ulListRef.current) {
    const element = ulListRef.current;
    element?.addEventListener('scroll', event =>
      scrollHandler(event, setFetching),
    );
    return () => {
      element?.removeEventListener('scroll', event =>
        scrollHandler(event, setFetching),
      );
    };
  }

  return undefined;
};
export default scrollEventControll;
