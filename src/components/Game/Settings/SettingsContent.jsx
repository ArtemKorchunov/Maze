import React from "react";
import PropTypes from "prop-types";

import { TextareaStyled } from "../../Common/Styled";

const SettingsContent = ({ value, setValue }) => {
  return (
    <>
      <h3>Insert maze</h3>
      <TextareaStyled value={value} onChange={setValue} />
    </>
  );
};

SettingsContent.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
export default SettingsContent;
