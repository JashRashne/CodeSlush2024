import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const useStates = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isSetMedicinesOpen, setIsSetMedicinesOpen] = useState(false);
  const [isIsoAlertOpen, setIsIsoAlertOpen] = useState(false);
  const [isLeaveApplicationOpen, setIsLeaveApplicationOpen] = useState(false);
  const [isRoomEntryOpening, setIsRoomEntryOpening] = useState(false);
  const [isStressSOSOpen, setIsStressSOSOpen] = useState(false);

  return (
    <StateContext.Provider
      value={{
        isSettingOpen,
        setIsSettingOpen,
        isSetMedicinesOpen,
        setIsSetMedicinesOpen,
        isIsoAlertOpen,
        setIsIsoAlertOpen,
        isLeaveApplicationOpen,
        setIsLeaveApplicationOpen,
        isRoomEntryOpening,
        setIsRoomEntryOpening,
        isStressSOSOpen,
        setIsStressSOSOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
