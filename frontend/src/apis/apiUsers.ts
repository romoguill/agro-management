import { User } from '../models/User';
import { callApi } from './customFetch';

export interface LoginBody {
  email: string;
  password: string;
}

export const login = async (credentials: LoginBody): Promise<User> => {
  const response = await callApi('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export interface SignUpBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUp = async (fields: SignUpBody): Promise<User> => {
  const response = await callApi('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  return response.json();
};
