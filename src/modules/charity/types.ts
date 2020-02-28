import { ResponseErrors } from 'types/responseData';

export interface UserCharity {
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}

export interface CharityState {
  userCharityData: UserCharity;
  isLoadingCharityData: boolean;
  getUserCharityError: ResponseErrors;
}
