import React, { useEffect, useRef, useState } from 'react';

import UsersList from './UsersList/UsersList';

import './FirstScreen.scss';
import InputName from '../InputName/InputName';
import mapperUsers from '../../helpers/mapperUsers';
import clearUserStorage from '../../helpers/clearUserStorage';

// import scrollHandler from '../../helpers/scrollHandler';

const FirstScreen: React.FC = () => {
  const nameStorage = localStorage.getItem('userName');
  const usersListRef = useRef<HTMLUListElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [userName, setUserName] = useState(
    nameStorage
      ? { isStorage: true, value: nameStorage }
      : { isStorage: false, value: '' },
  );

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const e = event.target as HTMLInputElement;
      if (e.scrollHeight - (e.scrollTop + window.innerHeight) < 100) {
        setFetching(true);
      }
    };

    if (usersListRef && usersListRef.current) {
      const element = usersListRef.current;
      element?.addEventListener('scroll', scrollHandler);
      return () => {
        element?.removeEventListener('scroll', scrollHandler);
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    clearUserStorage();
    setFetching(true);
    setCurrentPage(1);
  }, [userName.value]);

  // if user name get from storage isStorage = true / in other cases isStorage = false
  // this the logic created for to send the value from the storage immediately to store if it is

  return (
    <div className="first-screen">
      <InputName name={userName} setName={setUserName} classStyle="" />
      <ul className="users" ref={usersListRef}>
        {userName.value !== '' ? (
          <UsersList
            ref={usersListRef}
            page={currentPage}
            setPage={setCurrentPage}
            name={userName}
            storageKey="user"
            fetching={fetching}
            setFetching={setFetching}
            query={`users?q=${userName.value}+in:name`}
            mapper={mapperUsers}
          />
        ) : (
          'Wait for input the required name'
        )}
      </ul>
    </div>
  );
};

export default FirstScreen;
