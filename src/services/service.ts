import axios from 'axios';
import headers from '../constants/gitHubSettings';

import { UsersApi } from '../Interfaces/Users';
import { ProfileApi } from '../Interfaces/Profile';
import { ReposApi } from '../Interfaces/Repos';

const api = 'https://api.github.com/';

export const getData = async (
  query: string,
  page: number,
): Promise<ReposApi[] | UsersApi[]> => {
  const users = await axios
    .get<UsersApi | ReposApi>(
      `${api}search/${query}&page=${page}&per_page=30`,
      {
        headers,
      },
    )
    .then(({ data }) => {
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
