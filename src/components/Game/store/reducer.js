import { SET_MAZE } from "./constants";
import { splitByNewLine } from "../../utils";
import * as R from "ramda";

export const initialState = {
  rowLength: 0,
  colLength: 0,
  maze: "",
  arrow: {
    direction: "",
    position: 0
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_MAZE: {
      const splitedArr = splitByNewLine(action.payload);

      const colLength = splitedArr.length;
      const maze = R.join("", splitedArr);
      const rowLength = maze.length / colLength;

      return R.mergeDeepRight(state, {
        colLength,
        rowLength,
        maze
      });
    }
    default: {
      return state;
    }
  }
};
