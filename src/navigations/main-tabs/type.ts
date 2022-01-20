export interface BottomScreenParams {
  name: string;
  backgroundColor?: string | any;
  nextScreen: string;
  paddingBottom?: number;
}

export type MainTabsParams = {
  Home: BottomScreenParams;
  Calendar: BottomScreenParams;
  Notification: BottomScreenParams;
  Tool: BottomScreenParams;
  Personal: BottomScreenParams;
};
