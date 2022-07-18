import { Profile } from '../Interfaces/Profile';
import { getUser } from '../store/features/usersSlice';
import { AppDispatch } from '../store/store';

const getIndexUser = (
  users: Profile[],
  login: string,
  dispatch: AppDispatch,
): number => {
  console.log(users);
  const indexOfUser = users.findIndex(user => user.login === login);
  if (indexOfUser === -1) {
    dispatch(getUser(login));
  }
  return indexOfUser;
};

export default getIndexUser;
