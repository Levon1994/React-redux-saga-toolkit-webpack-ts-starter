import { ResponseErrors } from 'types/responseData';

export interface CardState {
  card_number: string;
  cardHolder: string;
  expiryDate: string;
  cvcValue: string;
  isChange: boolean;
  errors: ResponseErrors;
  isLoadingCreateUserCard: boolean;
  createStatus: boolean;
  isLoadingGetUserCard: boolean;
  globalErrors: ResponseErrors;
}
