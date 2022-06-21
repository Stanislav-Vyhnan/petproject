import { UserEntry } from '../Interfaces/Users';
import { Profile } from '../Interfaces/Profile';
import { getUserProfile } from '../services/service';

const mapperUsers = (items: UserEntry[]): Promise<Profile>[] =>
  items.map(user =>
    getUserProfile(user.login).then(profile => {
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
    }),
  );

export default mapperUsers;
