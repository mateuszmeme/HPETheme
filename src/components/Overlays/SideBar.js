import React, { useContext, useState, useRef, useEffect } from "react";
import { Box, Button, Image, Layer, Text } from "grommet";
import "../../style/SideBar.scss";
import data from "../../data/model.json";
import { StateContext } from "../../context/StateProvider";
import { FormPrevious } from "grommet-icons";

const SideBar = () => {
  const drop = useRef();

  // SideBar Open
  const { sideBarOpen, handleSideBarOpen } = useContext(StateContext);

  // SideBar Close
  const onClose = () => handleSideBarOpen(!sideBarOpen);

  //Setting Index and SubIndex
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  // Setting Layer Toggle
  const [layerOpen, setLayerOpen] = useState(false);

  // SubMenu Handling
  const handleEvent = (subIndex, index) => {
    setIndex(Number(index));
    setSubIndex(Number(subIndex));
    setLayerOpen(!layerOpen);
  };
  // Back Events
  const onBack = (type) => {
    setLayerOpen(!layerOpen);
  };
const closeLayers = () => {  
  document.getElementById("sideBarBtn").click();

}
  // SubMenus Layer
  const GeneralLayer = ({ index, subIndex }) => {
    return (
      <Layer
        animation="fadeIn"
        full="true"
        position="right"
        height="100%"      
        onClickOutside={onClose}
        onEsc={onClose}  
        modal={false}
        target={drop.current}
      >
        <Box
          pad={{ top: "medium" }}
          width="260px"
          flex
          direction="column"
          align="start"
          overflow={{ vertical: "hidden", horizontal: "hidden" }}
         responsive="false"
       >
          <div style={{ margin: "0 0 0 1em" }}>
            <Button
              plain
              focusIndicator={false}
              icon={<FormPrevious />}
              onClick={() => onBack()}
            />
            <Text
              margin={{ horizontal: "small" }}
              size="medium"
              style={{ width: "100%" }}
            >
              {data.header.links[index].links[subIndex].label}
            </Text>
          </div>
          <hr
            color="BBBBBB"
            style={{
              width: "100%",
            }}
          />
          {data.header.links[index].links[subIndex].links.map((e, index) => (
            <Button
              alignSelf="start"
              plain
              margin={{ vertical: "xxsmall", horizontal: "small" }}
              focusIndicator={false}
              size="large"
              href={e.href}
              target={e.target}
              key={index}       
              onClick={closeLayers}      
            >
              <Box flex direction="row" align="center">
                {e.icon && (
                   <Image
                   fit="contain"
                   style={{
                     height: "35px",
                     marginRight: "10px",
                     flex: 0,
                     overflow: 'visible'
                   }}
                   src={e.icon}
                 />
                )}
                <Text
                  size="xsmall"
                  weight="bold"
                  margin={{ horizontal: "small", vertical: "xsmall" }}
                >
                  {e.label}
                </Text>
              </Box>
            </Button>
          ))}
        </Box>
      </Layer>
    );
  };

  useEffect(() => {
    // updated the menu-sidebar max height
    // Grommet not accepting property to customize the max-height or custom classname for parent modal box
    const menuDropContent = document.querySelector(".drop-content");
    menuDropContent.parentElement.classList.add('menu-drop-button')
  }, []);

  useEffect(() => {
    const menuDropContent = document.querySelector(".menu-drop-button");
    if (menuDropContent) {
      if (layerOpen) {
        menuDropContent.classList.add('SideBarHidden');
      } else {
        menuDropContent.classList.remove('SideBarHidden');
      }
    }
  }, [layerOpen]);

  return (
    <Box
        pad={{ vertical: "small" }}
        width="240px"
        ref={drop}
        className="drop-content"
        overflow={{ vertical: "hidden", horizontal: "hidden" }}
        responsive={false}        
    >
      {data.header.links.map((e, index) => (
        <>
          <Text
            margin={{ vertical: "xsmall", horizontal: "medium" }}
            key={index}
          >
            {e.label}
          </Text>
          {e.links.map((e, array) => (
            <Button
              flex
              alignSelf="start"
              margin={{ vertical: "small", horizontal: "medium" }}
              plain
              focusIndicator={false}
              onClick={() => handleEvent(array, index)}
              key={e.label}
              children={
                <Box plain flex direction="row" align="center" justify="center">
                  {e.icon && (
                    <Image
                      fit="contain"
                      style={{
                        height: "35px",
                        flex: 0,
                        overflow: 'visible',
                        marginRight: "10px"
                      }}
                      src={e.icon}
                    />
                  )}
                  <Text size="medium" weight="bold">
                    {e.label}
                  </Text>
                </Box>
              }
            />
          ))}

          <hr
            color="BBBBBB"
            style={{
              width: "100%",
            }}
          />
        </>
      ))}
      {layerOpen && <GeneralLayer index={index} subIndex={subIndex} />}
    </Box>
  );
};

export default SideBar;
