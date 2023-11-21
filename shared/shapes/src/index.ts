export enum AppRoutes {
  homepageText = "/api/text/home",
  login = "/api/user/login",
  register = "/api/user/register",
}

export interface HomePage {
  text: string;
}

export const UserRef = "user_model";

export interface User {
  name?: string;
  username: string;
  email?: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserCreatePayload {
  username: string;
  password: string;
  email: string;
}
