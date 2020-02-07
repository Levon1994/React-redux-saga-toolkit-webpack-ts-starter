import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
