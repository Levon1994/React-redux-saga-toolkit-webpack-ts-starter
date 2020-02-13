interface ValueField {
  value: string;
  error: string;
}

export interface AuthState {
  firstName: ValueField;
  lastName: ValueField;
  email: ValueField;
  password: ValueField;
}
