import styled from "styled-components";
import {
  IoMdReturnLeft,
  IoMdReturnRight,
  IoIosArrowRoundUp,
  IoIosSettings
} from "react-icons/io";

export const LeftArrow = styled(IoMdReturnLeft)`
  color: ${props => props.theme.colors.base};
  font-size: 2rem;
`;

export const RightArrow = styled(IoMdReturnRight)`
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
