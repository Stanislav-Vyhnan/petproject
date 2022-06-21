import { Profile } from '../Interfaces/Profile';

const getUserProfile = (id: string | undefined): Profile => {
  const userStorage = JSON.parse(localStorage.getItem('user') || 'null');
  if (userStorage !== null) return userStorage;
  const userProfile = JSON.parse(localStorage.getItem('users') || '').filter(
    (user: Profile) => user.id === +id!,
  )[0];
  localStorage.setItem('user', JSON.stringify(userProfile));
  return userProfile;
};

export default getUserProfile;
