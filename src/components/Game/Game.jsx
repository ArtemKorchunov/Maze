import React, { useReducer, useState, useCallback } from "react";
import * as R from "ramda";

import GameView from "./Game.view";
//TODO: Move all dependent components as nested to Game component
import Maze from "../Maze";
import Controllers from "../Controllers";
import Settings from "../Settings";

//Utils
import { debounce } from "../utils";

import { reducer, initialState, SET_MAZE } from "./store";

const Game = () => {
  // Maze reducer
  const [{ maze }, dispatch] = useReducer(reducer, initialState);
  // Actions
  const setTextareaValue = e => {
    debounce(dispatch({ type: SET_MAZE, payload: e.target.value }));
  };
  //Modal toggler
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <GameView
      headline="Maze navigator"
      maze={R.isEmpty(maze) ? "You need to set Maze firstly !" : <Maze />}
      controllers={<Controllers />}
      settings={
        <Settings
          modalVisible={modalVisible}
          modalToggler={() => setModalVisible(R.not(modalVisible))}
        />
      }
    />
  );
};

export default Game;
