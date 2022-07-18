import { UsersApi } from '../Interfaces/Users';
import { Profile, ProfileApi } from '../Interfaces/Profile';
import { getUserProfileAPI } from '../services/service';

export const mappperUser = (profile: ProfileApi): Profile => {
  const {
    id,
    avatar_url: avatarUrl,
    name,
    public_repos: publicRepos,
    login,
    email,
    location,
    created_at: createdAt,
    followers,
    following,
    bio,
  } = profile;

  const fullProfile: Profile = {
    id,
    avatarUrl,
    name,
    login,
    bio,
    publicRepos,
    userInfo: [
      { id: 1, info: email },
      { id: 2, info: location },
      { id: 3, info: createdAt },
    ],
    followers,
    following,
  };
  return fullProfile;
};

export const mapperUsers = (items: UsersApi[]): Promise<Profile>[] =>
  items.map((user: UsersApi) =>
    getUserProfileAPI(user.login).then(mappperUser),
  );
