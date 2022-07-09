import React from 'react';
import { Link } from 'react-router-dom';

import withLoading from '../../../hoc/withLoading';

import './UsersList.scss';
import { Profile } from '../../../Interfaces/Profile';

const UsersList = ({ data }: { data: Profile[] }) => {
  return (
    <>
      {data.map(({ id, avatarUrl, name, publicRepos, login }) => (
        <Link to={`user/${id}`} key={id} className="users__link">
          <li className="users__card">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="users__card__avatar"
            />
            <span>
              {login} <p>{name || ''}</p>
            </span>
            <span>Repo: {publicRepos}</span>
          </li>
        </Link>
      ))}
    </>
  );
};

export default withLoading(UsersList);
