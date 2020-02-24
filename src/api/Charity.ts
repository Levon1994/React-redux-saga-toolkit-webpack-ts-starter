import { AxiosResponse } from 'axios';

import Api from '.';

export type CharityResponse = AxiosResponse<{
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}>;

export class Charity {
  static getUserCharity = () => Api.get('v1/customer/3/impact');
}
