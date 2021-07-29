import React from "react";
import { Footer, Text } from "grommet";

import styled from "styled-components";

const FooterLinks = styled.ul`
  display: flex;
  list-style: none;
  li {
    margin-left: 15px;
  }
`;

const AppFooter = () => {
  return (
    <Footer
      flex
      direction="row"
      pad={{ horizontal: "large", vertical: "medium" }}
    >
      <Text style={{ fontSize: "14px" }}>&copy; 2020 Hpe llc</Text>
      <FooterLinks>
        <li>Terms</li>
        <li>Contact Us</li>
        <li>About US</li>
      </FooterLinks>
    </Footer>
  );
};

export default AppFooter;
