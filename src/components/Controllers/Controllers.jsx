import React from "react";
import styled from "styled-components";

import Controller from "./Controller";
import { LeftArrow, RightArrow, UpArrow } from "../Common/Styled";

const Controllers = () => {
  return (
    <Controllers.Wrap>
      <Controller icon={<UpArrow />} text="Go 3 steps forward" />
      <Controller icon={<LeftArrow />} text="Turn left" />
      <Controller icon={<UpArrow />} text="Go 1 step forward" />
      <Controller icon={<RightArrow />} text="Turn right" />
    </Controllers.Wrap>
  );
};

Controllers.Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

export default Controllers;
