export interface LoginBody {
  email: string;
  password: string;
}

export interface SignUpBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
