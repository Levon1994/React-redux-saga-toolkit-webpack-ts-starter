import { AxiosResponse } from 'axios';

import Api from '.';

export type CharityResponse = AxiosResponse<{
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}>;

export class Charity {
  static getUserCharity = (userId: number) => Api.get(`v1/customer/${userId}/impact`);
  static getUserFeed = (userId: number) => Api.get(`v1/customer/${userId}/transactions`);
}
