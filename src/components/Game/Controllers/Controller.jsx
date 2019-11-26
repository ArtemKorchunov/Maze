import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Controller = ({ icon, text, onClick, active, className }) => {
  return (
    <Controller.Wrap onClick={onClick} active={active} className={className}>
      {icon}
      <Controller.Text>{text}</Controller.Text>
    </Controller.Wrap>
  );
};

Controller.Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-height: 40px;
  padding: ${props => props.theme.paddings.md};
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadow.gray};
  margin-bottom: 20px;
  transform: scale(${props => (props.active ? "1.1" : "1")});
  opacity: ${props => (props.active ? 1 : 0.5)};
  cursor: ${props => (props.active ? "pointer" : "not-allowed")};
`;

Controller.Text = styled.h4`
  font-size: 1.1rem;
`;

Controller.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

Controller.defaultProps = {
  active: false
};

export default Controller;
