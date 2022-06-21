const scrollHandler = (event: Event, setFetching: (value: boolean) => void) => {
  const e = event.target as HTMLInputElement;
  console.log(e.scrollHeight - (e.scrollTop + window.innerHeight));
  if (e.scrollHeight - (e.scrollTop + window.innerHeight) < 100) {
    setFetching(true);
  }
};

export default scrollHandler;
