import styled from "styled-components";
import {
  IoMdReturnLeft,
  IoMdReturnRight,
  IoIosArrowRoundUp,
  IoIosSettings
} from "react-icons/io";

const TransformedArrowLeft = styled(IoMdReturnRight)`
  transform: rotate(180deg);
  padding: 8px;
`;

const TransformedArrowRight = styled(IoMdReturnLeft)`
  transform: rotate(180deg);
  padding: 8px;
`;

export const LeftArrow = styled(TransformedArrowLeft)`
  color: ${props => props.theme.colors.base};
  font-size: 2rem;
`;

export const RightArrow = styled(TransformedArrowRight)`
  color: ${props => props.theme.colors.base};
  font-size: 2rem;
`;

export const UpArrow = styled(IoIosArrowRoundUp)`
  color: ${props => props.theme.colors.base};
  font-size: 3rem;
`;

export const SettingsIcon = styled(IoIosSettings)`
  color: ${props => props.theme.colors.base};
  font-size: 1rem;
  margin-right: 5px;
`;
