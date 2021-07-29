import { Box, Button, Text, Avatar } from "grommet";
import { User } from "grommet-icons";
import React, { useEffect, useRef, useState } from "react";

const UserSetting = ({ open, profileData = {} }) => {
  const inputRef = useRef();
  const [userData, setUserData] = useState(profileData.default)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Box width="small">
      <Box direction="row" justify="around" style={{ padding: "10px 0" }}>
        {userData.AvatarURL && (
          <Avatar src={userData.AvatarURL} size="medium" />
        )}
        {!userData.AvatarURL && (
           <Button
           style={{
             height: "50px",
             width: "50px",
             borderRadius: "50%",
             backgroundColor: "#7630EA",
             textAlign: "center",
           }}
           icon={<User style={{ stroke: "#fff" }} />}
         ></Button>
        )}
        <Box>
          <Text style={{ fontSize: "15px", fontWeight: "600" }}>
            {userData.FirstName} {' '} {userData.LastName}
          </Text>
          <Text style={{ fontSize: "10px" }}>{userData.Email}</Text>
        </Box>
      </Box>
      <hr
        style={{
          width: "99%",
          borderColor: "grey",
          opacity: "10%",
          background: "grey",
          borderStyle: "solid",
        }}
      />
      <Box direction="column" justify="around" style={{ padding: "0 20px" }}>
        <Button style={{ padding: "8px 0", fontSize: "13px" }}>
          Preferences
        </Button>
        <Button style={{ padding: "8px 0", fontSize: "13px" }}>
          My Bookmark
        </Button>
      </Box>
      <hr
        style={{
          width: "99%",
          borderColor: "grey",
          opacity: "10%",
          background: "grey",
          borderStyle: "solid",
        }}
      />
      <Box direction="row" justify="around" style={{ padding: "10px 0" }}>
        <Button
          style={{
            fontSize: "14px",
            fontWeight: "600",
            padding: "5px 10px",
            borderRadius: "3px",
            backgroundColor: "#17EBA0",
            color: "black",
          }}
          ref={inputRef}
        >
          My Account
        </Button>
        <Button
          style={{
            fontSize: "10px",
            fontWeight: "600",
            padding: "2px 8px",
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default UserSetting;
