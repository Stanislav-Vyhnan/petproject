import { RepoApi, Repo } from '../Interfaces/Repos';

const mapperRepos = (items: RepoApi[]): Repo[] =>
  items.map((repoApi: RepoApi) => {
    const {
      id,
      name,
      forks,
      stargazers_count: stars,
      html_url: repoUrl,
    } = repoApi;

    const repo: Repo = {
      id,
      name,
      forks,
      stars,
      repoUrl,
    };

    return repo;
  });

export default mapperRepos;
