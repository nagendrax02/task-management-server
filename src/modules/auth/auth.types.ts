export interface RegisterUserInput {
    name: string,
    email: string,
    password: string
}

export interface PublicUser {
    id: number,
    name: string,
    email: string,
    created_at: Date,
}

export interface LoginUserInput{
    email: string,
    password: string
}

export interface AuthUserRecord  {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

export type AuthUser = Omit<AuthUserRecord, "password_hash">;

export type LoginResult = {
  accessToken: string;
  tokenType: "Bearer";
  user: AuthUser;
};