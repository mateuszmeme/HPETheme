import React from "react";
import { useState, useContext, useEffect } from "react";
import { Box, Button, Heading, Image, Text, DropButton, Stack } from "grommet";
import { Notification, AppsRounded, Brush, User } from "grommet-icons";
import ThemeSwitch from "../Overlays/ThemeSwitch";
import UserSettings from "../Overlays/UserSetting";

import QuickSearch from "../Overlays/QuickSearch";

import SideBar from "../Overlays/SideBar";

import { StateContext } from "../../context/StateProvider";

/* Have a mix of Grommet's theme, styled-components and CSS implementations. Recommend
 * adopting Grommet's theme and styled-components and eliminating any CSS / SCSS which 
 * can be a headache troubleshooting and maintaining.
 */
import "../../style/Header.scss";
import '../../style/navbar.scss'

import { ThemeContext } from "../../context/ThemeContext";
import StockHeader from './StockHeader'
import * as stockData from '../../data/stock.json';
//import * as profileData from '../../data/profile.json';

const HeaderLight = ({ config }) => {
    
    //console.log('stickyHeader:' +  config.stickyHeader );
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  let navbarClasses = [''];
  if (config.stickyHeader) {
    navbarClasses = ['navbar'];
    if (scrolled) {
      navbarClasses.push('scrolled');
    }
  }

    const context = useContext(StateContext);
    const { themeTransperent } = useContext(ThemeContext);

    const [NotificationLayerOpen, setNotificationLayerOpen] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleOpenNotificationLayer = () => {
        setNotificationLayerOpen(!NotificationLayerOpen);
        context.handleNotificationLayerOpen(NotificationLayerOpen);
    };


    let userIdentifier;


    if (!isAuthenticated) {
        userIdentifier = <Button icon={<User />} title="Not Authenticated" />
    } else {
        userIdentifier = <DropButton
            style={{
                height: "36px",
                width: "36px",
                borderRadius: "100px",
                textAlign: "center",
                borderColor: "black",
                fontSize: "18px",
                borderBlockColor: "black",
                backgroundColor: "#7630EA",
                display: 'flex',
                justifyContent: 'center',
                color: "#fff"
            }}
            dropAlign={{ top: "bottom", right: "right" }}
            label={`${profileData ?.FirstName ?.charAt(0)}${profileData ?.LastName ?.charAt(0)}`}
            dropContent={<UserSettings profileData={profileData} />}
        />;
    }

    //if (error) {
    //    return <div>Error: {error.message}</div>;
    //} else if (!isLoaded) {
    //    return <div>Loading...</div>;
    //} else {
    //}

    return (
        /* FYI, Grommet has a Header component which might be worth looking into.
         * https://v2.grommet.io/header
         */
        <header className={navbarClasses.join(" ")}>
            <Box
                elevation={themeTransperent ? "none" : "small"}
                direction="row"
                align="center"
                width="full"
                justify="between"
                pad={{ left: "large", right: "large", vertical: "small" }}
                style={{
                    height: "60px",
                    zIndex: "999",
                }}
                /* When themeTrasnsperent, do not specify a background, let underlying 
                 * contents show through.
                 */
                background={themeTransperent ? null : "normal-bg"}
            >
                <Box direction="row" align="center">
                    <Image fit="contain" width="100px" src="https://stage.news.now.hpe.com/hpnn/next/images/logo_insider.svg" />
                    <Heading level="5" margin="xsmall">
                        HPE
                    </Heading>
                    <Text margin="none" style={{ fontSize: "16px" }}>
                        Insider
                     </Text>
                </Box>

                <Box fill align="center" style={{ paddingLeft: '50px' }}>
                    <QuickSearch />
                </Box>

                <Box direction="row" align="center">
                    <StockHeader stockData={stockData} />
                    <Button
                        icon={<Notification />}
                        onClick={handleOpenNotificationLayer}
                        style={{
                            display: "none"
                        }}
                    />

                    {userIdentifier}

                    <DropButton
                        dropAlign={{ top: "bottom", right: "right" }}
                        icon={<Brush />}
                        style={{
                            display: "none"
                        }}
                        dropContent={<ThemeSwitch />}
                    />
                </Box>
            </Box>
        </header>
    );


};

export default HeaderLight;
