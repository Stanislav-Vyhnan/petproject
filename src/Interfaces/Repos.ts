export interface RepoPart {
  id: number;
  name: string;
  forks: number;
}

export interface Repo extends RepoPart {
  stars: number;
  repoUrl: string;
}

export interface ReposApi extends RepoPart {
  stargazers_count: number;
  html_url: string;
  [key: string]: any;
}
