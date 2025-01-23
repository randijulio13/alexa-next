export type BaseActionResponse<T> = Promise<{
  data: T | null;
  error: string | null;
}>;

export type JWTPayload = {
  username: string;
  iat: number;
  exp: number;
};
