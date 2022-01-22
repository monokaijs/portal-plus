/**
 * @format
 */

import { AppRegistry, Linking } from "react-native";
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { EventType } from "@notifee/react-native";
import processPressAction from "@utils/process-press-action";

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction && detail.pressAction.id) {
    const receivedId = detail.pressAction.id;
    processPressAction(receivedId);
  }
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log("background event");
  const { notification, pressAction } = detail;
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id) {
    // Update external API
    processPressAction(pressAction.id);
    // Remove the notification
    // await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
