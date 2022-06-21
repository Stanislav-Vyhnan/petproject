export interface UserEntry {
  login: string;
  [key: string]: any;
}

export interface UsersApi {
  items: UserEntry[];
}
