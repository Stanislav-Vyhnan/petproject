import React from 'react';

import withLoading from '../../../hoc/withLoading';
import { Repo } from '../../../Interfaces/Repos';

import './ReposList.scss';

const ReposList = ({ data }: { data: Repo[] }) => {
  return (
    <ul className="repos__list">
      {data.map(({ id, name, repoUrl, forks, stars }) => (
        <a
          href={repoUrl}
          key={id}
          className="list__repo__link"
          target="_blank"
          rel="noreferrer"
        >
          <li className="list__repo__card">
            <p>{name}</p>
            <div className="repo__card__info">
              <span>{forks} Forks</span>
              <span>{stars} Stars</span>
            </div>
          </li>
        </a>
      ))}
    </ul>
  );
};

export default withLoading(ReposList);
