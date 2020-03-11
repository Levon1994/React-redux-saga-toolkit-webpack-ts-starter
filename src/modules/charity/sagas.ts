/* eslint-disable no-console */
import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { getType, ActionType } from 'deox';

import { Charity, CharityResponse, FeedResponse, ListCharitiesResponse } from 'api/Charity';
import { RootState } from 'types';

import { processRequestError } from 'modules/errors/actions';
import {
  getCharitiesList,
  getCharitiesListSuccess,
  getCharitiesListFail,
  getFilterCharity,
  getFilterCharitySuccess,
  getFilterCharityFail,
  getUserCharity,
  getUserCharitySuccess,
  getUserCharityFail,
  getUserFeed,
  getUserFeedSuccess,
  getMoreUserFeedSuccess,
  getUserFeedFail,
} from './actions';

function* getCharitiesListSaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { searchValue, checkFilter } = yield select((state: RootState) => state.charityReducer);
    const filterData: string[] = [];
    checkFilter.map((el: { label: string }) => filterData.push(el.label));
    console.log('checkFilter: ', filterData.join(', '));
    const { data }: ListCharitiesResponse = yield Charity.getCharitiesList(
      userId,
      searchValue,
      filterData.join(', '),
    );
    yield put(getCharitiesListSuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getCharitiesListFail }));
  }
}

function* getFilterCharitySaga() {
  try {
    const { data }: any = yield Charity.getFilterCharity();
    console.log('data: ', data);
    const filterArr = Object.keys(data).reduce((res, v) => {
      return res.concat(data[v]);
    }, []);
    console.log('arr: ', filterArr);
    yield put(getFilterCharitySuccess(filterArr));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getFilterCharityFail }));
  }
}

function* getUserCharitySaga() {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { data }: CharityResponse = yield Charity.getUserCharity(userId);
    yield put(getUserCharitySuccess(data));
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserCharityFail }));
  }
}

function* getUserFeedSaga({ payload }: ActionType<typeof getUserFeed>) {
  try {
    const { userId } = yield select((state: RootState) => state.userReducer);
    const { next_page } = yield select((state: RootState) => state.charityReducer);
    let page = 1;
    if (payload && next_page) {
      page = next_page;
    }
    const { data }: FeedResponse = yield Charity.getUserFeed(userId, page);
    if (payload) {
      yield put(getMoreUserFeedSuccess(data));
    } else {
      yield put(getUserFeedSuccess(data));
    }
  } catch (e) {
    yield put(processRequestError({ error: e, failAction: getUserFeedFail }));
  }
}

export function* watchCharityPeriodically() {
  while (true) {
    // get charity and user feed 5 times per day
    yield delay(17280000);
    yield put(getUserCharity());
    yield put(getUserFeed(false));
  }
}

export function* watchCharity() {
  yield takeLatest(getType(getCharitiesList), getCharitiesListSaga);
  yield takeLatest(getType(getFilterCharity), getFilterCharitySaga);
  yield takeLatest(getType(getUserCharity), getUserCharitySaga);
  yield takeLatest(getType(getUserFeed), getUserFeedSaga);
}
