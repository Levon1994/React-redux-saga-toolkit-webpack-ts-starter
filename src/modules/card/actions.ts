import { createAction } from 'deox';

export const changeCardData = createAction('card/CHANGE_CARD_DATA', resolve => (name, value) =>
  resolve(name, value),
);

export const setScanCard = createAction('card/SET_SCAN_CARD', resolve => payload =>
  resolve(payload),
);

export const scanCard = createAction('card/SCAN_CARD');
