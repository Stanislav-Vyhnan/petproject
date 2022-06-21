import axios from 'axios';
import headers from '../constants/gitHubSettings';

import { UsersApi } from '../Interfaces/Users';
import { ProfileApi } from '../Interfaces/Profile';
import { RepoApi } from '../Interfaces/Repos';

const api = 'https://api.github.com/';

export const getData = async (query: string) => {
  const users = await axios
    .get<UsersApi | RepoApi>(`${api}search/${query}`, {
      headers,
    })
    .then(({ data }) => {
      console.info(...data.items);
      return data.items;
    });
  return users;
};

export const getUserProfile = async (userName: string) => {
  const users = await axios
    .get<ProfileApi>(`${api}users/${userName}`, { headers })
    .then(({ data }) => {
      return data;
    });
  return users;
};
