import { IInputProps, InlineText, Input, InputLabel } from "components/input";
import * as React from "react";

const MonetaryInput: React.SFC<IInputProps> = ({
  label,
  placeholder,
  ...rest
}: IInputProps) => (
  <React.Fragment>
    <InputLabel>{label}</InputLabel>
    <div>
      <InlineText>$ </InlineText>
      <Input type="number" min="0" placeholder={placeholder} {...rest} />
    </div>
  </React.Fragment>
);

export default MonetaryInput;
