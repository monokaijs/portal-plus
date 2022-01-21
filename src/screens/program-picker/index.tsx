import React, { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { setProgramPickerShown } from "@redux/reducers/app.reducer";
import ApiService from "../../services/ApiService";
import { IProgram } from "../../types";
import Text from "@components/common/Text";
import Block from "@components/common/Block";
import { useTheme } from "@react-navigation/native";
import { setCurrentProgram } from "@redux/reducers/calendar.reducer";

const ProgramPickerModal = () => {
  const { app, auth, calendar } = useSelector((state: RootState) => state);
  const { colors } = useTheme();
  const [selectedProgram, setSelectedProgram] = useState({} as IProgram);
  const [programs, setPrograms] = useState([] as IProgram[]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (app.appReady && auth.isLoggedIn) {
      ApiService.getAllPrograms().then(allPrograms => {
        // console.log(allPrograms);
        setPrograms(allPrograms);
      });
    }
  }, [app, auth]);

  return (
    <Modal style={{ flex: 1 }}
           visible={app.appReady && auth.isLoggedIn && (calendar.currentProgram.id === "-1" || calendar.currentProgram.id === "")}>
      <View style={{
        flex: 1,
      }}>
        <Block>
          <Text type={"h1"}>
            Choose program
          </Text>
          <Text style={{ marginTop: 16, opacity: .6 }}>
            Please choose your learning program. This will be used to load your daily & weekly calendar, please be
            consistent.
          </Text>
        </Block>
        <Block
          noMarginTop
          style={{flex: 1}}
        >
          <FlatList
            data={programs}
            renderItem={({ item }) => {
              const isSelected = item.ProgramId === selectedProgram.ProgramId;

              return (
                <TouchableOpacity
                  activeOpacity={.8}
                  style={{
                    padding: 16,
                    backgroundColor: isSelected ? colors.primary : "#00000006",
                    marginBottom: 8,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setSelectedProgram(item);
                  }}
                >
                  <Text style={{
                    color: isSelected ? "#FFFFFF" : colors.text,
                  }}>
                    {item.ProgramName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </Block>
        <Block>
          <TouchableOpacity
            style={{
              backgroundColor: selectedProgram.ProgramId === '-1' ? '#FFFFFF33' : colors.primary,
              padding: 16,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              dispatch(setCurrentProgram(selectedProgram));
            }}
          >
            <Text style={{color: "#FFFFFF"}}>SAVE</Text>
          </TouchableOpacity>
        </Block>
      </View>
    </Modal>
  );
};

export default ProgramPickerModal;
