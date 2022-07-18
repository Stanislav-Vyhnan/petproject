import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Profile } from '../../../Interfaces/Profile';

import withLoading from '../../../hoc/withLoading';

import { useAppDispatch } from '../../../store/hooks';
import { addUsers } from '../../../store/features/usersSlice';

import './UsersList.scss';

const UsersList = ({ data }: { data: Profile[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addUsers(data));
  }, [data]);

  return (
    <>
      {data.map(({ id, avatarUrl, name, publicRepos, login }) => (
        <Link to={`user/${login}`} key={id} className="users__link">
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
