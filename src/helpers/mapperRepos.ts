import { ReposApi, Repo } from '../Interfaces/Repos';

const mapperRepos = (items: ReposApi[]): Repo[] =>
  items.map((repoApi: ReposApi) => {
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
