import { Profile } from './Profile';
import { Repo, ReposApi } from './Repos';
import { UsersApi } from './Users';

export default interface HocProps {
  name: { value: string; isStorage: boolean };
  storageKey: string;
  query: string;
  mapper: <
    T extends (UsersApi | ReposApi)[],
    U extends (Promise<Profile> | Repo)[],
  >(
    data: T,
  ) => U;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetching: boolean;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
}
