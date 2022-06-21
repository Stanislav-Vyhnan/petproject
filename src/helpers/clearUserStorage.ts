const clearUserStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('repoName');
  localStorage.removeItem('repos');
};

export default clearUserStorage;
