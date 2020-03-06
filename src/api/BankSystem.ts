import { AxiosResponse } from 'axios';

import Api from '.';

export type BankSystemResponse = AxiosResponse<{
  results: {
    shortName: string;
    securityCodeCaption: null | string;
    loginIdCaption: string;
    bank_id: string;
    name: string;
    tier: string;
    secondaryLoginIdCaption: null | string;
    logo_square: string;
    logo_full: string;
    passwordCaption: string;
  }[];
}>;

export class BankSystem {
  static getBanksList = (searchValue: string) =>
    Api.get(`v1/basiq/institutions?search=${searchValue}`);
  static getTopBanks = () => Api.get(`v1/basiq/institutions?tier=1`);
}
