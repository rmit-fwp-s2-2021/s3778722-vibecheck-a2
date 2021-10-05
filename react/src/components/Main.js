import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//Styled-Components
const Title = styled(motion.h1)`
  color: #67f6e7;
  text-shadow: 1.5px 2px 3px rgba(255, 255, 255, 0.1); ;
`;

//Styled-Components
const Container = styled.div`
  display: grid;
  height: 100vh;
  padding: 3rem calc((100vw - 1300px) / 2);
  @media screen and (max-width: 768px) {
    grid-grid-template-columns: 1fr;
  }
`;

//Styled-Components
const TextContainer = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 3.5rem;
  }
  p {
    margin: 1rem 0;
    font-size: 1.5rem;
    line-height: 1.1;
  }
`;

//Styled-Components with motion framer
const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #fff;
`;

const Main = () => {
  return (
    <section id="main">
      <Container>
        <TextContainer>
          <Title
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
          >
            VIBE CHECK
          </Title>
          <motion.p
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
          >
            Get the Vibe Check Habit. Live Vibe Check.
          </motion.p>
          <br />
          <Button
            whileHover={{
              scale: 1.05,
              color: "#67F6E7",
              border: "2px solid #fff",
            }}
            whileTap={{
              scale: 0.9,
              backgroundColor: "#67F6E7",
              border: "none",
              color: "#000",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3 } }}
          >
            Get Started
          </Button>
        </TextContainer>
      </Container>
    </section>
  );
};

export default Main;
