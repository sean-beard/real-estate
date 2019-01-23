import styled from "styled-components";

import { Breakpoints, colors } from "./typography";

export const Input = styled.input`
  width: 150px;
  height: 2rem;
  border-radius: 3px;
  font-size: 1rem;
  color: ${colors.font};
  box-sizing: border-box;

  @media (${Breakpoints.mobile}) {
    width: 95%%;
  }

  &:hover {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const InlineText = styled.span`
  color: ${colors.font};
`;

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
