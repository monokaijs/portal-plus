export interface BottomScreenParams {
  name: string;
  backgroundColor?: string | any;
  nextScreen: string;
  paddingBottom?: number;
}

export type MainTabsParams = {
  Feed: BottomScreenParams;
  Message: BottomScreenParams;
  Notification: BottomScreenParams;
  Tool: BottomScreenParams;
  Personal: BottomScreenParams;
};
