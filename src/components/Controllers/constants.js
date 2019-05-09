import { LeftArrow, RightArrow, UpArrow } from "../Common/Styled";
import { INSTRUCTION } from "../Game/constants";

export const controllers = [
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
