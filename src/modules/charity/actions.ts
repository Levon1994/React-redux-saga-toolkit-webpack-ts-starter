import { createAction } from 'deox';
import { ResponseErrors } from 'types/responseData';
import { UserCharity, FeedData } from './types';

export const getUserCharity = createAction('charity/GET_USER_CHARITY_REQUEST');

export const getUserCharitySuccess = createAction(
  'charity/GET_USER_CHARITY_SUCCESS',
  resolve => (payload: UserCharity) => resolve(payload),
);

export const getUserCharityFail = createAction(
  'charity/GET_USER_CHARITY_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);

export const getUserFeed = createAction(
  'charity/GET_USER_FEED_REQUEST',
  resolve => (payload: boolean) => resolve(payload),
);

export const getUserFeedSuccess = createAction(
  'charity/GET_USER_FEED_SUCCESS',
  resolve => (payload: FeedData) => resolve(payload),
);

export const getMoreUserFeedSuccess = createAction(
  'charity/GET_MORE_USER_FEED_SUCCESS',
  resolve => (payload: FeedData) => resolve(payload),
);

export const getUserFeedFail = createAction(
  'charity/GET_USER_FEED_FAIL',
  resolve => (payload: ResponseErrors) => resolve(payload),
);
