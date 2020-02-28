import { UserProfile } from 'modules/user/types';

export interface PersonalDetailsProps {
  feedList?: any;
  renderFeedListItem: (item: any) => JSX.Element;
  isShowFeed: boolean;
  onPress: (isShowFeed: boolean) => void;
  user: UserProfile;
  isLoadingUserData: boolean;
  editCard: any;
}
