import React, { useReducer, useState, useEffect } from "react";
import * as R from "ramda";

import GameView from "./Game.view";
//TODO: Move all dependent components as nested to Game component
//TODO: Move default text when maze is not set to separate component
import Maze from "../Maze";
import Controllers from "../Controllers";
import Settings from "../Settings";
//Constants
import { rectSize, MAZE_COLORS } from "./constants";

import { reducer, initialState, setMaze, MAKE_STEP } from "./store";

import TextSandbox from "../Common/TextSandbox";

const Game = () => {
  // Maze reducer
  const [
    {
      maze,
      rowLength,
      colLength,
      step,
      instructions,
      directions,
      human,
      shortestExitPath
    },
    dispatch
  ] = useReducer(reducer, initialState);

  // Actions
  const makeStep = value => {
    dispatch({ type: MAKE_STEP, payload: value });
  };

  //Textarea state
  const [textareaValue, setTextareaValue] = useState("");
  const setTextareaCb = e => {
    const value = R.path(["target", "value"], e);
    setTextareaValue(value);
    setMaze(value, dispatch);
  };

  //Modal toggler
  const [modalVisible, setModalVisible] = useState(false);

  const [textBoxVisible, setTextBoxVisible] = useState(false);

  useEffect(() => {
    if (human.position === shortestExitPath[shortestExitPath.length - 1]) {
      setTextBoxVisible(true);
      setTimeout(() => {
        setTextBoxVisible(false);
      }, 2000);
    }
  }, [human.position, shortestExitPath, step]);

  return (
    <>
      <GameView
        headline="Shortest maze navigator"
        maze={
          R.isEmpty(maze) ? (
            "You need to set Maze firstly !"
          ) : (
            <Maze
              maze={maze}
              directions={directions}
              colLength={colLength}
              rowLength={rowLength}
              rectColors={MAZE_COLORS}
              rectSize={rectSize}
            />
          )
        }
        controllers={
          <Controllers step={instructions[step]} action={makeStep} />
        }
        settings={
          <Settings
            modalVisible={modalVisible}
            modalToggler={() => setModalVisible(R.not(modalVisible))}
            textareaValue={textareaValue}
            setTextareaValue={setTextareaCb}
          />
        }
      />
      <TextSandbox isVisible={textBoxVisible} />
    </>
  );
};

export default Game;
