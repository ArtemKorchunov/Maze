import styled from "styled-components";

export const TextareaStyled = styled.textarea`
  width: 100%;
  max-width: 100%;
  max-height: 500px;
  border: 0;
  border-radius: 10px;
  box-shadow: inset 0 0 5px 0 #0000003d;
  outline: none;
  padding: ${props => props.theme.paddings.md};
`;
