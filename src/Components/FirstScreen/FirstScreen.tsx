import React, { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  addRequiredUserName,
  selectRequiredUserName,
  selectUsers,
} from '../../store/features/usersSlice';

import UsersList from './UsersList/UsersList';

import InputName from '../InputName/InputName';

import { mapperUsers } from '../../helpers/mapperUsers';

import './FirstScreen.scss';

const FirstScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const areUsers = useRef<{ value: boolean }>({
    value: !!users.length,
  });
  const requiredUserName = useAppSelector(selectRequiredUserName);

  const [userName, setUserName] = useState(requiredUserName);

  useEffect(() => {
    areUsers.current.value = !!users.length;
  }, []);

  useEffect(() => {
    dispatch(addRequiredUserName(userName));
  }, [userName]);

  return (
    <div className="first-screen">
      <InputName name={userName} setName={setUserName} classStyle="" />
      {userName !== '' ? (
        <UsersList
          initializationData={users}
          isFastLoading={areUsers}
          name={userName}
          storageKey="user"
          query={`users?q=${userName}+in:name`}
          mapper={mapperUsers}
        />
      ) : (
        'Wait for input the required name'
      )}
    </div>
  );
};

export default FirstScreen;
