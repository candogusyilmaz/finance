export type CreateAccessTokenRequest = {
  username: string;
  password: string;
};

export type CreateAccessTokenResponse = {
  displayName: string;
  permissions: string[];
  timezone?: string;
  title?: string;
  token: string;
};
