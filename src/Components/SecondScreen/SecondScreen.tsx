import React, { useEffect, useRef, useState } from 'react';
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
  const reposListRef = useRef(null);
  const { avatarUrl, name, login, userInfo, followers, following, bio } =
    getUserProfile(id);

  const [repoName, setRepoName] = useState(
    repoNameStorage
      ? { isStorage: true, value: repoNameStorage }
      : { isStorage: false, value: '' },
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const e = event.target as HTMLInputElement;
      if (e.scrollHeight - (e.scrollTop + window.innerHeight) < 100) {
        setFetching(true);
      }
    };

    if (reposListRef && reposListRef.current) {
      const element = reposListRef.current;
      // element?.addEventListener('scroll', scrollHandler);
      return () => {
        // element?.removeEventListener('scroll', scrollHandler);
      };
    }
    return undefined;
  }, []);

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
      <ul className="repos__list" ref={reposListRef}>
        <ReposList
          page={currentPage}
          setPage={setCurrentPage}
          fetching={fetching}
          setFetching={setFetching}
          name={repoName}
          storageKey="repo"
          query={`repositories?q=${
            repoName.value === '' ? '' : `${repoName.value}in:name&`
          }user:${login}`}
          mapper={mapperRepos}
        />
      </ul>
    </div>
  );
};

export default SecondScreen;
