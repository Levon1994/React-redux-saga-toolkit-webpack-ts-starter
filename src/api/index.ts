import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { config } from 'config';

export class Api {
  static instance: Api;
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      baseURL: config.API_URI,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios() {
    return Api.getInstance().axiosInstance;
  }

  static setAuthToken(token: string | null) {
    Api.getAxios().defaults.headers.Authorization = `Bearer ${token}`;
  }

  static clearAuthToken() {
    Api.getAxios().defaults.headers.Authorization = null;
  }

  static get<T = any>(
    url: string,
    params: object = {},
    config: AxiosRequestConfig = {},
  ): AxiosPromise<T> {
    return Api.getAxios().get(url, { params, ...config });
  }

  static post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }
}

export default Api;
