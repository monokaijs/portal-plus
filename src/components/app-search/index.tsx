import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "@config/styling";
import Text from "@components/common/Text";
import Icon from "react-native-vector-icons/Ionicons";

const AppSearch = () => {
  return (
    <View style={{
      flexDirection: "row",
      height: 44,
      backgroundColor: Colors.inputBackground,
      borderRadius: 24,
      padding: 8,
      paddingLeft: 20,
      alignItems: "center",
    }}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
      >
        <Text style={{ color: "#D4D4D4", fontSize: 12 }}>
          Search for courses...
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          backgroundColor: Colors.primary,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          name="search-outline"
          size={16}
          color={"#FFF"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppSearch;
