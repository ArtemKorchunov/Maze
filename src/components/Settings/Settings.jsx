import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";

import { SettingsIcon, rotate360 } from "../Common/Styled";

import SettingsContent from "./SettingsContent";

const Settings = ({
  modalToggler,
  modalVisible,
  textareaValue,
  setTextareaValue
}) => {
  return (
    <>
      <Settings.Link onClick={modalToggler}>
        <Settings.RotatedIcon />
        Configure maze
      </Settings.Link>
      <Settings.Modal
        isOpen={modalVisible}
        onRequestClose={modalToggler}
        ariaHideApp={false}
      >
        <SettingsContent value={textareaValue} setValue={setTextareaValue} />
      </Settings.Modal>
    </>
  );
};

Settings.Link = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

Settings.RotatedIcon = styled(SettingsIcon)`
  ${Settings.Link}:hover & {
    color: #000;
    animation: ${rotate360} 2s linear infinite;
  }
`;

Settings.Modal = styled(Modal)`
  width: 100% !important;
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  margin: auto;
  box-shadow: ${props => props.theme.shadow.gray};
  outline: none;
  border-radius: 10px;
  background-color: #fff;
  padding: ${props => props.theme.paddings.md};
  padding-top: 0;
`;

Settings.propTypes = {
  modalToggler: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setTextareaValue: PropTypes.func.isRequired
};

export default Settings;
