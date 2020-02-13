import { createAction } from 'deox';

export const changeValue = createAction('auth/CHANGE_VALUE', resolve => (name, value) =>
  resolve(name, value),
);
