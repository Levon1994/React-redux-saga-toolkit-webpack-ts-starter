import { AxiosResponse } from 'axios';

import Api from '.';

export type CharityResponse = AxiosResponse<{
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}>;

export type FeedResponse = AxiosResponse<{
  donations: {};
  next_page: null | number;
  pages: number;
}>;

export class Charity {
  static getUserCharity = (userId: number) => Api.get(`v1/customer/${userId}/impact`);
  static getUserFeed = (userId: number, page: number) =>
    Api.get(`v1/customer/${userId}/transactions?page=${page}`);
}
