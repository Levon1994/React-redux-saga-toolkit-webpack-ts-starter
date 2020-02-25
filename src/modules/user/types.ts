import { ResponseErrors } from 'types/responseData';

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  weekly_goal: number;
}

export interface UserState {
  userId: number | null;
  user: UserProfile;
  isLoadingUserData: boolean;
  getUserDataError: ResponseErrors;
}
