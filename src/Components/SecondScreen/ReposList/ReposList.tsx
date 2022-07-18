import React from 'react';

import withLoading from '../../../hoc/withLoading';

import { Repo } from '../../../Interfaces/Repos';

import './ReposList.scss';

type ReposListType = { data: Repo[] };

const ReposList: React.FC<ReposListType> = ({ data }) => {
  return (
    <>
      {!!data.length &&
        data.map(({ id, name, repoUrl, forks, stars }) => (
          <a
            href={repoUrl}
            key={id}
            className="repo__link"
            target="_blank"
            rel="noreferrer"
          >
            <li className="repo__card">
              <p>{name}</p>
              <div className="repo__card__info">
                <span>{forks} Forks</span>
                <span>{stars} Stars</span>
              </div>
            </li>
          </a>
        ))}
    </>
  );
};

export default withLoading(ReposList);
