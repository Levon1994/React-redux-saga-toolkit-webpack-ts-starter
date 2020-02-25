import { AxiosResponse } from 'axios';

import Api from '.';

export type GetUserProfileResponse = AxiosResponse<{
  email: string;
  first_name: string;
  last_name: string;
  weekly_goal: number;
}>;

export class UserProfile {
  static getUserProfile = (userId: number) => Api.get(`v1/customer/${userId}/profile`);
}
