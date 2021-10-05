import React from "react";
import wallpaper2 from "../assets/Landing2.jpg";
import arrow from "../assets/arrow.svg";
import styled from "styled-components";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

//Styled-Components
const Wrapper = styled.section`
  background: url(${wallpaper2}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//Styled-Components
const Container = styled.div`
  display: grid;
  height: 100vh;
  padding: 3rem calc((100vw - 1300px) / 2);
`;

//Styled-Components
const TextContainer = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-center;
  padding: 5rem 2rem;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 3rem;
  }
  p {
    margin: 1rem 0;
    font-size: 1.5rem;
    line-height: 1.1;
    font-family: "Roboto", sans-serif;
  }
`;

//Styled-Components with framer motion
const Title = styled(motion.h1)`
  color: #67f6e7;
`;

const About = () => {
  return (
    //AnchorLink for smooth scroll
    <section id="about">
      <Wrapper>
        <Container>
          <TextContainer>
            <Title
              style={{ textShadow: "1.5px 2px 3px rgba(255,255,255,0.1)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              drag={true}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
            >
              About Us
            </Title>
            <p>University-wide student social networking web application.</p>
            <p>Developed by: Han Chien Leow</p>
            <AnchorLink offset="100" href="#main" className="p-5">
              <motion.img
                src={arrow}
                alt=""
                style={{ opacity: 0.7 }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: 0.7,
                  rotate: 360,
                  transition: { duration: 1 },
                }}
                whileHover={{
                  rotate: 180,
                  opacity: 0.8,
                  scale: 1.1,
                }}
              />
            </AnchorLink>
          </TextContainer>
        </Container>
      </Wrapper>
    </section>
  );
};

export default About;
