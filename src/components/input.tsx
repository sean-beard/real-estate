import styled from "styled-components";
import { colors } from "./typography";

export const Input = styled.input`
  width: 150px;
  height: 20px;
`;

export const InlineText = styled.span`
  color: ${colors.font};
`;

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
