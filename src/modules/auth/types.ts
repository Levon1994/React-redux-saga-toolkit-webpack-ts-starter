import { ResponseErrors } from 'types/responseData';

export interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthState {
  values: Values;
  registerStatus: boolean;
  errors: ResponseErrors;
}
