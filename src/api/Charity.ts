import { AxiosResponse } from 'axios';

import Api from '.';

export type CharityResponse = AxiosResponse<{
  all_time_amount: number;
  charities: [];
  weekly_amount: number;
}>;

export interface UserCard {
  card_id: number;
  card_ending: string;
}

export type TransactionsResponse = AxiosResponse<{
  weekly_amount: number;
  weekly_goal: number;
  card: UserCard;
}>;

export class Charity {
  static getUserCharity = (userId: number) => Api.get(`v1/customer/${userId}/impact`);
  static getUserTransactions = (userId: number) =>
    Api.get(`v1/customer/${userId}/transactions/header`);
}
