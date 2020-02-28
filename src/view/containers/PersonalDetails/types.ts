import { UserProfile } from 'modules/user/types';
import { Feed } from 'modules/charity/types';

export interface PersonalDetailsProps {
  userFeedData: Feed[];
  renderFeedListItem: (item: any) => JSX.Element;
  isShowFeed: boolean;
  onPress: (isShowFeed: boolean) => void;
  user: UserProfile;
  isLoadingUserData: boolean;
  editCard: any;
  isLoadingFeedData: boolean;
}
