import { Linking } from "react-native";

const processPressAction = (receivedId: string) => {
  switch (receivedId.split(".")[0]) {
    case "open-meet":
      const meetUrl = receivedId.split(".")[1];
      Linking.openURL(`https://meet.google.com/${meetUrl}`).then(r => {

      });
      break;
  }
};

export default processPressAction;
