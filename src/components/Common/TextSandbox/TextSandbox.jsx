import React from "react";
import posed, { PoseGroup } from "react-pose";
import SplitText from "react-pose-text";
import styled from "styled-components";

import "./styles.css";

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 60
  }
};

function TextSandbox({ text = "Congratulations !", isVisible }) {
  return (
    <PoseGroup>
      {isVisible && (
        <Modal key="modal" className="modal">
          <TextSandbox.SplitText
            initialPose="exit"
            pose="enter"
            charPoses={charPoses}
          >
            {text}
          </TextSandbox.SplitText>
        </Modal>
      )}
    </PoseGroup>
  );
}

TextSandbox.Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
`;

TextSandbox.SplitText = styled(SplitText)`
  color: #fff;
  font-size: 64px;
  font-family: PT Sans, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 200;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

export default TextSandbox;
