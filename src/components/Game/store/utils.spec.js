import { getMatrixCoords } from "./utils";

describe("Game/store utils", () => {
  describe("getMatrixCoords", () => {
    it("getMatrix should return correct matrix coordinates", () => {
      const cordNode = 5;
      const rowLength = 50;
      const correctResult = { col: 0, row: 5 };

      const res = getMatrixCoords(cordNode, rowLength);

      expect(res).toStrictEqual(correctResult);
    });
  });
});
