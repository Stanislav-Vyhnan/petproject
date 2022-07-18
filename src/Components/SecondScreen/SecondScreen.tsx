import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReposList from './ReposList/ReposList';
import InputName from '../InputName/InputName';

import './SecondScreen.scss';
import mapperRepos from '../../helpers/mapperRepos';
import getIndexUser from '../../helpers/getIndexUser';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUsers } from '../../store/features/usersSlice';
import { selectUser } from '../../store/features/userSlice';

const noInfo = 'No information available';

const SecondScreen = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const login = useParams().login || '';
  const profile = useAppSelector(selectUser);
  const [userProfile, setUserProfile] = useState(profile);

  const { avatarUrl, name, userInfo, followers, following, bio } = userProfile;

  const [repoName, setRepoName] = useState('');

  useEffect(() => {
    const indexOfUser = getIndexUser(users, login, dispatch);
    if (indexOfUser !== -1) setUserProfile(users[indexOfUser]);
  }, [users]);

  return (
    <div className="user">
      <div className="user__info">
        <img src={avatarUrl} alt="User avatar" className="user__avatar" />
        <ul className="user__list">
          <li>{name || login}</li>
          {userInfo.map(item => (
            <li key={item.id}>{item.info || noInfo}</li>
          ))}
          <li>{`${followers} Followers`}</li>
          <li>{`Following ${following}`}</li>
        </ul>
      </div>
      <span>{bio || noInfo}</span>
      <InputName
        name={repoName}
        setName={setRepoName}
        classStyle="search-repo-name"
      />
      <ReposList
        name={repoName}
        storageKey="repo"
        query={`repositories?q=${
          repoName === '' ? '' : `${repoName}in:name&`
        }user:${login}`}
        mapper={mapperRepos}
      />
    </div>
  );
};

export default SecondScreen;
