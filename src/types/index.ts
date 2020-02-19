import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Onboarding } from 'modules/reviewOnboarding';
import { AuthState } from 'modules/auth/types';
import { CardState } from 'modules/card/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  onboardingReducer: Onboarding;
  authReducer: AuthState;
  cardReducer: CardState;
}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
