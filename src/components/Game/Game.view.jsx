import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const GameView = ({ maze, controllers, headline, settings }) => {
  return (
    <GameView.Wrapper>
      <h1>{headline}</h1>
      <GameView.Content>
        <GameView.Maze>{maze}</GameView.Maze>
        {controllers}
      </GameView.Content>
      {settings}
    </GameView.Wrapper>
  );
};

GameView.propTypes = {
  headline: PropTypes.string.isRequired,
  maze: PropTypes.node.isRequired,
  controllers: PropTypes.node.isRequired,
  settings: PropTypes.node.isRequired
};

GameView.Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

GameView.Content = styled.div`
  display: flex;
  padding-bottom: 2rem;
`;

GameView.Maze = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default GameView;
