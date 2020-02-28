import { ResponseErrors } from 'types/responseData';
import { UserCard } from 'api/Charity';

export interface UserCharity {
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}

export interface UserTransactions {
  weekly_amount: number;
  weekly_goal: number;
  card: UserCard;
}

export interface CharityState {
  userCharityData: UserCharity;
  userTransactionsData: UserTransactions;
  isLoadingTransactionsData: boolean;
  isLoadingCharityData: boolean;
  getUserCharityError: ResponseErrors;
}
