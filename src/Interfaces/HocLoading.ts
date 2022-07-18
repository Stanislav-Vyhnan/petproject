import { Profile } from './Profile';
import { Repo, ReposApi } from './Repos';
import { UsersApi } from './Users';

export default interface HocProps {
  isFastLoading?: React.MutableRefObject<{
    value: boolean;
  }>;
  initializationData?: Profile[];
  name: string;
  storageKey: string;
  query: string;
  mapper: any;
}

// (items: (UsersApi | ReposApi)[]) => (Promise<Profile> | Repo)[];
