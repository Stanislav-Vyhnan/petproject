import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Loading from '../Components/Loading/Loading';

import { getData } from '../services/service';

import { Profile } from '../Interfaces/Profile';
import HocProps from '../Interfaces/HocLoading';
import { Repo } from '../Interfaces/Repos';

import deleteDuplicates from '../helpers/deleteDuplicates';
import scrollEventControll from '../helpers/scrollEventControll';
import clearUserStorage from '../helpers/clearUserStorage';

const withLoading = (Component: React.ElementType) => {
  const HocComponent: React.ElementType = ({
    name,
    storageKey,
    query,
    mapper,
  }: HocProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<(Profile | Repo)[]>([]);
    const listRef = useRef<HTMLUListElement>(null);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      clearUserStorage();
      setData([]);
      setCurrentPage(1);
      setFetching(true);
    }, [name.value]);

    useEffect(() => {
      return scrollEventControll(listRef, fetching, setFetching);
    }, []);

    useEffect(() => {
      setData(JSON.parse(localStorage.getItem(`${storageKey}s`) || 'false'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setIsLoading(true);
      if (name.isStorage) {
        setIsLoading(false);
      } else if (fetching) {
        getData(query, currentPage).then(res => {
          Promise.all(mapper(res)).then(mapedData => {
            const withOutDuplicates = deleteDuplicates(data, mapedData);

            setData(withOutDuplicates);
            setCurrentPage(currentPage + 1);
            setIsLoading(false);

            localStorage.setItem(
              `${storageKey}s`,
              JSON.stringify(withOutDuplicates),
            );
            localStorage.setItem(`${storageKey}Name`, name.value);
          });
        });
      }

      setFetching(false);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching]);

    return (
      <ul ref={listRef} className={`${storageKey}s`}>
        <Component data={data} />
        {isLoading && <Loading />}
      </ul>
    );
  };

  return HocComponent;
};

export default withLoading;

/*

const withLoading = (Component: React.ElementType) => {
  const HocComponent: React.ElementType = ({
    name,
    storageKey,
    query,
    mapper,
    page,
    setPage,
    fetching,
    setFetching,
  }: HocProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<(Profile | Repo)[]>([]);

    useEffect(() => {
      setData(JSON.parse(localStorage.getItem(`${storageKey}s`) || 'false'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      setData([]);
    }, [query]);

    useEffect(() => {
      console.log(fetching);
      setIsLoading(true);
      if (name.isStorage) {
        setIsLoading(false);
      } else if (fetching) {
        getData(query, page).then(res => {
          Promise.all(mapper(res)).then(mapedData => {
            const withOutDuplicates = deleteDuplicates(data, mapedData);

            setData(withOutDuplicates);
            setPage(page + 1);
            setIsLoading(false);

            localStorage.setItem(
              `${storageKey}s`,
              JSON.stringify(withOutDuplicates),
            );
            localStorage.setItem(`${storageKey}Name`, name.value);
          });
        });
      }

      setFetching(false);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching]);

    return (
      <>
        <Component data={data} />
        {isLoading && <Loading />}
      </>
    );
  };

  return HocComponent;
};

*/
