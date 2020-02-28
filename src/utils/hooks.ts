import { ActionCreator, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo, useRef, useEffect } from 'react';
import { Action } from 'deox';

export function useAction<T extends ActionCreator<Action<string>>>(action: T): T {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [dispatch]);
}

export function usePrevious<T>(value: T): T | void {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
