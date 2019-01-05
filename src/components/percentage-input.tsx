import { IInputProps, InlineText, Input, InputLabel } from "components/input";
import * as React from "react";

const PercentageInput: React.SFC<IInputProps> = ({
  label,
  placeholder,
  ...rest
}: IInputProps) => (
  <React.Fragment>
    <InputLabel>{label}</InputLabel>
    <div>
      <Input type="number" placeholder={placeholder} {...rest} />
      <InlineText> %</InlineText>
    </div>
  </React.Fragment>
);

export default PercentageInput;
