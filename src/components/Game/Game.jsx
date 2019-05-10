import React, { useReducer, useState, useEffect } from "react";
import * as R from "ramda";

import GameView from "./Game.view";
import Maze from "./Maze";
import MazePlaceholder from "./MazePlaceholder";
import Controllers from "./Controllers";
import Settings from "./Settings";
import { usePrevious } from "../Common/hooks";
//Constants
import { rectSize, MAZE_COLORS } from "./constants";

import {
  reducer,
  initialState,
  setMaze,
  MAKE_STEP,
  SET_TEXTAREA
} from "./store";

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
      shortestExitPath,
      textareaValue
    },
    dispatch
  ] = useReducer(reducer, initialState);

  // Actions
  const makeStep = value => {
    dispatch({ type: MAKE_STEP, payload: value });
  };
  const setTextareaValue = value => {
    dispatch({ type: SET_TEXTAREA, payload: value });
  };
  //Textarea state
  const setTextareaCb = e => {
    const value = R.path(["target", "value"], e);
    setTextareaValue(value);
    setMaze(value, dispatch);
  };

  //Modal toggler
  const [modalVisible, setModalVisible] = useState(false);

  const [textBoxVisible, setTextBoxVisible] = useState(false);

  /* Check previous maze with current to auto close textarea modal */
  const prevMaze = usePrevious(maze);
  useEffect(() => {
    if (prevMaze !== maze && modalVisible) {
      setModalVisible(false);
    }
  }, [maze, modalVisible, prevMaze]);

  /* If human.position is exit, show congrat popup */
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
            <MazePlaceholder
              onClick={() => setModalVisible(R.not(modalVisible))}
            >
              You need to set maze firstly!
            </MazePlaceholder>
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
      <TextSandbox isVisible={textBoxVisible}>Congratulations!</TextSandbox>
    </>
  );
};

export default Game;
