import React, { useState } from 'react';

import UsersList from './UsersList/UsersList';

import InputName from '../InputName/InputName';

import mapperUsers from '../../helpers/mapperUsers';

import './FirstScreen.scss';

const FirstScreen: React.FC = () => {
  const nameStorage = localStorage.getItem('userName');
  const [userName, setUserName] = useState(
    nameStorage
      ? { isStorage: true, value: nameStorage }
      : { isStorage: false, value: '' },
  );

  return (
    <div className="first-screen">
      <InputName name={userName} setName={setUserName} classStyle="" />
      {userName.value !== '' ? (
        <UsersList
          name={userName}
          storageKey="user"
          query={`users?q=${userName.value}+in:name`}
          mapper={mapperUsers}
        />
      ) : (
        'Wait for input the required name'
      )}
    </div>
  );
};

export default FirstScreen;
