import client from './client';
import {AuthResult, User} from './types';

export async function register(params: RegisterParams) {
  const response = await client.post<AuthResult>('/auth/register', params);
  return response.data;
}

export async function login(params: LoginParams) {
  const response = await client.post<AuthResult>('/auth/login', params);
  return response.data;
}

export async function getLoginStatus() {
  const response = await client.get<User>('/user/me');
  return response.data;
}

interface RegisterParams {
  username: string;
  password: string;
  email: string;
}

interface LoginParams {
  identifier: string;
  password: string;
}
