import { createAction } from 'deox';

export const changeCardData = createAction('auth/CHANGE_CARD_DATA', resolve => (name, value) =>
  resolve(name, value),
);
