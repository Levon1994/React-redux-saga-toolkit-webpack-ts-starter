import { ResponseErrors } from 'types/responseData';
import { UserCard } from 'api/UserProfile';

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  weekly_goal: number;
  weekly_amount: number;
  card: UserCard;
}

export interface UserState {
  userId: number | null;
  user: UserProfile;
  isLoadingUserData: boolean;
  getUserDataError: ResponseErrors;
  errors: ResponseErrors;
  userToken: string | null;
  createdBankAccountStatus: boolean;
}
