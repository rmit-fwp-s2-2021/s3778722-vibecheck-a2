import React from "react";
import Main from "../components/Main";
import About from "../components/About";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import wallpaper from "../assets/Landing.jpg";

//Styled-Components
const Wrapper = styled.section`
  background: url(${wallpaper}) no-repeat center center fixed;
  background-size: cover;
`;

//used a seperate page for the landing page becasue of the readily individual components.
const Landing = () => {
  return (
    <div>
      <Wrapper>
        <Navbar color="transparent" about="anchor" />
        <Main />
        <About />
      </Wrapper>
    </div>
  );
};

export default Landing;
