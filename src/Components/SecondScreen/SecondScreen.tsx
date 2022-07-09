import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ReposList from './ReposList/ReposList';
import InputName from '../InputName/InputName';

import './SecondScreen.scss';
import mapperRepos from '../../helpers/mapperRepos';
import getUserProfile from '../../helpers/getUserProfile';

const noInfo = 'No information available';

const SecondScreen = () => {
  const repoNameStorage = localStorage.getItem('repoName');
  const { id } = useParams();
  const { avatarUrl, name, login, userInfo, followers, following, bio } =
    getUserProfile(id);

  const [repoName, setRepoName] = useState(
    repoNameStorage
      ? { isStorage: true, value: repoNameStorage }
      : { isStorage: false, value: '' },
  );

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
          repoName.value === '' ? '' : `${repoName.value}in:name&`
        }user:${login}`}
        mapper={mapperRepos}
      />
    </div>
  );
};

export default SecondScreen;
