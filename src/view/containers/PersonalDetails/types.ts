import { UserTransactions } from 'modules/charity/types';

export interface PersonalDetailsProps {
  feedList?: any;
  renderFeedListItem: (item: any) => JSX.Element;
  isShowFeed: boolean;
  onPress: (isShowFeed: boolean) => void;
  userTransactionsData: UserTransactions;
  isLoadingTransactionsData: boolean;
  editCard: any;
}
