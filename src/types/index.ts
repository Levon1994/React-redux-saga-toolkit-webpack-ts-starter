import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Onboarding } from 'modules/reviewOnboarding';
import { AuthState } from 'modules/auth/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  onboardingReducer: Onboarding;
  authReducer: AuthState;
}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
