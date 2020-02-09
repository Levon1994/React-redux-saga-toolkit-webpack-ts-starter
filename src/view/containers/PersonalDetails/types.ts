export interface PersonalDetailsProps {
  feedList?: any;
  renderFeedListItem: (item: any) => JSX.Element;
  isShowFeed: boolean;
  onPress: (isShowFeed: boolean) => boolean;
};
