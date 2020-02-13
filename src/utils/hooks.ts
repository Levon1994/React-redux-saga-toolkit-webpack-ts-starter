import { ActionCreator, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Action } from 'deox';

export function useAction<T extends ActionCreator<Action<string>>>(action: T): T {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [dispatch]);
}
