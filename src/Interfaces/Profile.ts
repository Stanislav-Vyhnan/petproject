export interface ProfilePart {
  id: number;
  name: string | null;
  login: string;
  followers: number;
  following: number;
  bio: string | null;
}

export interface UserInfo {
  id: number;
  info: string | null;
}

export interface ProfileApi extends ProfilePart {
  email: string | null;
  location: string | null;
  avatar_url: string;
  created_at: string;
  public_repos: number;
}

export interface Profile extends ProfilePart {
  userInfo: UserInfo[];
  avatarUrl: string;
  publicRepos: number;
}

export interface UsersListInterface {
  data: Profile[];
}
