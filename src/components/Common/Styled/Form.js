import styled from "styled-components";

export const TextareaStyled = styled.textarea`
  border: 0;
  resize: none;
  height: 100%;
  border-radius: 10px;
  box-shadow: inset 0 0 5px 0 #0000003d;
  outline: none;
  padding: ${props => props.theme.paddings.md};
`;
