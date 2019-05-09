import React from "react";
import styled from "styled-components";

import Controller from "./Controller";
import { LeftArrow, RightArrow, UpArrow } from "../Common/Styled";
import { INSTRUCTION } from "../Game/constants";

const controllers = [
  {
    Icon: UpArrow,
    text: "Go some steps forward",
    instruction: INSTRUCTION.GO_MULTIPLE_STEPS
  },
  {
    Icon: LeftArrow,
    text: "Turn left",
    instruction: INSTRUCTION.TURN_LEFT
  },
  {
    Icon: UpArrow,
    text: "Go 1 step forward",
    instruction: INSTRUCTION.GO_ONE_STEP
  },
  {
    Icon: RightArrow,
    text: "Turn right",
    instruction: INSTRUCTION.TURN_RIGHT
  }
];

const getCurrentInfo = step => {
  if (step === INSTRUCTION.TURN_LEFT) {
    return { instruction: INSTRUCTION.TURN_LEFT, text: `Turn left` };
  }
  if (step === INSTRUCTION.TURN_RIGHT) {
    return { instruction: INSTRUCTION.TURN_RIGHT, text: `Turn right` };
  }
  if (step === 1) {
    return {
      instruction: INSTRUCTION.GO_ONE_STEP,
      text: `Go ${step} step forward`
    };
  }
  if (step > 1) {
    return {
      instruction: INSTRUCTION.GO_MULTIPLE_STEPS,
      text: `Go ${step} step forward`
    };
  }
  return { instruction: null };
};

const Controllers = ({ step, action }) => {
  const currentInfo = getCurrentInfo(step);
  return (
    <Controllers.Wrap>
      {controllers.map(
        ({ instruction: controllerInstruction, Icon, text }, index) => {
          if (controllerInstruction === currentInfo.instruction) {
            return (
              <Controller
                key={`controller_${index}`}
                icon={<Icon />}
                text={currentInfo.text}
                onClick={() => action(step)}
                active
              />
            );
          } else {
            return (
              <Controller
                key={`controller_${index}`}
                icon={<Icon />}
                text={text}
              />
            );
          }
        }
      )}
    </Controllers.Wrap>
  );
};

Controllers.Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

export default React.memo(Controllers);
