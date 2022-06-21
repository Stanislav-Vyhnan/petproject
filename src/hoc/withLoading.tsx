import React, { useEffect, useState, forwardRef } from 'react';

import Loading from '../Components/Loading/Loading';

import { getData } from '../services/service';
import { Profile } from '../Interfaces/Profile';
import HocProps from '../Interfaces/HocLoading';
import { Repo } from '../Interfaces/Repos';

const withLoading = (Component: React.ElementType) => {
  const HocComponent: React.ElementType = forwardRef<
    HTMLUListElement,
    HocProps
  >(
    (
      { name, storageKey, query, mapper, page, setPage, fetching, setFetching },
      ref,
    ) => {
      const [isLoading, setIsLoading] = useState(false);
      const [data, setData] = useState<Profile[] | Repo[]>([]);

      useEffect(() => {
        setData(JSON.parse(localStorage.getItem(`${storageKey}s`) || 'false'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        setData([]);
      }, [query]);

      useEffect(() => {
        setIsLoading(false);
        if (name.isStorage) {
          setIsLoading(true);
        } else if (fetching) {
          getData(`${query}&page=${page}&per_page=30`)
            .then(res => {
              return Promise.all(mapper(res)).then(mapData => {
                setData(prev => [...prev, ...mapData]);
                setPage((prev: number) => prev + 1);
                setIsLoading(true);
                localStorage.setItem(`${storageKey}s`, JSON.stringify(mapData));
                localStorage.setItem(`${storageKey}Name`, name.value);
              });
            })
            .finally(() => setFetching(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fetching]);

      return isLoading ? (
        <Component data={data} />
      ) : (
        <>
          <Component data={data} />
          <Loading />
        </>
      );
    },
  );

  return HocComponent;
};

export default withLoading;

/*

const withLoading = (Component: React.ElementType) => {
  const HocComponent: React.ElementType = forwardRef<
    HTMLUListElement,
    HocProps
  >(({ name, storageKey, query, mapper, page, fetching }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Profile[] | Repo[]>(
      JSON.parse(localStorage.getItem(`${storageKey}s`) || 'false') || [],
    );

    useEffect(() => {
      console.log(fetching);
      setIsLoading(false);
      if (name.isStorage) {
        setIsLoading(true);
      } else {
        getData(`${query}+&page=${page}&+per_page=30`).then(res => {
          return Promise.all(mapper(res)).then(mapData => {
            setData((prev): any => [...prev, ...mapData]);
            setIsLoading(true);
            localStorage.setItem(`${storageKey}s`, JSON.stringify(mapData));
            localStorage.setItem(`${storageKey}Name`, name.value);
          });
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, fetching]);

    return isLoading ? <Component data={data} /> : <Loading />;
  });

  return HocComponent;
};

*/
