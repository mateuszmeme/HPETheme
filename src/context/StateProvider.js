import React, { useState } from "react";

export const StateContext = React.createContext({
  sideBarOpen: false,
  UserSettingOpen: false,
  NotificationLayerOpen: false,
  handleOpenUserSetting: () => {},
  handleSideBarOpen: () => {},
  handleNotificationLayerOpen: () => {},

  // Collaspisble
});

const StateProvider = (props) => {
  const [UserSettingOpen, setUserSettingOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [NotificationLayerOpen, setNotificationLayerOpen] = useState(false);

  const handleOpenUserSetting = (OpenUserSetting) => {
    setUserSettingOpen(!UserSettingOpen);
  };
  const handleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleNotificationLayerOpen = (NotificationLayerOpen) => {
    setNotificationLayerOpen(!NotificationLayerOpen);
  };

  return (
    <StateContext.Provider
      value={{
        sideBarOpen: sideBarOpen,
        UserSettingOpen: UserSettingOpen,
        NotificationLayerOpen: NotificationLayerOpen,
        handleOpenUserSetting: handleOpenUserSetting,
        handleSideBarOpen: handleSideBarOpen,
        handleNotificationLayerOpen: handleNotificationLayerOpen,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;
