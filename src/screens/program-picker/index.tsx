import React, { useEffect } from "react";
import PortalService from "../../services/PortalService";
import { Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { setProgramPickerShown } from "@redux/reducers/app.reducer";

const ProgramPickerModal = () => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isInitiated = await PortalService.checkProgramInitiated();
      console.log("initiated?", isInitiated);
      if (app.isLoggedIn && !app.authModalShown && !isInitiated) {
        dispatch(setProgramPickerShown(true));
      }
    })();
  }, [app]);
  return (
    <Modal style={{flex: 1}} visible={app.programPickerModalShown}>

    </Modal>
  )
};

export default ProgramPickerModal;
