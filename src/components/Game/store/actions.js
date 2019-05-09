//Utils
import { debounce } from "../../utils";
import { SET_MAZE } from "./constants";

export const setMaze = debounce((value, dispatch) => {
  dispatch({ type: SET_MAZE, payload: value });
}, 1000);
