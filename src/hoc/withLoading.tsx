import React, { useEffect, useRef, useState } from 'react';

import Loading from '../Components/Loading/Loading';

import { getDataAPI } from '../services/service';

import { Profile } from '../Interfaces/Profile';
import HocProps from '../Interfaces/HocLoading';
import { Repo } from '../Interfaces/Repos';

import deleteDuplicates, {
  DeleteDuplicatesTypes,
} from '../helpers/deleteDuplicates';
import scrollEventControll from '../helpers/scrollEventControll';

const withLoading = <T extends { data: Profile[] | Repo[] }>(
  Component: React.ComponentType<T>,
): React.FC<T> => {
  const HocComponent: React.FC<HocProps> = ({
    isFastLoading,
    initializationData,
    name,
    storageKey,
    query,
    mapper,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState<(Profile | Repo)[]>(
      initializationData || [],
    );
    const listRef = useRef<HTMLUListElement>(null);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      return scrollEventControll(listRef, fetching, setFetching);
    }, []);

    useEffect(() => {
      setData([]);
      setCurrentPage(1);
      setFetching(true);
    }, [name]);

    useEffect(() => {
      setIsLoading(true);

      const fastLoading = isFastLoading?.current;

      if (fastLoading?.value) {
        fastLoading.value = false;

        setIsLoading(false);
      } else if (fetching) {
        getDataAPI(query, currentPage)
          .then(res => {
            Promise.all(mapper(res)).then((mapedData: (Repo | Profile)[]) => {
              const withOutDuplicates = deleteDuplicates(data, mapedData);

              setData(withOutDuplicates);
              setCurrentPage(currentPage + 1);
              setIsLoading(false);
            });
          })
          .finally(() => setFetching(false));
      }

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
