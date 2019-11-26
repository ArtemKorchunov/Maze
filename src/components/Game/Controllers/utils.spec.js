import { getCurrentInfo } from "./utils";
import { INSTRUCTION } from "../constants";

describe("Controllers utils", () => {
  describe("getCurrentInfo function", () => {
    it("should return correct value if step is INSTRUCTION.TURN_LEFT", () => {
      const res = getCurrentInfo(INSTRUCTION.TURN_LEFT);

      expect(res).toStrictEqual({
        instruction: INSTRUCTION.TURN_LEFT,
        text: "Turn left"
      });
    });

    it("should return correct value if step is INSTRUCTION.TURN_RIGHT", () => {
      const res = getCurrentInfo(INSTRUCTION.TURN_RIGHT);

      expect(res).toStrictEqual({
        instruction: INSTRUCTION.TURN_RIGHT,
        text: "Turn right"
      });
    });

    it("should return correct value if step is INSTRUCTION.GO_ONE_STEP", () => {
      const stepCount = 1;
      const res = getCurrentInfo(stepCount);

      expect(res).toStrictEqual({
        instruction: INSTRUCTION.GO_ONE_STEP,
        text: `Go ${stepCount} step forward`
      });
    });

    it("should return correct value if step is INSTRUCTION.GO_MULTIPLE_STEPS", () => {
      const stepCount = 10;
      const res = getCurrentInfo(stepCount);

      expect(res).toStrictEqual({
        instruction: INSTRUCTION.GO_MULTIPLE_STEPS,
        text: `Go ${stepCount} step forward`
      });
    });

    it("should return correct value if step is undefined", () => {
      const res = getCurrentInfo();

      expect(res).toStrictEqual({
        instruction: null
      });
    });
  });
});
