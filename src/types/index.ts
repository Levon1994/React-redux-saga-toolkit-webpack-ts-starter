import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Onboarding } from 'modules/reviewOnboarding';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  onboardingReducer: Onboarding;
}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
