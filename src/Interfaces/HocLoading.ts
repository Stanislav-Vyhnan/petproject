import { Profile } from './Profile';
import { Repo, RepoApi } from './Repos';
import { UserEntry } from './Users';

export default interface HocProps {
  name: { value: string; isStorage: boolean };
  storageKey: string;
  query: string;
  mapper: <T extends UserEntry[] | RepoApi, U extends Repo | Profile>(
    data: T,
  ) => T | U;
  page: number;
  setPage: any;
  fetching: boolean;
  setFetching: any;
}
