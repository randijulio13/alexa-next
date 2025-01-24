export type JWTPayload = {
  username: string;
  name: string;
  iat?: number;
  exp?: number;
};

export type Formatter<T = string> = {
  format: (value: T) => string;
  parse: (value: string) => T;
};
