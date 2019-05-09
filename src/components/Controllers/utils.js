import { INSTRUCTION } from "../Game/constants";

export const getCurrentInfo = step => {
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
