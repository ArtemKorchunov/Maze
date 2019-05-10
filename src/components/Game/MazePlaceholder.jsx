import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MazePlaceholder = ({ children, onClick }) => {
  return (
    <MazePlaceholder.Content onClick={onClick}>
      {children}
    </MazePlaceholder.Content>
  );
};

MazePlaceholder.Content = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${props => props.theme.colors.base};
    border-bottom: 1px solid ${props => props.theme.colors.base};
  }
`;

MazePlaceholder.propTypes = {
  onClick: PropTypes.func.isRequired
};
export default MazePlaceholder;
