import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Controller from "./Controller";

import { controllers } from "./constants";
import { getCurrentInfo } from "./utils";

const Controllers = ({ step, action }) => {
  const currentInfo = getCurrentInfo(step);
  return (
    <Controllers.Wrap className="controllers">
      {controllers.map(
        ({ instruction: controllerInstruction, Icon, text }, index) => {
          if (controllerInstruction === currentInfo.instruction) {
            return (
              <Controller
                key={`controller_${index}`}
                className={controllerInstruction}
                icon={<Icon />}
                text={currentInfo.text}
                onClick={() => action(step)}
                active
              />
            );
          } else {
            return (
              <Controller
                key={`controller_${index}`}
                className={controllerInstruction}
                icon={<Icon />}
                text={text}
              />
            );
          }
        }
      )}
    </Controllers.Wrap>
  );
};

Controllers.Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

Controllers.propTypes = {
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  action: PropTypes.func.isRequired
};

Controllers.defaultProps = {
  step: null
};

export default React.memo(Controllers);
