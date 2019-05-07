import React, { useReducer, useState } from "react";
import * as R from "ramda";

import GameView from "./Game.view";
//TODO: Move all dependent components as nested to Game component
//TODO: Move default text when maze is not set to separate component
import Maze from "../Maze";
import Controllers from "../Controllers";
import Settings from "../Settings";
//Constants
import { rectSize, MAZE_COLORS } from "./constants";
//Utils
import { debounce } from "../utils";

import { reducer, initialState, SET_MAZE, MAKE_STEP } from "./store";

const Game = () => {
  // Maze reducer
  const [
    { maze, rowLength, colLength, step, instructions },
    dispatch
  ] = useReducer(reducer, initialState);

  // Actions
  const setMaze = debounce(value => {
    dispatch({ type: SET_MAZE, payload: value });
  }, 1000);
  const makeStep = value => {
    dispatch({ type: MAKE_STEP, payload: value });
  };

  //Textarea state
  const [textareaValue, setTextareaValue] = useState("");
  const setTextareaCb = e => {
    const value = R.path(["target", "value"], e);
    setTextareaValue(value);
    setMaze(value);
  };

  //Modal toggler
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <GameView
      headline="Shortest maze navigator"
      maze={
        R.isEmpty(maze) ? (
          "You need to set Maze firstly !"
        ) : (
          <Maze
            maze={maze}
            colLength={colLength}
            rowLength={rowLength}
            rectColors={MAZE_COLORS}
            rectSize={rectSize}
          />
        )
      }
      controllers={<Controllers step={instructions[step]} action={makeStep} />}
      settings={
        <Settings
          modalVisible={modalVisible}
          modalToggler={() => setModalVisible(R.not(modalVisible))}
          textareaValue={textareaValue}
          setTextareaValue={setTextareaCb}
        />
      }
    />
  );
};

export default Game;
