import { AxiosResponse } from 'axios';

import Api from '.';

export interface UserCard {
  card_id: number;
  card_ending: string;
}

export type GetUserProfileResponse = AxiosResponse<{
  email: string;
  first_name: string;
  last_name: string;
  weekly_goal: number;
  weekly_amount: number;
  card: UserCard;
}>;

export class UserProfile {
  static getUserProfile = (userId: number) => Api.get(`v1/customer/${userId}/profile`);
}
